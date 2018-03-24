import { StockAnalystConsensus } from '../model/entity/stock-analyst-consensus';
import { Injectable } from '@angular/core';
import { StockAnalystConsensusCrudService } from './crud/stock-analyst-consensus-crud.service';
import { SessionService } from './session.service';

/**
 * Contains all of the stock analyst consensus entities for a single customer.
 *
 * Created by mike on 3/24/2018
 */
@Injectable()
export class StockAnalystConsensusCache
{
    /**
     * Contains the current stock analyst consensus information for each stock.
     * @type {Map<any, any>}
     */
    private consensusMap: Map<string,StockAnalystConsensus> = new Map();

    constructor( private session: SessionService,
                 private stockAnalystConsensusCrudService: StockAnalystConsensusCrudService )
    {
        this.load();
    }

    /**
     * Loads all of the stock analyst consensus records for the logging in customer.
     */
    load()
    {
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
                       })
    }

    /**
     * Get the consensus information for a single stock.
     * @param {string} tickerSymbol
     * @return {StockAnalystConsensus} null if the ticker symbol not in the cache.
     */
    public get( tickerSymbol: string ): StockAnalystConsensus
    {
        return this.consensusMap
                   .get( tickerSymbol );
    }

    /**
     * Adds or replaces stock analyst consensus map entry.
     * @param {StockAnalystConsensus} stockAnalystConsensus
     */
    public put( stockAnalystConsensus: StockAnalystConsensus )
    {
        this.consensusMap
            .set( stockAnalystConsensus.tickerSymbol,
                  stockAnalystConsensus );
    }
}
