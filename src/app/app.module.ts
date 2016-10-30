/**
 * Created by mike on 9/16/2016.
 */
/**
 * Angular Imports
 */
import { NgModule }       from '@angular/core';
import { FormsModule,
         ReactiveFormsModule } from '@angular/forms';
import { CommonModule }   from "@angular/common";
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule  }    from '@angular/http';

/**
 * PrimeNG
 */
import { InputTextModule,
         DataTableModule,
         MenubarModule,
         ButtonModule,
         DialogModule,
         DropdownModule,
         PanelModule,
         TabMenuModule,
         TabViewModule,
         SelectButtonModule,
         GrowlModule } from 'primeng/primeng';

/**
 * Application Imports
 */
import { Logger }                  from './service/logger.service';
import { routing }                 from './app_routes';
import { StockService }            from './service/stock.service';
import { PortfolioService }        from './service/portfolio.service';
import { StockExchangeService }    from './service/stock-exchange.service';
import { SessionService }          from './service/session.service';
import { AppConfigurationService } from "./service/app-configuration.service";
import { AppComponent }            from './app.component';
import { StockTableComponent }     from './component/stock/stock-table.component';
import { MenuBarComponent }        from './component/common/menu-bar.component';
import { DashboardComponent }      from './component/dashboard/dashboard.component';
import { StockFormComponent }      from "./component/stock/stock-form.component";
import { UppercaseDirective }      from "./directives/uppercase.directive";
import { loggerServiceProvider } from "./providers/logger.service.provider";
import { PortfoliosComponent } from "./component/portfolio/portfolios.component";

@NgModule({
    imports:
    [
        // Angular2 modules
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        HttpModule,
        // PrimeNG modules
        DropdownModule,
        DataTableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        SelectButtonModule,
        TabMenuModule,
        TabViewModule,
        GrowlModule,
        PanelModule,
        MenubarModule,
    ],
    declarations:
    [
        AppComponent,
        MenuBarComponent,
        StockTableComponent,
        StockFormComponent,
        PortfoliosComponent,
        DashboardComponent,
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
        PortfolioService,
        StockExchangeService,
        Logger,
        SessionService,
        AppConfigurationService
    ]
})
export class AppModule {}
