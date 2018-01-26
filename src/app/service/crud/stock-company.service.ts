import { ReadRestService } from './read-rest.service';
import { StockCompany } from '../../model/entity/stock-company';
import { Injectable } from '@angular/core';
import { PaginationURL } from '../../common/pagination-url';
import { HttpClient } from '@angular/common/http';
import { SessionService } from '../session.service';
import { AppConfigurationService } from '../app-configuration.service';
import { RestErrorReporter } from '../rest-error-reporter';
import { StockCompanyFactory } from '../../model/factory/stock-company-factory';
import { Observable } from 'rxjs/Observable';
import { KeyValuePairs } from '../../common/key-value-pairs';
import { PaginationPage } from '../../common/pagination';
import { StockPriceQuoteCacheService } from '../cache/stock-price-quote-cache.service';

@Injectable()
export class StockCompanyService extends ReadRestService<StockCompany>
{
    private readonly stocksUrl: string = '/stocks';
    private readonly stockCompanyUrl: string = this.stocksUrl + '/company';
    private readonly stocksCompaniesLikeUrl: string = this.stocksUrl + '/companiesLike';
    private readonly stocksCompaniesLikePaginationUrl: PaginationURL;

    /**
     * Constructor.
     * @param {HttpClient} http
     * @param {SessionService} session
     * @param {AppConfigurationService} appConfig
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockCompanyFactory} stockCompanyFactory
     * @param {StockPriceQuoteCacheService} stockPriceQuoteCacheService
     */
    constructor( protected http: HttpClient,
                 protected session: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockCompanyFactory: StockCompanyFactory,
                 protected stockPriceQuoteCacheService: StockPriceQuoteCacheService )
    {
        super( http,
               session,
               appConfig,
               restErrorReporter,
               stockCompanyFactory );

        this.stocksCompaniesLikePaginationUrl = new PaginationURL( appConfig.getBaseURL() + this.stocksCompaniesLikeUrl );
    }

    protected getContextBaseURL(): string
    {
        return this.stocksUrl;
    }

    /**
     * Check for the ticker symbol being set.
     * @param {StockCompany} stockCompany
     * @returns {string}
     */
    protected getContextURLKeyValues( stockCompany: StockCompany ): KeyValuePairs<string,any>
    {
        let keyColumns: KeyValuePairs<string,any> = new KeyValuePairs<string, any>();
        if ( stockCompany.tickerSymbol )
        {
            keyColumns.addPair( "tickerSymbol", stockCompany.tickerSymbol );
        }
        return keyColumns;
    }

    /**
     * Get a list of stocks where the company or ticker symbol matches {@code searchString}
     * @param searchString
     * @returns {Observable<R>}
     */
    public getStockCompaniesLike( searchString: string ): Observable<PaginationPage<StockCompany>>
    {
        this.debug( "getStockCompaniesLike " + searchString )
        return this.http.get( this.stocksCompaniesLikePaginationUrl
                                  .getPageWithSearchString( searchString, 0, 20 ) )
                   .catch( ( error: any ) =>
                           {
                               this.restErrorReporter.reportRestError( error );
                               return Observable.throw( error )
                           });
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
        let stockCompany: StockCompany = this.stockCompanyFactory.newModelObject();
        stockCompany.tickerSymbol = tickerSymbol;
        let url = this.getCompleteURL( this.getContextURLFrom( '/company', stockCompany ), null );
        return super.httpRequestModelObject( url );
    }
}
