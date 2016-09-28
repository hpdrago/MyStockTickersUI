/**
 * Created by mike on 9/14/2016.
 */
import { Component } from '@angular/core';
import { StocksComponent } from './component/stock/stocks.component';

@Component( {
    selector:    'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent
{
    title = 'My Stock Tickers';
}

