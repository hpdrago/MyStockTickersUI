import { StockAnalystConsensus } from '../model/entity/stock-analyst-consensus';
import { Injectable } from '@angular/core';
import { StockAnalystConsensusCrudService } from './crud/stock-analyst-consensus-crud.service';
import { SessionService } from './session.service';
import { BaseClass } from '../common/base-class';
import { ToastsManager } from 'ng2-toastr';

/**
 * Contains all of the stock analyst consensus entities for a single customer.
 * This information is cached because it will contain a limited number of stocks and not updated that often.
 *
 * Created by mike on 3/24/2018
 */
@Injectable()
export class StockAnalystConsensusCache extends BaseClass
{
    /**
     * Contains the current stock analyst consensus information for each stock.
     * @type {Map<any, any>}
     */
    private consensusMap: Map<string,StockAnalystConsensus> = new Map();

    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockAnalystConsensusCrudService} stockAnalystConsensusCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private stockAnalystConsensusCrudService: StockAnalystConsensusCrudService )
    {
        super( toaster );
        this.load();
    }

    /**
     * Loads all of the stock analyst consensus records for the logging in customer.
     */
    public load()
    {
        let methodName = 'load';
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

    /**
     * Get the consensus information for a single stock.
     * @param {string} tickerSymbol
     * @return {StockAnalystConsensus} null if the ticker symbol not in the cache.
     */
    public get( tickerSymbol: string ): StockAnalystConsensus
    {
        this.debug( 'get ' + tickerSymbol );
        return this.consensusMap
                   .get( tickerSymbol );
    }

    /**
     * Adds or replaces stock analyst consensus map entry.
     * @param {StockAnalystConsensus} stockAnalystConsensus
     */
    public put( stockAnalystConsensus: StockAnalystConsensus )
    {
        this.debug( 'put ' + JSON.stringify( stockAnalystConsensus ));
        this.consensusMap
            .set( stockAnalystConsensus.tickerSymbol,
                  stockAnalystConsensus );
    }

    /**
     * Delete the stock analyst consensus from the map.
     * @param {StockAnalystConsensus} stockAnalystConsensus
     */
    public delete( stockAnalystConsensus: StockAnalystConsensus )
    {
        this.debug( 'delete ' + JSON.stringify( stockAnalystConsensus ));
        this.consensusMap
            .delete( stockAnalystConsensus.tickerSymbol );
    }

    protected debug( message: string ): void
    {
    }
}
