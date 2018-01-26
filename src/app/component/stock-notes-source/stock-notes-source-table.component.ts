import { Component, OnInit } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";
import { StockNotesSourceStateStore } from './stock-notes-source-state-store';
import { StockNotesSourceController } from './stock-notes-source-controller';
import { StockNotesSource } from '../../model/entity/stock-notes-source';
import { StockNotesSourceFactory } from '../../model/factory/stock-notes-source-factory';
import { StockNotesSourceCrudService } from '../../service/crud/stock-notes-source-crud.service';
import { StockQuoteModelObjectTableComponent } from '../stock-quote/stock-quote-modelobject-table.component';
import { StockQuoteRefreshService } from '../../service/stock-quote-refresh.service';
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { LinkedAccount } from '../../model/entity/linked-account';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { StockNotesSourceCrudActionHandler } from './stock-notes-source-crud-action-handler';
import { CrudTableComponent } from '../crud/table/crud-table.component';

/**
 */
@Component(
    {
        selector:    'stock-notes-source-table',
        templateUrl: './stock-notes-source-table.component.html',
        providers:   [StockNotesSourceStateStore, StockNotesSourceController, StockNotesSourceCrudActionHandler]
    } )
export class StockNotesSourceBaseTableComponent extends CrudTableComponent<StockNotesSource>
    implements OnInit
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItErrorReporter} tradeItErrorReporter
     * @param {StockNotesSourceStateStore} stockNotesSourceStateStore
     * @param {StockNotesSourceController} stockNotesSourceController
     * @param {StockNotesSourceFactory} stockNotesSourceFactory
     * @param {StockNotesSourceCrudService} stockNotesSourceCrudService
     * @param {StockQuoteRefreshService} stockQuoteRefreshService
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected stockNotesSourceStateStore: StockNotesSourceStateStore,
                 protected stockNotesSourceController: StockNotesSourceController,
                 protected stockNotesSourceFactory: StockNotesSourceFactory,
                 protected stockNotesSourceCrudService: StockNotesSourceCrudService )
    {
        super( TableLoadingStrategy.ALL_ON_DEMAND,
               toaster,
               stockNotesSourceStateStore,
               stockNotesSourceController,
               stockNotesSourceFactory,
               stockNotesSourceCrudService )
    }

}
