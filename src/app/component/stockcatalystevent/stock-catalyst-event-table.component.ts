import { Component } from "@angular/core";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockCatalystEventCrudServiceContainer } from "./stock-catalyst-event-crud-service-container";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-catalyst-event-table',
        styleUrls: ['./stock-catalyst-event-table.component.css'],
        templateUrl: './stock-catalyst-event-table.component.html'
    } )
export class StockCatalystEventTableComponent extends CrudTableComponent<StockCatalystEvent>
{
    constructor( protected toaster: ToastsManager,
                 protected StockCatalystEventServiceContainer: StockCatalystEventCrudServiceContainer )
    {
        super( toaster, StockCatalystEventServiceContainer );
    }

    /**
     * This method is called automatically by the base class
     */
    protected loadTable()
    {
        this.log( "loadTable.begin" );
        this.StockCatalystEventServiceContainer
            .stockCatalystEventCrudService
            .getModelObjectList( this.modelObject )
            .subscribe( ( stockCatalystEventList: StockCatalystEvent[] ) =>
                        {
                            if ( stockCatalystEventList.length > 0 )
                            {
                                /*
                                 * Expand the rows by creating new StockAnalytics entries for each stock of the stock note
                                 */
                                this.rows = stockCatalystEventList;
                                this.debug( JSON.stringify( this.rows ));
                            }
                            else
                            {
                                this.rows = [];
                            }
                            this.debug( "loadStockCatalystEvent.end" );
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        } );
        this.log( "loadTable.end" );
    }

}
