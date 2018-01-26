import { BaseService } from './base-service';
import { StockCompany } from '../model/entity/stock-company';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { StockPriceQuote } from '../model/entity/stock-price-quote';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { StockCompanyCacheService } from './cache/stock-company-cache.service';
import { StockPriceQuoteCacheService } from './cache/stock-price-quote-cache.service';
import { StockCompanyFactory } from '../model/factory/stock-company-factory';
import { Injectable } from '@angular/core';

/**
 * This service retrieves a stock quote and a stock company simultaneously.
 * This is used when users are selecting stock companies.
 */
@Injectable()
export class StockCompanyPriceQuoteService extends BaseService
{
    /**
     * Constructor.
     * @param {StockCompanyCacheService} stockCompanyCacheService
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCacheService
     * @param {StockCompanyFactory} stockCompanyFactory
     */
    public constructor( private stockCompanyCacheService: StockCompanyCacheService,
                        private stockPriceQuoteCacheService: StockPriceQuoteCacheService,
                        private stockCompanyFactory: StockCompanyFactory )
    {
        super();
    }

    /**
     * Get a stock company instance for the model object.
     * @param {string} tickerSymbol
     * @return {Observable<StockCompany>}
     */
    public getStockCompany( tickerSymbol: string ): Observable<StockCompany>
    {
        const methodName = 'getStockCompany';
        this.debug( methodName + ' ' + tickerSymbol );
        let subject: Subject<StockCompany> = new Subject<StockCompany>();
        /*
         * Call to get the stock company and the stock price quote
         */
        let stockCompanyRequest: Observable<StockCompany> = this.stockCompanyCacheService
                                                                .get( tickerSymbol );
        let stockPriceQuoteRequest: Observable<StockPriceQuote> = this.stockPriceQuoteCacheService
                                                                      .get( tickerSymbol );
        forkJoin( stockCompanyRequest,
                  stockPriceQuoteRequest )
            .subscribe( results =>
                        {
                            let stockCompany: StockCompany = this.stockCompanyFactory
                                                                 .newModelObjectFromJSON( results[0] );
                            let stockPriceQuote: StockPriceQuote = results[1];
                            this.debug( methodName + ' received stockCompany: ' + JSON.stringify( stockCompany ));
                            this.debug( methodName + ' received stockPriceQuote: ' + JSON.stringify( stockPriceQuote ));
                            stockCompany.lastPrice = stockPriceQuote.lastPrice;
                            subject.next( stockCompany );
                            subject.complete();
                        },
                        error =>
                        {
                            this.logError( `${methodName} tickerSymbol: ${tickerSymbol} error: ${error}` );
                            subject.error( error );
                            Observable.throw( error )
                        });
        return subject.asObservable().share();
    }

}
