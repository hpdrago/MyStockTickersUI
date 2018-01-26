import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { Injectable } from '@angular/core';
import { StockAnalystConsensusCrudService } from '../crud/stock-analyst-consensus-crud.service';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';
import { AsyncCrudCacheService } from './async-crud-cache.service';
import { StockAnalystConsensusCrudActionHandler } from '../../component/stock-analyst-consensus/stock-analyst-consensus-crud-action-handler.service';

/**
 * Contains all of the stock analyst consensus entities for a single customer.
 * This information is cached because it contains a limited number of stocks and not updated that often.
 *
 * Created by mike on 3/24/2018
 */
@Injectable()
export class StockAnalystConsensusCache extends AsyncCrudCacheService<string,StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusFactory} stockAnalystConsensusFactory
     * @param {StockAnalystConsensusCrudService} stockAnalystConsensusService
     * @param {StockAnalystConsensusCrudActionHandler} stockAnalystConsensusCrudActionHandler
     */
    public constructor( protected toaster: ToastsManager,
                        protected stockAnalystConsensusFactory: StockAnalystConsensusFactory,
                        private stockAnalystConsensusService: StockAnalystConsensusCrudService,
                        private stockAnalystConsensusCrudActionHandler: StockAnalystConsensusCrudActionHandler )
    {
        super( toaster, stockAnalystConsensusFactory, stockAnalystConsensusCrudActionHandler );
    }

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

    /**
     * Check the key to make sure it's valid
     * @param {string} key
     */
    protected checkKey( key: string ): void
    {
        super.checkKey( key );
        if ( key.length == 0 )
        {
            throw ReferenceError( 'Key is empty' );
        }
    }
}
