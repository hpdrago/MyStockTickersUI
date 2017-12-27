import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { PaginationPage } from "../../common/pagination";
import { PaginationURL } from "../../common/pagination-url";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "./../app-configuration.service";
import { StockFactory } from "../../model/factory/stock.factory";
import { Stock } from "../../model/entity/stock";
import { StockQuote } from "../../model/entity/stock-quote";
import { CrudRestService } from "./crud-rest.serivce";

/**
 * This class provides all of the REST communication services for Stocks.
 *
 * Created by mike on 9/14/2016.
 */
@Injectable()
export class StockCrudService extends CrudRestService<Stock>
{
    private stocksUrl: string = '/stocks';
    private stocksCompaniesLikeUrl: string = '/' + this.stocksUrl + '/companiesLike';
    private stocksCompaniesLikePaginationUrl: PaginationURL;

    constructor( protected http: Http,
                 protected session: SessionService,
                 protected appConfig: AppConfigurationService,
                 private stockFactory: StockFactory )
    {
        super( http, session, appConfig, stockFactory );
        this.stocksCompaniesLikePaginationUrl = new PaginationURL( appConfig.getBaseURL() + this.stocksCompaniesLikeUrl );
    }

    protected getContextURL( stock: Stock ): string
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
                        .map( ( response: Response ) => response.json() )
                        .catch( ( error: any ) => Observable.throw( this.reportError( error )) );
    }

    /**
     * Get a stock by the ticker symbol
     * @param tickerSymbol
     * @returns {Observable<StockQuote>}
     */
    public getStock( tickerSymbol: string ): Observable<StockQuote>
    {
        return this.getStockQuote( tickerSymbol );
    }

    /**
     * Get a stock quote
     * @param {string} tickerSymbol
     * @return {Observable<StockQuote>}
     */
    public getStockQuote( tickerSymbol: string ): Observable<StockQuote>
    {
        let methodName = "getStockQuote";
        this.debug( methodName + " " + tickerSymbol );
        let url = this.appConfig.getBaseURL() + this.getContextURL( null ) + "/stockQuote/" + tickerSymbol;
        return this.http
                   .get( url )
                   .map( ( response: Response ) => response.json() )
                   .catch( ( error: any ) => Observable.throw( this.reportError( error )) );
    }
}
