import { ChangeDetectorRef, Component, OnDestroy } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItOAuthAccessResult } from "../../service/tradeit/apiresults/tradeit-oauth-access-result";
import { TradeItGetOauthPopupURLResult } from "../../service/tradeit/apiresults/tradeit-get-oauth-popup-url-result";

/**
 * Button panel component for the Account dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'tradeit-account-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class TradeItAccountFormButtonsComponent extends CrudFormButtonsComponent<TradeItAccount> implements OnDestroy
{
    private requestInProcess = false;
    private requestCompleted = false;
    private destroyed: boolean = false;
    constructor( protected toaster: ToastsManager,
                 private customerAccountCrudServiceContainer: TradeItAccountCrudServiceContainer,
                 private tradeItService: TradeItService,
                 private changeDetectorRef: ChangeDetectorRef )
    {
        super( toaster, customerAccountCrudServiceContainer );
        /*
         * Setup listener for broker loggin message receipt
         * https://stackoverflow.com/questions/41444343/angular-2-window-postmessage
         */
        if ( window.addEventListener )
        {
            window.addEventListener("message", this.receiveMessage.bind(this), false );
        }
        else
        {
            (<any>window).attachEvent("onmessage", this.receiveMessage.bind(this) );
        }
    }

    public ngOnDestroy(): void
    {
        this.destroyed = true;
        super.ngOnDestroy();
    }

    /**
     * This method is called from the popup window.
     *
     * NOTE: This method gets called twice instead of once on a successful login so the requestInProcess,
     * requestCompleted, and destroyed flags are used to prevent errors showing up as the second call results in a error from TradeIt.
     * @param event
     */
    private receiveMessage( event: any )
    {
        if ( event.data && !this.requestInProcess && !this.requestCompleted && !this.destroyed )
        {
            var methodName = "receiveMessage";
            this.log( methodName + " requestInProcess: " + this.requestInProcess );
            this.log( methodName + " event: " + JSON.stringify( event ) );
            try
            {
                var data = JSON.parse( event.data );
                var oAuthVerifier = data.oAuthVerifier;
                this.log( methodName + " oAuthVerifier: " + oAuthVerifier );
                this.log( methodName + " getting OAuthAccessToken" );
                this.tradeItService.getOAuthAccessToken( this.modelObject.brokerage, this.modelObject.name, oAuthVerifier )
                                   .subscribe( (oAuthAccess: TradeItOAuthAccessResult) =>
                                               {
                                                   this.log( methodName + " oAuthAccess: " + JSON.stringify( oAuthAccess ) +
                                                             " requestCompleted: " + this.requestCompleted +
                                                             " requestInProcess: " + this.requestInProcess );
                                                   if ( !this.requestCompleted && !this.destroyed )
                                                   {
                                                       if ( oAuthAccess.status == "ERROR" )
                                                       {
                                                           this.reportTradeItError( oAuthAccess );
                                                       }
                                                       else
                                                       {
                                                           this.setModelObject( oAuthAccess.customerAccount );
                                                           this.notifySaveButtonSuccessful();
                                                           this.log( methodName + " added account: " + JSON.stringify( this.modelObject ) );
                                                           this.showInfo( oAuthAccess.customerAccount.name + " was successfully linked." )
                                                           this.requestCompleted = true;
                                                       }
                                                   }
                                               },
                                               error =>
                                               {
                                                   if ( !this.requestInProcess && !this.requestCompleted )
                                                   {
                                                       this.reportRestError( error );
                                                   }
                                               });
            }
            catch( e )
            {
                // ignore exceptions as this is a general function that receives a lot of messages that are not
                // what we are looking for.
                console.log((<Error>e).message);
            }
            this.requestInProcess = true;
            this.log( methodName + " setting requestInProcess: " + this.requestInProcess );
        }
    }

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage( account: TradeItAccount ): string
    {
        return 'Are you sure you want to delete account: ' + account.name + "?";
    }

    /**
     * @return {undefined}
     */
    public getDeleteKeyword(): string
    {
        return 'Account'
    }

    /**
     * This method is called to get the message to display to the user that the mdoel object was saved successfully.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getSaveSuccessFulMessage( account: TradeItAccount )
    {
        return "Save Successful for " + account.name;
    }

    protected getAddButtonLabel(): string
    {
        return "Add Account";
    }

    protected onAddButtonClick(): void
    {
        this.log( "onAddButtonClick" );
        this.tradeItService
            .getOAuthPopupURL( this.modelObject.brokerage )
            .subscribe( (getOauthPopupURLResult: TradeItGetOauthPopupURLResult) =>
                        {
                            if ( getOauthPopupURLResult.status == "ERROR" )
                            {
                                this.reportTradeItError( getOauthPopupURLResult );
                            }
                            else
                            {
                                this.log( "onAddButtonClick: url: " + getOauthPopupURLResult.oAuthURL );
                                this.log( "Opening login window" );
                                window.open( getOauthPopupURLResult.oAuthURL );
                            }
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        } );
    }
}
