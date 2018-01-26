import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockModelObject } from "../../model/entity/stock-model-object";
import { Stock } from "../../model/entity/stock";
import { TableLoadingStrategy } from "./table-loading-strategy";
import { CrudStateStore } from '../crud/common/crud-state-store';
import { CrudController } from '../crud/common/crud-controller';
import { ModelObjectFactory } from '../../model/factory/model-object.factory';
import { CrudRestService } from '../../service/crud/crud-rest.serivce';

/**
 * This is a base class for all tables that contain model objects containing a ticker symbol
 */
export abstract class StockModelObjectTableComponent<T extends StockModelObject<T>>
    extends CrudTableComponent<T>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends StockModelObject<T>>} stockStateStore
     * @param {CrudController<T extends StockModelObject<T>>} stockController
     * @param {ModelObjectFactory<T extends StockModelObject<T>>} stockFactory
     * @param {CrudRestService<T extends StockModelObject<T>>} stockCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected stockStateStore: CrudStateStore<T>,
                 protected stockController: CrudController<T>,
                 protected stockFactory: ModelObjectFactory<T>,
                 protected stockCrudService: CrudRestService<T> )
    {
        super( TableLoadingStrategy.LAZY_ON_CREATE, 
               toaster,
               stockStateStore,
               stockController,
               stockFactory,
               stockCrudService );
    }

    /**
     * Load the table for the ticker symbol.
     * @param {string} tickerSymbol
     */
    public loadTableForTickerSymbol( tickerSymbol: string )
    {
        this.debug( "loadTableForTickerSymbol " + tickerSymbol );
        this.modelObject = this.stockFactory
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
        this.modelObject = this.stockFactory
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
