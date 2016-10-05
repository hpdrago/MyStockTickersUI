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
 * Third party imports
 */
import { InputTextModule, DataTableModule, ButtonModule, DialogModule } from 'primeng/primeng';

import { Angular2DataTableModule } from 'angular2-data-table';
import {
    TableOptions,
    TableColumn,
    ColumnMode
} from 'angular2-data-table'

/**
 * Application Imports
 */
import { AppComponent }   from './app.component';
import { StocksComponent } from './component/stock/stocks.component';
import { StockService }   from './service/stock.service';
import { LoggerService }   from './service/logger.service';
import { routing }        from './app_routes';
import { DashboardComponent }   from './component/dashboard/dashboard.component';
import { StockDetailComponent } from './component/stock/stock-detail.component';

@NgModule({
    imports:
    [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        InputTextModule,
        DataTableModule,
        ButtonModule,
        DialogModule,
        Angular2DataTableModule
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
        StockService,
        LoggerService
    ]
})
export class AppModule {}
