import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";
import { CustomerAccount } from "../../model/entity/customer-account";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { OAuthAccess } from "../../service/tradeit/oauthaccess";
import { JsonConvert } from "json2typescript";
import { TradeItApiResult } from "../../service/tradeit/tradeit-api-result";

/**
 * Button panel component for the Account dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'customer-account-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class CustomerAccountFormButtonsComponent extends CrudFormButtonsComponent<CustomerAccount>
{
    constructor( protected toaster: ToastsManager,
                 private customerAccountCrudServiceContainer: CustomerAccountCrudServiceContainer,
                 private tradeItService: TradeItService )
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

    /**
     * This method is called from the popup window.
     * @param event
     */
    private receiveMessage( event: any )
    {
        if ( event.data )
        {
            var methodName = "receiveMessage";
            this.log( methodName + " event: " + JSON.stringify( event ) );
            try
            {
                var data = JSON.parse( event.data );
                var oAuthVerifier = data.oAuthVerifier;
                this.log( methodName + " oAuthVerifier: " + oAuthVerifier );
                this.log( methodName + " getting OAuthAccessToken" );
                this.tradeItService.getOAuthAccessToken( oAuthVerifier )
                                   .subscribe( (oAuthAccess: OAuthAccess) =>
                                               {
                                                   this.log( methodName + " oAuthAccess: " + JSON.stringify( oAuthAccess ));
                                                   if ( oAuthAccess.status == "ERROR" )
                                                   {
                                                       let jsonConvert: JsonConvert = new JsonConvert();
                                                       let apiResult: TradeItApiResult = jsonConvert.deserialize( oAuthAccess, TradeItApiResult );
                                                       this.log( "Messages: " + apiResult.getMessages() );
                                                       this.toaster.error( apiResult.getMessages(), "Error" )
                                                   }
                                                   else
                                                   {
                                                       this.modelObject.userId = oAuthAccess.userId;
                                                       this.modelObject.userToken = oAuthAccess.userToken;
                                                       this.log( methodName + " adding account: " + JSON.stringify( this.modelObject ));
                                                       super.onAddButtonClick();
                                                   }
                                               },
                                               error =>
                                               {
                                                    this.reportRestError( error );
                                               });
            }
            catch( e )
            {
                // ignore exceptions as this is a general function that receives a lot of messages that are not
                // what we are looking for.
                console.log((<Error>e).message);
            }
        }
    }

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage( account: CustomerAccount ): string
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
    protected getSaveSuccessFulMessage( account: CustomerAccount )
    {
        return "Save Successful for " + account.name;
    }

    protected onAddButtonClick(): void
    {
        this.log( "onAddButtonClick" );
        this.tradeItService
            .getRequestOAuthPopupURL( this.modelObject.brokerage )
            .subscribe( url =>
                        {
                            this.log( "onAddButtonClick: url: " + url );
                            window.open( url );
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        } );
    }
}
