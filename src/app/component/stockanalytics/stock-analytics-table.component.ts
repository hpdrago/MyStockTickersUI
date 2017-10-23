import { Component } from "@angular/core";
import { StockAnalytics } from "../../model/entity/stock-analytics";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockAnalyticsCrudServiceContainer } from "./stock-analytics-crud-service-container";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-analytics-table',
        styleUrls: ['./stock-analytics-table.component.css'],
        templateUrl: './stock-analytics-table.component.html'
    } )
export class StockAnalyticsTableComponent extends CrudTableComponent<StockAnalytics>
{
    constructor( protected toaster: ToastsManager,
                 protected StockAnalyticsServiceContainer: StockAnalyticsCrudServiceContainer )
    {
        super( toaster, StockAnalyticsServiceContainer );
    }

    /**
     * This method is called automatically by the base class
     */
    protected loadTable()
    {
        this.log( "loadTable.begin" );
        this.StockAnalyticsServiceContainer
            .stockAnalyticsCrudService
            .getModelObjectList( this.modelObject )
            .subscribe( ( stockAnalyticsList: StockAnalytics[] ) =>
                        {
                            if ( stockAnalyticsList.length > 0 )
                            {
                                /*
                                 * Expand the rows by creating new StockAnalytics entries for each stock of the stock note
                                 */
                                this.rows = stockAnalyticsList;
                                this.debug( JSON.stringify( this.rows ));
                            }
                            else
                            {
                                this.rows = [];
                            }
                            this.debug( "loadStockAnalytics.end" );
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        } );
        this.log( "loadTable.end" );
    }

}
