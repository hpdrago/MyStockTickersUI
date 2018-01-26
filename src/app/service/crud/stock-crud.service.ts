import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { PaginationPage } from "../../common/pagination";
import { PaginationURL } from "../../common/pagination-url";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "./../app-configuration.service";
import { StockFactory } from "../../model/factory/stock.factory";
import { Stock } from "../../model/entity/stock";
import { StockPrice } from "../../model/entity/stock-price";
import { CrudRestService } from "./crud-rest.serivce";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

/**
 * This class provides all of the REST communication services for Stocks.
 *
 * Created by mike on 9/14/2016.
 */
@Injectable()
export class StockCrudService extends CrudRestService<Stock>
{
    private stocksUrl: string = '/stocks/';
    private stocksCompaniesLikeUrl: string = '/' + this.stocksUrl + '/companiesLike';
    private stocksCompaniesLikePaginationUrl: PaginationURL;

    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} session
     * @param {AppConfigurationService} appConfig
     * @param {StockFactory} stockFactory
     * @param {RestErrorReporter} restErrorReporter
     */
    constructor( protected http: HttpClient,
                 protected session: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 private stockFactory: StockFactory )
    {
        super( http,
               session,
               appConfig,
               restErrorReporter,
               stockFactory )
        this.stocksCompaniesLikePaginationUrl = new PaginationURL( appConfig.getBaseURL() + this.stocksCompaniesLikeUrl );
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
     * Get a list of stocks where the company or ticker symbol matches {@code searchString}
     * @param searchString
     * @returns {Observable<R>}
     */
    public getStockCompaniesLike( searchString: string ): Observable<PaginationPage<Stock>>
    {
        this.debug( "getStockCompaniesLike " + searchString )
        return this.http.get( this.stocksCompaniesLikePaginationUrl.getPageWithSearchString( searchString, 0, 20 ) )
                        .catch( ( error: any ) =>
                                {
                                    this.restErrorReporter.reportRestError( error );
                                    return Observable.throw( error )
                                });
    }

    /**
     * Get a stock by the ticker symbol
     * @param tickerSymbol
     * @returns {Observable<StockPrice>}
     */
    public getStock( tickerSymbol: string ): Observable<StockPrice>
    {
        return this.getStockPrice( tickerSymbol );
    }

    /**
     * Get a stock quote
     * @param {string} tickerSymbol
     * @return {Observable<StockPrice>}
     */
    public getStockPrice( tickerSymbol: string ): Observable<StockPrice>
    {
        let methodName = "getStockPrice";
        this.debug( methodName + " " + tickerSymbol );
        let url = this.appConfig.getBaseURL() + this.getContextBaseURL() + "stockPrice/" + tickerSymbol;
        return this.http
                   .get<StockPrice>( url )
                   .catch( error =>
                   {
                       let restException = this.restErrorReporter.getRestException( error );
                       if ( restException.status == 404 )
                       {
                           return Observable.throw( 'Ticker symbol ' + tickerSymbol + ' was not found' );
                       }
                       return Observable.throw( restException.message );
                   });
    }
}
