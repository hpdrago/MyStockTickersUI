import { Component, OnInit } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItErrorReporter } from "../tradeit/tradeit-error-reporter";
import { StockNotesSourceStateStore } from './stock-notes-source-state-store';
import { StockNotesSourceController } from './stock-notes-source-controller';
import { StockNotesSource } from '../../model/entity/stock-notes-source';
import { StockNotesSourceCrudService } from '../../service/crud/stock-notes-source-crud.service';
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { CrudTableComponent } from '../crud/table/crud-table.component';
import { StockNotesSourceFactory } from '../../model/factory/stock-notes-source.factory';
import { CookieService } from 'ngx-cookie-service';

/**
 */
@Component(
    {
        selector:    'stock-notes-source-table',
        templateUrl: './stock-notes-source-table.component.html'
    } )
export class StockNotesSourceTableComponent extends CrudTableComponent<StockNotesSource>
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
     * @param {CookieService} cookieService
     */
    constructor( protected toaster: ToastsManager,
                 protected tradeItErrorReporter: TradeItErrorReporter,
                 protected stockNotesSourceStateStore: StockNotesSourceStateStore,
                 protected stockNotesSourceController: StockNotesSourceController,
                 protected stockNotesSourceFactory: StockNotesSourceFactory,
                 protected stockNotesSourceCrudService: StockNotesSourceCrudService,
                 protected cookieService: CookieService )
    {
        super( TableLoadingStrategy.ALL_ON_CREATE,
               toaster,
               stockNotesSourceStateStore,
               stockNotesSourceController,
               stockNotesSourceFactory,
               stockNotesSourceCrudService,
               cookieService )
    }

}
