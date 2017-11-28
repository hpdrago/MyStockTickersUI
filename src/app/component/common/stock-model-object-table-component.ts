import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { StockModelObject } from "../../model/entity/stock-model-object";

/**
 * This is a base class for all tables that contain model objects containing a ticker symbol
 */
export abstract class StockModelObjectTableComponent<T extends StockModelObject<T>>
    extends CrudTableComponent<T>
{
    constructor( protected toaster: ToastsManager,
                 protected crudServiceContainer: CrudServiceContainer<T> )
    {
        super( toaster, crudServiceContainer );
    }

    /**
     * Load the table for the ticker symbol.
     * @param {string} tickerSymbol
     */
    public loadTableForTickerSymbol( tickerSymbol: string )
    {
        this.modelObject = this.crudServiceContainer
                               .modelObjectFactory
                               .newModelObject();
        this.modelObject.tickerSymbol = tickerSymbol;
        this.loadTable();
    }

    /**
     * Clears the current contents and loads the table
     */
    public resetTable()
    {
        this.modelObject = this.crudServiceContainer
                               .modelObjectFactory
                               .newModelObject();
        this.loadTable();
    }
}
