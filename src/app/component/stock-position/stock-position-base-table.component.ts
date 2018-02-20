import { EventEmitter, OnInit, Output } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";
import { StockPositionStateStore } from './stock-position-state-store';
import { StockPositionController } from './stock-position-controller';
import { StockPosition } from '../../model/entity/stock-position';
import { StockPositionFactory } from '../../model/factory/stock-position-factory';
import { StockPositionCrudService } from '../../service/crud/stock-position-crud.service';
import { StockQuoteModelObjectTableComponent } from '../stock-quote/stock-quote-modelobject-table.component';
import { StockQuoteRefreshService } from '../../service/stock-quote-refresh.service';
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { LinkedAccount } from '../../model/entity/linked-account';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { TradeItAccountController } from '../tradeit-account/tradeit-account-controller';
import { LinkedAccountController } from '../linked-account/linked-account-controller';

/**
 * This is the base class for table components that list TradeIt accounts. Whenever a user selects a {@code TradeItLinkedAccount}
 * it is checked for authentication.
 */
export class StockPositionBaseTableComponent extends StockQuoteModelObjectTableComponent<StockPosition>
    implements OnInit
{
    private tradeItAccount: TradeItAccount;
    private linkedAccount: LinkedAccount;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItErrorReporter} tradeItErrorReporter
     * @param {StockPositionStateStore} stockPositionStateStore
     * @param {StockPositionController} stockPositionController
     * @param {StockPositionFactory} stockPositionFactory
     * @param {StockPositionCrudService} stockPositionCrudService
     * @param {StockQuoteRefreshService} stockQuoteRefreshService
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected stockPositionStateStore: StockPositionStateStore,
                 protected stockPositionController: StockPositionController,
                 protected stockPositionFactory: StockPositionFactory,
                 protected stockPositionCrudService: StockPositionCrudService,
                 protected stockQuoteRefreshService: StockQuoteRefreshService )
    {
        super( TableLoadingStrategy.LAZY_ON_DEMAND,
               toaster,
               stockPositionStateStore,
               stockPositionController,
               stockPositionFactory,
               stockPositionCrudService,
               stockQuoteRefreshService );
    }

    /**
     * This method is called when the user selects a row on the trade it table accounts.
     * @param {TradeItAccount} tradeItAccount
     */
    public setTradeItAccount( tradeItAccount: TradeItAccount )
    {
        let methodName = 'onTradeItTableSelectionChange';
        this.log( methodName + " " + JSON.stringify( tradeItAccount ));
        this.tradeItAccount = tradeItAccount;
        this.clearTable();
    }

    /**
     * This method is called when the user changes the linked selected linked account;
     * @param {LinkedAccount} linkedAccount
     */
    public setLinkedAccount( linkedAccount: LinkedAccount )
    {
        let methodName = 'onLinkedAccountTableSelectionChange';
        this.log( methodName + ".begin " + JSON.stringify( linkedAccount ));
        this.linkedAccount = linkedAccount;
        let stockPosition = this.stockPositionFactory
                                .newModelObject();
        stockPosition.linkedAccountId = linkedAccount.id;
        stockPosition.tradeItAccountId = this.tradeItAccount.id;
        this.stockPositionStateStore
            .sendModelObjectChangedEvent( this, stockPosition );
        this.loadTable();
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