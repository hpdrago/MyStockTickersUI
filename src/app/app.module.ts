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
         ConfirmDialogModule,
         ConfirmationService,
         GrowlModule } from 'primeng/primeng';
import { TieredMenuModule } from "primeng/components/tieredmenu/tieredmenu";
import { AutoCompleteModule } from "primeng/components/autocomplete/autocomplete";
import { InputMaskModule } from "primeng/components/inputmask/inputmask";
/**
 * Third party imports
 */

/**
 * Application Imports
 */
import { routing }                     from './app_routes';
import { StockService }                from './service/stock.service';
import { PortfolioService }            from './service/portfolio.service';
import { StockExchangeService }        from './service/stock-exchange.service';
import { SessionService }              from './service/session.service';
import { AppConfigurationService }     from "./service/app-configuration.service";
import { AppComponent }                from './app.component';
import { StockTableComponent }         from './component/stock/stock-table.component';
import { MenuBarComponent }            from './component/menubar/menu-bar.component';
import { DashboardComponent }          from './component/dashboard/dashboard.component';
import { StockFormComponent }          from "./component/stock/stock-form.component";
import { DeletePortfolioDialog }       from "./component/portfolio/delete-portfolio.dialog";
import { UppercaseDirective }          from "./directives/uppercase.directive";
import { PortfoliosComponent }         from "./component/portfolio/portfolios.component";
import { PortfolioStocksComponent }    from "./component/portfolio/portfolio-stocks.component";
import { PortfolioStockFormComponent } from "./component/portfolio/portfolio-stock-form.component";
import { ModelFactory }                from "./model/model-factory";
import { PortfolioStockDialog } from "./component/portfolio/portfolio-stock.dialog";
import { PortfolioStockService } from "./service/portfolio-stock.service";

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
        InputMaskModule,
        DataTableModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        SelectButtonModule,
        TabMenuModule,
        TabViewModule,
        GrowlModule,
        AutoCompleteModule,
        PanelModule,
        MenubarModule,
        TieredMenuModule,
        ConfirmDialogModule
        // Third Party modules
    ],
    declarations:
    [
        AppComponent,
        MenuBarComponent,
        StockTableComponent,
        StockFormComponent,
        PortfoliosComponent,
        PortfolioStocksComponent,
        PortfolioStockFormComponent,
        PortfolioStockDialog,
        DashboardComponent,
        DeletePortfolioDialog,
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
        PortfolioStockService,
        StockExchangeService,
        ModelFactory,
        SessionService,
        ConfirmationService,
        AppConfigurationService
    ]
})
export class AppModule {}
