import { ToastsManager } from "ng2-toastr";
import { ChangeDetectorRef, Component } from "@angular/core";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";
import { StockPositionController } from './stock-position-controller';
import { StockPositionStateStore } from './stock-position-state-store';
import { StockPositionFactory } from '../../model/factory/stock-position-factory';
import { StockPositionCrudService } from '../../service/crud/stock-position-crud.service';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { CookieService } from 'ngx-cookie-service';
import { StockModelObjectTableComponent } from '../common/stock-model-object-table-component';
import { StockPosition } from '../../model/entity/stock-position';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { LinkedAccount } from '../../model/entity/linked-account';
import { TradeItAccountController } from '../tradeit-account/tradeit-account-controller';
import { LinkedAccountController } from '../linked-account/linked-account-controller';
import { LazyLoadEvent } from 'primeng/api';
import { isNullOrUndefined } from 'util';

/**
 * This component display the list of the customer's brokerage accounts
 *
 * Created by mike on 10/24/2017.
 */
@Component(
{
    selector:    'stock-position-table',
    styleUrls:   ['./stock-position-table.component.css'],
    templateUrl: './stock-position-table.component.html'
} )
export class StockPositionTableComponent extends StockModelObjectTableComponent<StockPosition>
{
    private tradeItAccount: TradeItAccount;
    private linkedAccount: LinkedAccount;

    /**
     * Constructor.
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {TradeItErrorReporter} tradeItErrorReporter
     * @param {StockPositionStateStore} stockPositionStateStore
     * @param {StockPositionController} stockPositionController
     * @param {StockPositionFactory} stockPositionFactory
     * @param {StockPositionCrudService} stockPositionCrudService
     * @param {TradeItAccountController} tradeItAccountController
     * @param {LinkedAccountController} linkedAccountController
     * @param {CookieService} cookieService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected stockPositionStateStore: StockPositionStateStore,
                 protected stockPositionController: StockPositionController,
                 protected stockPositionFactory: StockPositionFactory,
                 protected stockPositionCrudService: StockPositionCrudService,
                 protected tradeItAccountController: TradeItAccountController,
                 protected linkedAccountController: LinkedAccountController,
                 protected cookieService: CookieService )
    {
        super( changeDetector,
               TableLoadingStrategy.ALL_ON_DEMAND,
               toaster,
               stockPositionStateStore,
               stockPositionController,
               stockPositionFactory,
               stockPositionCrudService,
               cookieService );
    }

    public ngAfterViewInit(): void
    {
        super.ngAfterViewInit();
        this.addSubscription( 'TradeItAccountTableSelectionChange',
                              this.tradeItAccountController
                                  .subscribeToTableSelectionChangeEvent( tradeItAccount =>
                                                                             this.onTradeItAccountTableSelectionChange( tradeItAccount )));
        this.addSubscription( 'LinkedAccountTableSelectionChange',
                              this.linkedAccountController.subscribeToTableSelectionChangeEvent(
                                  linkedAccount => this.onLinkedAccountTableSelectionChange( linkedAccount )));
    }

    /**
     * This method is called when the user selects a row on the trade it table accounts.
     * @param {TradeItAccount} tradeItAccount
     */
    private onTradeItAccountTableSelectionChange( tradeItAccount: TradeItAccount )
    {
        const methodName = 'onTradeItAccountTableSelectionChange';
        this.log( methodName + " " + JSON.stringify( tradeItAccount ));
        this.tradeItAccount = tradeItAccount;
        this.linkedAccount = null;
        this.clearTable();
    }

    /**
     * This method is called when the user changes the linked selected linked account;
     * @param {LinkedAccount} linkedAccount
     */
    private onLinkedAccountTableSelectionChange( linkedAccount: LinkedAccount )
    {
        const methodName = 'onLinkedAccountTableSelectionChange';
        this.log( methodName + ".begin " + JSON.stringify( linkedAccount ));
        this.clearTable();
        /*
         * This method gets called twice, once for the table row click which initiates a keep session alive with TradeIt
         * which then updates the row again
         */
        if ( this.linkedAccount == null || this.linkedAccount.id != linkedAccount.id )
        {
            this.linkedAccount = linkedAccount;
            this.log( methodName + " new linked account detected" );
            /*
             * Create the QBE object to load the positions.
             */
            let stockPosition = this.stockPositionFactory
                                    .newModelObject();
            stockPosition.linkedAccountId = linkedAccount.id;
            stockPosition.tradeItAccountId = this.tradeItAccount.id;
            this.stockPositionStateStore
                .sendModelObjectChangedEvent( this, stockPosition );
            this.loadTable();
        }
        this.log( methodName + ".end" );
    }

    /**
     * You can't add a positions
     * @returns false.
     */
    protected isAllowAdds(): boolean
    {
        return false;
    }

    /**
     * Can't update a positions either.
     * @returns false.
     */
    protected isAllowUpdates(): boolean
    {
        return false;
    }
}
