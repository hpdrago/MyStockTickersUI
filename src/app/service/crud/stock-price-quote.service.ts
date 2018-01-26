import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "./../app-configuration.service";
import { StockPriceQuoteFactory } from "../../model/factory/stock-price-quote.factory";
import { StockPriceQuote } from "../../model/entity/stock-price-quote";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ToastsManager } from 'ng2-toastr';
import { isNullOrUndefined } from 'util';

/**
 * This class provides all of the REST communication services for Stocks.
 *
 * Created by mike on 9/14/2016.
 */
@Injectable()
export class StockPriceQuoteService extends BaseService
{
    private readonly stocksUrl: string = '/stocks/';

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {HttpClient} http
     * @param {SessionService} session
     * @param {AppConfigurationService} appConfig
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockPriceQuoteFactory} stockPriceModelObjectFactory
     */
    constructor( protected toaster: ToastsManager,
                 protected http: HttpClient,
                 protected session: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 private stockPriceModelObjectFactory: StockPriceQuoteFactory )
    {
        super( toaster );
    }

    protected getContextBaseURL(): string
    {
        return this.stocksUrl;
    }

    protected getCustomerURL(): string
    {
        return null;
    }

    /**
     * Get a stock quote
     * @param {string} tickerSymbol
     * @return {Observable<StockPriceQuote>}
     */
    public getStockPriceQuote( tickerSymbol: string ): Observable<StockPriceQuote>
    {
        let methodName = "getStockPriceQuote";
        this.debug( methodName + " " + tickerSymbol );
        if ( isNullOrUndefined( tickerSymbol ) || tickerSymbol.length == 0 )
        {
            //this.logError( 'ticker symbol is not valid' );
            return Observable.of(null);
            //throw new ReferenceError( 'ticker symbol(' + tickerSymbol + ') is not valid' );
        }
        let url = this.appConfig.getBaseURL() + this.getContextBaseURL() + "stockPriceQuote/" + tickerSymbol;
        return this.http
                   .get<StockPriceQuote>( url )
                   .map( (stockPriceQuote: StockPriceQuote) =>
                         {
                             stockPriceQuote = this.stockPriceModelObjectFactory.newModelObjectFromJSON(stockPriceQuote);
                             return stockPriceQuote;
                         })
                   .catch( error =>
                   {
                       let restException = this.restErrorReporter.getRestException( error );
                       if ( restException.status == 404 )
                       {
                           return Observable.throw( restException );
                       }
                       return Observable.throw( restException.message );
                   });
    }
}
