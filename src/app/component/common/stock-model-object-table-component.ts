import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { StockModelObject } from "../../model/entity/stock-model-object";
import { Stock } from "../../model/entity/stock";
import { TableLoadingStrategy } from "./table-loading-strategy";

/**
 * This is a base class for all tables that contain model objects containing a ticker symbol
 */
export abstract class StockModelObjectTableComponent<T extends StockModelObject<T>>
    extends CrudTableComponent<T>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudServiceContainer<T extends StockModelObject<T>>} crudServiceContainer
     */
    constructor( protected toaster: ToastsManager,
                 protected crudServiceContainer: CrudServiceContainer<T> )
    {
        super( TableLoadingStrategy.LAZY_ON_CREATE, toaster, crudServiceContainer );
    }

    /**
     * Load the table for the ticker symbol.
     * @param {string} tickerSymbol
     */
    public loadTableForTickerSymbol( tickerSymbol: string )
    {
        this.debug( "loadTableForTickerSymbol " + tickerSymbol );
        this.modelObject = this.crudServiceContainer
                               .modelObjectFactory
                               .newModelObject();
        this.modelObject.tickerSymbol = tickerSymbol;
        this.loadTable();
    }

    /**
     * Resets the table contents
     */
    public resetTable()
    {
        this.debug( "resetTable" );
        this.modelObject = this.crudServiceContainer
                               .modelObjectFactory
                               .newModelObject();
        this.loadTable();
    }

    /**
     * This method is called when the user enters a ticker symbol in the search box
     * @param {Stock} stock
     */
    protected onStockSelected( stock: Stock )
    {
        this.debug( "onStockSelected " + JSON.stringify( stock ) );
        this.loadTableForTickerSymbol( stock.tickerSymbol )
    }

    /**
     * This method is called when the user clicks the reset button to clear the ticker symbol search.
     */
    protected onResetButtonClick()
    {
        this.debug( "onResetButtonClick" );
        this.resetTable();
    }
}
