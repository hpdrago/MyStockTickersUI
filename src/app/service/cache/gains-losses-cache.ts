import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { AsyncCacheService } from './async-cache.service';
import { GainsLosses } from '../../model/entity/gains-losses';
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { Observable } from 'rxjs/Observable';
import { GainsLossesCrudService } from '../crud/gains-losses-crud.service';

/**
 * Contains all of the gains/losses for a single customer.
 * This information is cached because it contains a limited number of stocks and they are not updated that often.
 *
 * Created by mike on 3/24/2018
 */
@Injectable()
export class GainsLossesCache extends AsyncCacheService<string, GainsLosses>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {GainsLossesFactory} gainsLossesFactory
     * @param {GainsLossesCrudService} gainsLossesCrudService
     */
    public constructor( protected toaster: ToastsManager,
                        protected gainsLossesFactory: GainsLossesFactory,
                        protected gainsLossesCrudService: GainsLossesCrudService )
    {
        super( toaster,
               gainsLossesFactory );
    }

    /**
     * Loads all of the stock analyst consensus records for the logging in customer.
     */
    /*
    public load()
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
    }
    */

    /**
     * Adds or replaces stock analyst consensus map entry.
     * @param {StockAnalystConsensus} stockAnalystConsensus
     */
    public put( gainsLosses: GainsLosses  )
    {
        this.debug( 'put ' + JSON.stringify( gainsLosses ));
        this.addCacheData( gainsLosses.tickerSymbol, gainsLosses );
    }

    /**
     * Get the gains and losses from the backend.
     * @param {string} tickerSymbol
     * @return {Observable<GainsLosses>}
     */
    protected fetchCachedDataFromBackend( tickerSymbol: string ): Observable<GainsLosses>
    {
        let gainsLosses = new GainsLosses();
        gainsLosses.tickerSymbol = tickerSymbol;
        return this.gainsLossesCrudService
                   .getModelObject( gainsLosses );
    }

    /*
    protected debug( message: string ): void
    {
    }
    */
}
