import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import "../rxjs-operators";
import { Stock } from "../model/class/stock";
import { PaginationPage } from "../common/pagination";
import { PaginationURL } from "../common/pagination-url";
import { SessionService } from "./session.service";
import { PagingRestCRUDService } from "./paging-rest-crud.service";
import { AppConfigurationService } from "./app-configuration.service";
import { StockFactory } from "../model/factory/stock.factory";

/**
 * This class provides all of the REST communication services for Stocks.
 *
 * Created by mike on 9/14/2016.
 */
@Injectable()
export class StockCrudService extends PagingRestCRUDService<Stock>
{
    private stocksUrl: string = 'stocks';
    private stocksCompaniesLikeUrl: string = '/' + this.stocksUrl + '/companiesLike';
    private stocksCompaniesLikePaginationUrl: PaginationURL;

    constructor( protected http: Http,
                 protected session: SessionService,
                 protected appConfig: AppConfigurationService,
                 private stockFactory: StockFactory )
    {
        super( http, session, appConfig, stockFactory );
        this.stocksCompaniesLikePaginationUrl = new PaginationURL( appConfig.getBaseUrl() + this.stocksCompaniesLikeUrl );
    }

    protected getPaginationUrl(): PaginationURL
    {
        return new PaginationURL( this.appConfig.getBaseUrl() + '/' + this.stocksUrl );
    }

    protected getCreateModelObjectUrl( baseUrl: string, stock: Stock ): string
    {
        return this.appConfig.getBaseUrl() + `/${this.stocksUrl}`;
    }

    protected getReadModelObjectUrl( baseUrl: string, stock: Stock ): string
    {
        return this.appConfig.getBaseUrl() + `/${this.stocksUrl}/${stock.tickerSymbol}`;
    }

    protected getReadModelObjectListUrl( baseUrl: string, stock: Stock ): string
    {
        return this.appConfig.getBaseUrl() + `/${this.stocksUrl}/${stock.tickerSymbol}`;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, stock: Stock ): string
    {
        return this.appConfig.getBaseUrl() + `/${this.stocksUrl}/${stock.tickerSymbol}`;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, stock: Stock ): string
    {
        return this.appConfig.getBaseUrl() + `/${this.stocksUrl}/${stock.tickerSymbol}`;
    }

    /**
     * Retrieves a specific page of stocks
     * @param rowOffSet The page to retrieve
     * @param rows The numbers of rows per page (rows to return for this page)
     * @returns {Observable<PaginationPage<Stock>>}
     */
    public getStocksPage( rowOffSet: number, rows: number ): Observable<PaginationPage<Stock>>
    {
        let methodName = "getStockPage";
        this.logger.log( methodName );
        return super.getPage( rowOffSet, rows );
    }

    /**
     * Get a list of stocks where the company or ticker symbol matches {@code searchString}
     * @param searchString
     * @returns {Observable<R>}
     */
    public getStockCompaniesLike( searchString: string ): Observable<PaginationPage<Stock>>
    {
        this.logger.log( "getStockCompaniesLike " + searchString )
        return this.http.get( this.stocksCompaniesLikePaginationUrl.getPageWithSearchString( searchString, 0, 20 ) )
                        .map( ( response: Response ) => response.json() )
                        .catch( ( error: any ) => Observable.throw( this.reportError( error )) );
    }

    /**
     * Get a stock by the ticker symbol
     * @param tickerSymbol
     * @returns {Observable<R>}
     */
    public getStock( tickerSymbol: string ): Observable<Stock>
    {
        let methodName = "getStock";
        this.logger.log( methodName + " tickerSymbol: " + tickerSymbol );
        let stock: Stock = this.stockFactory.newModelObject();
        stock.tickerSymbol = tickerSymbol;
        return super.getModelObject( stock );
    }

    /**
     * Adds the stock to the database
     * @param stock
     * @return {Observable<C>}
     * @override To set createdBy and userEntered before the insert
     */
    public createModelObject( stock: Stock ): Observable<Stock>
    {
        stock.userEntered = true;
        return super.createModelObject( stock );
    }

    /**
     * Determines if the user (userId) is allowed to edit or delete the stock
     * @param stock
     * @param userId
     * @returns true if the stock was entered by the logged in user, then he can change it.
     *          Or if it is me logged in :-)
     */
    public canEditOrDelete( stock: Stock, userId: number ): boolean
    {
        var canEditOrDelete = false;
        if ( stock.userEntered )
        {
            //this.logger.log( "canEditOrDelete is user entered" );
            if ( stock.createdBy == userId )
            {
                canEditOrDelete = true;
            }
        }
        return canEditOrDelete;
    }

    public isModelObjectReadOnly( stock: Stock ): boolean
    {
        var readOnly: boolean = !this.canEditOrDelete( stock, this.sessionService.getLoggedInUserId() );
        //this.logger.log( "isModelObjectReadOnly = " + readOnly + " " + JSON.stringify( stock ));
        return readOnly;
    }

}
