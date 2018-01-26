import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockCompany } from "../../model/entity/stock-company";
import { TableLoadingStrategy } from "./table-loading-strategy";
import { CrudStateStore } from '../crud/common/crud-state-store';
import { CrudController } from '../crud/common/crud-controller';
import { ModelObjectFactory } from '../../model/factory/model-object.factory';
import { CrudRestService } from '../../service/crud/crud-rest.serivce';
import { ModelObject } from '../../model/common/model-object';
import { TickerSymbolContainer } from '../../model/common/ticker-symbol-container';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { StockQuoteContainer } from '../../model/common/stock-quote-container';
import { StockQuote } from '../../model/entity/stock-quote';
import { isNullOrUndefined } from 'util';
import { CookieService } from 'ngx-cookie-service';

/**
 * This is a base class for all tables that contain model objects containing a ticker symbol
 */
export abstract class StockModelObjectTableComponent<T extends ModelObject<T> & TickerSymbolContainer & StockQuoteContainer>
    extends CrudTableComponent<T>
{
    /**
     * Constructor
     * @param {TableLoadingStrategy} tableLoadingStrategy
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends ModelObject<T> & TickerSymbolContainer>} stockStateStore
     * @param {CrudController<T extends ModelObject<T> & TickerSymbolContainer>} stockController
     * @param {ModelObjectFactory<T extends ModelObject<T> & TickerSymbolContainer>} stockFactory
     * @param {CrudRestService<T extends ModelObject<T> & TickerSymbolContainer>} stockCrudService
     * @param {StockQuoteCacheService} stockQuoteCacheService
     * @param {CookieService} cookieService
     */
    protected constructor( protected tableLoadingStrategy: TableLoadingStrategy,
                           protected toaster: ToastsManager,
                           protected stockStateStore: CrudStateStore<T>,
                           protected stockController: CrudController<T>,
                           protected stockFactory: ModelObjectFactory<T>,
                           protected stockCrudService: CrudRestService<T>,
                           protected stockQuoteCacheService: StockQuoteCacheService,
                           protected cookieService: CookieService )
    {
        super( tableLoadingStrategy,
               toaster,
               stockStateStore,
               stockController,
               stockFactory,
               stockCrudService,
               cookieService );
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
     * This method is called after the modelObjects have been retrieved from the database
     * @param {T[]} modelObjects
     */
    protected onTableLoad( modelObjects: T[] ): void
    {
        this.log( 'onTableLoad subscribing to cache updates')
        /*
        modelObjects.forEach( modelObject =>
                              {
                                  if ( modelObject.hasOwnProperty( 'stockQuote' ) )
                                  {
                                      this.addSubscription( modelObject.tickerSymbol + '.stockQuoteSubscription',
                                          this.stockQuoteCacheService
                                              .subscribe( modelObject.tickerSymbol, (stockQuote: StockQuote ) =>
                                                          {
                                                              this.onStockQuoteUpdate( modelObject, stockQuote );
                                                          } ));
                                  }
                              });*/
        super.onTableLoad( modelObjects );
    }

    /**
     * This method is called when a stock quote is receive from the stock quote cache.
     * @param {T} modelObject Will be updated with the new stock quote
     * @param {StockQuote} stockQuote
     */
    protected onStockQuoteUpdate( modelObject: T, stockQuote: StockQuote )
    {
        if ( !isNullOrUndefined( stockQuote ))
        {
            const methodName = 'onStockQuoteUpdate';
            this.log( `${methodName} ${modelObject.tickerSymbol} => ` + JSON.stringify( stockQuote ) );
            modelObject.stockQuote = stockQuote;
        }
    }

    /**
     * This method is called when the user enters a ticker symbol in the search box
     * @param {StockCompany} stock
     */
    protected onStockSelected( stock: StockCompany )
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
