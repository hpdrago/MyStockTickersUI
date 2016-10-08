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
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

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
        // Angular2 modules
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        // PrimeNG modules
        DataTableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        // ng2-bootstrap modules
        AlertModule
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
        // Global providers -- singletons
        StockService,
        LoggerService
    ]
})
export class AppModule {}
