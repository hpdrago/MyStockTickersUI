/**
 * Created by mike on 9/14/2016.
 */

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import '../rxjs-operators';

import { Stock } from '../model/stock';
import { PaginationPage } from '../common/pagination';
import { PaginationURL } from '../common/pagination-url';

@Injectable()
export class StockService
{
    private stocksUrl: string = 'http://localhost:8080/stocks';
    private stocksPaginationUrl: PaginationURL;
    private http: Http;

    constructor( http: Http )
    {
        this.http = http;
        this.stocksPaginationUrl = new PaginationURL( this.stocksUrl );
    }

    /**
     * Retrieves a specific page of stocks
     * @param rowOffSet The page to retrieve
     * @param rows The numbers of rows per page (rows to return for this page)
     * @returns {Observable<PaginationPage<Stock>>}
     */
    public getStocksPage( rowOffSet: number, rows: number ): Observable<PaginationPage<Stock>>
    {
        return this.http.get( this.stocksPaginationUrl.getPage( rowOffSet, rows ) )
            .map( ( response: Response ) => response.json() )
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    public getStocks(): Observable<PaginationPage<Stock>>
    {
        return this.http.get( this.stocksUrl )
            .map( ( response: Response ) => response.json() )
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    // Get a new stock
    // Delete a stock
    public getStock( tickerSymbol: string ): Observable<Stock>
    {
        return this.http.get( `${this.stocksUrl}/${tickerSymbol}` ) // ...using put request
            .map( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

    // Add a new stock
    public addStock( stock: Stock ): Observable<Stock[]>
    {
        let bodyString = JSON.stringify( stock ); // Stringify payload
        let headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        let options = new RequestOptions( { headers: headers } ); // Create a request option

        return this.http.post( this.stocksUrl, stock, options ) // ...using post request
            .map( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

    // Update a stock
    public updateStock( body: Object ): Observable<Stock[]>
    {
        let bodyString = JSON.stringify( body ); // Stringify payload
        let headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        let options = new RequestOptions( { headers: headers } ); // Create a request option

        return this.http.put( `${this.stocksUrl}/${body['id']}`, body, options ) // ...using put request
            .map( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

    // Delete a stock
    public removeStock( id: string ): Observable<Stock[]>
    {
        return this.http.delete( `${this.stocksUrl}/${id}` ) // ...using put request
            .map( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

    private handleError (error: any)
    {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}