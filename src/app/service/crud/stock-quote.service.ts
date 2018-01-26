import { ReadRestService } from './read-rest.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session.service';
import { AppConfigurationService } from '../app-configuration.service';
import { RestErrorReporter } from '../rest-error-reporter';
import { Observable } from 'rxjs/Observable';
import { KeyValuePairs } from '../../common/key-value-pairs';
import { StockQuote } from '../../model/entity/stock-quote';
import { StockQuoteFactory } from '../../model/factory/stock-quote.factory';
import { isNullOrUndefined } from 'util';

/**
 * This service retrieves StockQuotes from the backend.
 */
@Injectable()
export class StockQuoteService extends ReadRestService<StockQuote>
{
    private readonly stocksUrl: string = '/stocks/';

    /**
     * Constructor.
     * @param {HttpClient} http
     * @param {SessionService} session
     * @param {AppConfigurationService} appConfig
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockQuoteFactory} stockQuoteFactory
     */
    constructor( protected http: HttpClient,
                 protected session: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockQuoteFactory: StockQuoteFactory )
    {
        super( http,
               session,
               appConfig,
               restErrorReporter,
               stockQuoteFactory );
    }

    protected getContextBaseURL(): string
    {
        return this.stocksUrl;
    }

    /**
     * Check for the ticker symbol being set.
     * @param {StockQuote} stockCompany
     * @returns {string}
     */
    protected getContextURLKeyValues( stockCompany: StockQuote ): KeyValuePairs<string,any>
    {
        let keyColumns: KeyValuePairs<string,any> = new KeyValuePairs<string, any>();
        keyColumns.addPair( "tickerSymbol", stockCompany.tickerSymbol );
        return keyColumns;
    }

    /**
     * Get a stock company instance for the model object.
     * @param {string} tickerSymbol
     * @return {Observable<StockQuote>}
     */
    public getStockQuote( tickerSymbol: string ): Observable<StockQuote>
    {
        const methodName = 'getStockQuote ';
        this.debug( methodName + ' ' + tickerSymbol );
        if ( isNullOrUndefined( tickerSymbol ))
        {
            throw new ReferenceError( "ticker symbol is null or undefined" )
        }
        let stockQuote: StockQuote = this.stockQuoteFactory.newModelObject();
        stockQuote.tickerSymbol = tickerSymbol;
        let url = this.getCompleteURL( this.getContextURLFrom( 'quote', stockQuote ), null );
        return this.httpRequestModelObject( url )
                   .map( (stockQuote: StockQuote) =>
                    {
                        /*
                         * Convert the JSON into a Typescript object.
                         */
                        let stockQuoteObject: StockQuote = this.stockQuoteFactory
                                                               .newModelObjectFromJSON( stockQuote );
                        this.debug( methodName + ' ' + JSON.stringify( stockQuoteObject )) ;
                        return stockQuoteObject;
                    })
                   .share();
    }
}
