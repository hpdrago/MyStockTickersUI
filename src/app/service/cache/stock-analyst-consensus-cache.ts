import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { Injectable } from '@angular/core';
import { StockAnalystConsensusCrudService } from '../crud/stock-analyst-consensus-crud.service';
import { ToastsManager } from 'ng2-toastr';
import { AsyncCacheService } from './async-cache.service';
import { Observable } from 'rxjs/Observable';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';

/**
 * Contains all of the stock analyst consensus entities for a single customer.
 * This information is cached because it contains a limited number of stocks and not updated that often.
 *
 * Created by mike on 3/24/2018
 */
@Injectable()
export class StockAnalystConsensusCache extends AsyncCacheService<string,StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusFactory} stockAnalystConsensusFactory
     * @param {StockAnalystConsensusCrudService} stockAnalystConsensusService
     */
    public constructor( protected toaster: ToastsManager,
                        protected stockAnalystConsensusFactory: StockAnalystConsensusFactory,
                        private stockAnalystConsensusService: StockAnalystConsensusCrudService )
    {
        super( toaster, stockAnalystConsensusFactory );
    }
    /**
     * Loads all of the stock analyst consensus records for the logging in customer.
     */
    /*public load()
    {
        const methodName = 'load';
        this.debug( methodName + '.begin' );
        let stockAnalystConsensus: StockAnalystConsensus = new StockAnalystConsensus();
        stockAnalystConsensus.customerId = this.session.getLoggedInUserId();
        this.stockAnalystConsensusCrudService
            .getModelObjectList( stockAnalystConsensus )
            .subscribe(consensusList =>
                       {
                           consensusList.forEach(stockAnalystConsensus =>
                                                 {
                                                     this.put( stockAnalystConsensus );
                                                 } );
                           this.debug( methodName + '.end loaded ' + consensusList.length );
                       })
    }*/

    /**
     * Delete the stock analyst consensus from the map.
     * @param {StockAnalystConsensus} stockAnalystConsensus
     */
    public deleteConsensus( stockAnalystConsensus: StockAnalystConsensus )
    {
        this.debug( 'delete ' + JSON.stringify( stockAnalystConsensus ));
        this.delete( stockAnalystConsensus.tickerSymbol );
    }

    /**
     * Fetch the stock analyst consensus information.
     * @param {string} tickerSymbol
     * @return {Observable<StockAnalystConsensus>}
     */
    protected fetchCachedDataFromBackend( tickerSymbol: string ): Observable<StockAnalystConsensus>
    {
        let stockAnalystConsensus: StockAnalystConsensus = new StockAnalystConsensus();
        stockAnalystConsensus.tickerSymbol = tickerSymbol;
        return this.stockAnalystConsensusService
                   .getModelObject( stockAnalystConsensus );
    }

    /*
    protected debug( message: string ): void
    {
    }
    */

}
