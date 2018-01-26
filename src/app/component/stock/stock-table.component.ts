import { Component } from "@angular/core";
import { Stock } from "../../model/entity/stock";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { TableLoadingStrategy } from "../common/table-loading-strategy";
import { StockFactory } from '../../model/factory/stock.factory';
import { StockController } from './stock-controller';
import { StockStateStore } from './stock-crud-state-store';
import { StockCrudService } from '../../service/crud/stock-crud.service';
import { StockActionHandler } from './stock-action-handler';

/**
 * This component lists the all of the stocks in the database.
 */
@Component( {
    selector:    'stock-table',
    templateUrl: './stock-table.component.html',
    styleUrls:   ['./stock-table.component.css'],
    outputs:     ['modelObject'],
    providers:   [StockStateStore, StockController, StockActionHandler]
} )
export class StockTableComponent extends CrudTableComponent<Stock>
{
    private companyNameSearch: string;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockStateStore} stockStateStore
     * @param {StockController} stockController
     * @param {StockFactory} stockFactory
     * @param {StockCrudService} stockCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private stockStateStore: StockStateStore,
                 private stockController: StockController,
                 private stockFactory: StockFactory,
                 private stockCrudService: StockCrudService )
    {
        super( TableLoadingStrategy.LAZY_ON_CREATE,
               toaster,
               stockStateStore,
               stockController,
               stockFactory,
               stockCrudService );
    }

    /**
     * Load the stocks table with company names or ticker symbols matching {@code searchString}
     * @param searchString
     */
    private getStockCompaniesLike( searchString: string )
    {
        this.logger.log( 'getStockCompaniesLike ' + searchString );
        this.stockCrudService
            .getStockCompaniesLike( searchString )
            .subscribe( stocksPage =>
            {
                this.onPageLoad( stocksPage );
            });
    }

    /*****************************************************************
     *  E V E N T S
     *****************************************************************/
    private onCompanyNameSearch( event )
    {
        this.logger.log( 'onCompanyNameSearch ' + this.companyNameSearch );
        if ( this.companyNameSearch && this.companyNameSearch.length > 0 )
        {
            this.getStockCompaniesLike( this.companyNameSearch );
        }
    }

    private onClearCompanySearch( event )
    {
        this.companyNameSearch = '';
    }

    /**
     * this method is called as an event from the stock form to jump to a stock company in the table
     * @param stock
     */
    private onJumpToStock( stock: Stock )
    {
        this.log( 'onJumpToStock()'  );
        this.getStockCompaniesLike( stock.tickerSymbol );
    }
}
