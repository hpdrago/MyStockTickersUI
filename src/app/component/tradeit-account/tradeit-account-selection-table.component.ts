import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { ToastsManager } from "ng2-toastr";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItAccountBaseTableComponent } from "./tradeit-account-base-table.component";
import { TradeItAccountOAuthService } from "../../service/tradeit/tradeit-account-oauth.service";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountController } from './tradeit-account-controller';
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';
import { TradeItAccountCrudService } from '../../service/crud/tradeit-account-crud.service';
import { CookieService } from 'ngx-cookie-service';
import { TradeItSecurityQuestionDialogComponent } from '../tradeit/tradeit-security-question-dialog.component';
import { ConfirmDialogComponent } from '../common/confirm-dialog-component-child.component';


/**
 * This component list accounts vertically.
 *
 * Created by mike on 1/9/2018.
 */
@Component
({
    selector: 'tradeit-account-selection-table',
    templateUrl: './tradeit-account-selection-table.component.html',
    styleUrls: ['./tradeit-account-selection-table.component.css']
})
export class TradeItAccountSelectionTableComponent extends TradeItAccountBaseTableComponent
{
    @ViewChild(TradeItSecurityQuestionDialogComponent)
    private tradeItSecurityQuestionDialog: TradeItSecurityQuestionDialogComponent;

    @ViewChild( ConfirmDialogComponent)
    private confirmDialog: ConfirmDialogComponent;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItErrorReporter} tradeItErrorReporter
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {TradeItAccountController} tradeItAccountController
     * @param {TradeItAccountFactory} tradeItAccountFactory
     * @param {TradeItAccountCrudService} tradeItAccountCrudService
     * @param {TradeItService} tradeItService
     * @param {TradeItAccountOAuthService} tradeItOAuthService
     * @param {CookieService} cookieService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected tradeItAccountStateStore: TradeItAccountStateStore,
                 protected tradeItAccountController: TradeItAccountController,
                 protected tradeItAccountFactory: TradeItAccountFactory,
                 protected tradeItAccountCrudService: TradeItAccountCrudService,
                 protected tradeItService: TradeItService,
                 protected tradeItOAuthService: TradeItAccountOAuthService,
                 protected cookieService: CookieService )
    {
        super( changeDetector,
               toaster,
               tradeItErrorReporter,
               tradeItAccountStateStore,
               tradeItAccountController,
               tradeItAccountFactory,
               tradeItAccountCrudService,
               tradeItService,
               tradeItOAuthService,
               cookieService );
    }

    public ngAfterViewInit(): void
    {
        /*
         * Need to pass the child component instances to the parent class.
         */
        super.setTradeItSecurityQuestionDialog( this.tradeItSecurityQuestionDialog );
        super.setConfirmDialog( this.confirmDialog );
        super.ngAfterViewInit();
    }

    /**
     * Used to determine if the row if the current row should be selected.
     * @param {TradeItAccount} customerAccount
     * @returns {boolean}
     */
    protected isSelectedCustomerAccount( customerAccount: TradeItAccount ): boolean
    {
        return this.modelObject != null && this.modelObject.id === customerAccount.id;
    }

    protected onTableLoad( modelObjects: TradeItAccount[] ): void
    {
        this.log( JSON.stringify( modelObjects ));
        super.onTableLoad( modelObjects );
    }

}
