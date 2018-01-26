import { Component, OnDestroy } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeitAccountOAuthService } from "./tradeit-account-oauth.service";
import { TradeItAPIResult } from "../../service/tradeit/apiresults/tradeit-api-result";
import { TradeitOAuthComponent } from "./tradeit-oauth-component";
import { Observable } from "rxjs/Observable";

/**
 * Button panel component for the Account dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'tradeit-account-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css'],
    providers: [TradeitAccountOAuthService]
})
export class TradeItAccountFormButtonsComponent extends CrudFormButtonsComponent<TradeItAccount>
    implements OnDestroy, TradeitOAuthComponent
{
    /**
     * Constructor
     * @param {ToastsManager} toaster
     * @param {TradeItAccountCrudServiceContainer} customerAccountCrudServiceContainer
     * @param {TradeItService} tradeItService
     * @param {TradeitAccountOAuthService} tradeItOAuthService
     */
    constructor( protected toaster: ToastsManager,
                 private customerAccountCrudServiceContainer: TradeItAccountCrudServiceContainer,
                 private tradeItOAuthService: TradeitAccountOAuthService )
    {
        super( toaster, customerAccountCrudServiceContainer );
    }

    /**
     * This method is called from the popup window.
     *
     * NOTE: This method gets called twice instead of once on a successful login so the requestInProcess,
     * requestCompleted, and destroyed flags are used to prevent errors showing up as the second call results in a error from TradeIt.
     * @param event
     */
    public receiveMessage( event: any )
    {
        let methodName = "receiveMessage";
        this.log( methodName + ".begin" );
        /*
         * Just forward the call back to the OAuth service.
         */
        this.tradeItOAuthService.receiveMessage( event );
        this.log( methodName + ".end" );
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

    /**
     * When the add button is clicked, we need to validate the account with TradeIt.
     * A window will be popped up requesting the user's brokerage credentials.
     */
    protected onAddButtonClick(): void
    {
        let methodName = "onAddButtonClick";
        this.log( methodName + ".begin" );
        /*
         * Need to setup the necessary window listeners so that the authentication (OAuth) window can be popped up.
         */
        this.tradeItOAuthService.register( this );
        this.tradeItOAuthService
            .openOAuthPopup( this, this.modelObject.brokerage );
        this.log( methodName + ".end" );
    }

    /**
     * This method is called by the {@code TradeItOAuthService} to get the current account.
     * @return {TradeItAccount}
     */
    public getTradeItAccount(): TradeItAccount
    {
        return this.modelObject;
    }

    /**
     * This method is called when the user has successfully authenticated a brokerage account.
     */
    public notifyAuthenticationSuccess( tradeItAccount: TradeItAccount )
    {
        let methodName = "notifyAuthenticationSuccess";
        this.log( methodName + ".begin" )
        this.crudStateStore.sendModelObjectChangedEvent( this, tradeItAccount );
        this.notifyAddButtonWorkSuccessful();
        this.log( methodName + ".end" )
    }
}
