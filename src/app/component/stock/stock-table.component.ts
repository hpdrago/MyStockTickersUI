import { Component } from "@angular/core";
import { Stock } from "../../model/entity/stock";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockCrudServiceContainer } from "./stock-crud-service-container";
import { TableLoadingStrategy } from "../common/table-loading-strategy";

/**
 * This component lists the all of the stocks in the database.
 */
@Component( {
    selector:    'stock-table',
    templateUrl: './stock-table.component.html',
    styleUrls:   ['./stock-table.component.css'],
    outputs: ['modelObject']
} )
export class StockTableComponent extends CrudTableComponent<Stock>
{
    private companyNameSearch: string;

    /**
     * Create a new instance with required DI sources
     */
    constructor( protected toaster: ToastsManager,
                 private stockCrudServiceContainer: StockCrudServiceContainer )
    {
        super( TableLoadingStrategy.LAZY_ON_CREATE, toaster, stockCrudServiceContainer );
    }

    /**
     * Load the stocks table with company names or ticker symbols matching {@code searchString}
     * @param searchString
     */
    private getStockCompaniesLike( searchString: string )
    {
        this.logger.log( 'getStockCompaniesLike ' + searchString );
        this.stockCrudServiceContainer
            .stockCrudService
            .getStockCompaniesLike( searchString )
            .subscribe( stocksPage =>
            {
                this.onPageLoad( stocksPage );
                //alert( JSON.stringify( stocksPage))
            }, //Bind to view
            error =>
            {
                // Log errors if any
                this.reportRestError( error );
            } );
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
