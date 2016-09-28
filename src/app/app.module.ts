/**
 * Created by mike on 9/16/2016.
 */
/**
 * Angular Imports
 */
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule  }    from '@angular/http';

/**
 * Application Imports
 */
import { AppComponent }   from './app.component';
import { StocksComponent } from './component/stock/stocks.component';
import { StockService }   from './service/stock.service';
import { routing }        from './app_routes';
import { DashboardComponent }   from './component/dashboard/dashboard.component';
import { StockDetailComponent } from './component/stock/stock-detail.component';

@NgModule({
    imports:
    [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations:
    [
        AppComponent,
        StocksComponent,
        StockDetailComponent,
        DashboardComponent
    ],
    bootstrap:
    [
        AppComponent
    ],
    providers:
    [
        StockService
    ]
})
export class AppModule {}
