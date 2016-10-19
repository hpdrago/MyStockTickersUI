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
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, DropdownModule,
         SelectButtonModule } from 'primeng/primeng';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

/**
 * Application Imports
 */
import { AppComponent }         from './app.component';
import { StocksComponent }      from './component/stock/stocks.component';
import { StockService }         from './service/stock.service';
import { StockExchangeService } from './service/stock-exchange.service';
import { LoggerService }        from './service/logger.service';
import { routing }              from './app_routes';
import { DashboardComponent }   from './component/dashboard/dashboard.component';
import { StockDetailComponent } from './component/stock/stock-detail.component';
import { StockDialogComponent } from "./component/stock/stock-dialog.component";
import { UppercaseDirective }   from "./directives/uppercase.directive";

@NgModule({
    imports:
    [
        // Angular2 modules
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        // PrimeNG modules
        DropdownModule,
        DataTableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        SelectButtonModule,
        // ng2-bootstrap modules
        AlertModule
    ],
    declarations:
    [
        AppComponent,
        StocksComponent,
        StockDetailComponent,
        DashboardComponent,
        StockDialogComponent,
        UppercaseDirective
    ],
    bootstrap:
    [
        AppComponent
    ],
    providers:
    [
        // Global providers -- singletons
        StockService,
        StockExchangeService,
        LoggerService
    ]
})
export class AppModule {}
