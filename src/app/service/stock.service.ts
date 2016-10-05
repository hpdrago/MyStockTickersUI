/**
 * Created by mike on 9/14/2016.
 */

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Stock } from '../model/stock';
import { PaginationPage } from '../common/pagination';

@Injectable()
export class StockService
{
    private stocksUrl = 'http://localhost:8080/stocks';
    private http: Http;

    constructor( http: Http )
    {
        this.http = http;
    }

    /**
     * Retrieves a specific page of stocks
     * @param pageNumber The page to retrieve
     * @returns {Observable<PaginationPage<Stock>>}
     */
    getStocksPage( pageNumber: number ): Observable<PaginationPage<Stock>>
    {
        return this.http.get( this.stocksUrl + "?page=" + pageNumber )
            .map( ( response: Response ) => response.json() )
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) );

    }

    getStocks(): Observable<PaginationPage<Stock>>
    {
        return this.http.get( this.stocksUrl )
            .map( ( response: Response ) => response.json() )
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) );
    }

    // Get a new stock
    // Delete a stock
    getStock( tickerSymbol: string ): Observable<Stock>
    {
        return this.http.get( `${this.stocksUrl}/${tickerSymbol}` ) // ...using put request
            .map( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

    // Add a new stock
    addStock( body: Object ): Observable<Stock[]>
    {
        let bodyString = JSON.stringify( body ); // Stringify payload
        let headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        let options = new RequestOptions( { headers: headers } ); // Create a request option

        return this.http.post( this.stocksUrl, body, options ) // ...using post request
            .map( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

    // Update a stock
    updateStock( body: Object ): Observable<Stock[]>
    {
        let bodyString = JSON.stringify( body ); // Stringify payload
        let headers = new Headers( { 'Content-Type': 'application/json' } ); // ... Set content type to JSON
        let options = new RequestOptions( { headers: headers } ); // Create a request option

        return this.http.put( `${this.stocksUrl}/${body['id']}`, body, options ) // ...using put request
            .map( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

    // Delete a stock
    removeStock( id: string ): Observable<Stock[]>
    {
        return this.http.delete( `${this.stocksUrl}/${id}` ) // ...using put request
            .map( ( res: Response ) => res.json() ) // ...and calling .json() on the response to return data
            .catch( ( error: any ) => Observable.throw( error.json().error || 'Server error' ) ); //...errors if any
    }

}