/**
 * Created by mike on 9/16/2016.
 */
/**
 * Angular Imports
 */
import { NgModule }            from '@angular/core';
import { FormsModule,
         ReactiveFormsModule } from '@angular/forms';
import { CommonModule }        from "@angular/common";
import { BrowserModule  }      from '@angular/platform-browser';
import { HttpModule  }         from '@angular/http';

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
         GrowlModule }        from 'primeng/primeng';
import { TieredMenuModule }   from "primeng/components/tieredmenu/tieredmenu";
import { AutoCompleteModule } from "primeng/components/autocomplete/autocomplete";
import { InputMaskModule }    from "primeng/components/inputmask/inputmask";
import { FieldsetModule }     from "primeng/components/fieldset/fieldset";
/**
 * Third party imports
 */
import {ToastModule} from 'ng2-toastr/ng2-toastr';

/**
 * Application Imports
 */
import { routing }                     from './app_routes';
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
import { PortfolioStockFormComponent } from "./component/portfoliostock/portfolio-stock-form.component";
import { PortfolioStockCrudService }   from "./service/portfolio-stock-crud.service";
import { PortfolioStockTableComponent }  from "./component/portfoliostock/portfolio-stock-table.component";
import { PortfolioStockDialogComponent } from "./component/portfoliostock/portfolio-stock-dialog.component";
import { StockPanelComponent } from "./component/stock/stock-panel.component";
import { PortfolioStockFactory } from "./model/portfolio-stock-factory";
import { StockFactory } from "./model/stock-factory";
import { StockFormService } from "./component/stock/stock-form.service";
import { PortfolioStockFormService } from "./component/portfoliostock/portfolio-stock-form.service";
import { StockPanelService } from "./component/stock/stock-panel.service";
import { PortfolioStockPanelService } from "./component/portfoliostock/portfolio-stock-panel.service";
import { StockCrudService } from "./service/stock-crud.service";
import { PortfolioCrudService } from "./service/portfolio-crud.service";
import { PortfolioFactory } from "./model/portfolio-factory";
import { PortfolioPanelService } from "./component/portfolio/portfolio-panel.service";
import { StockSectorCrudService } from "./service/stock-sector-crud.service";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

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
        FieldsetModule,
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
        ConfirmDialogModule,
        ToastModule
        // Third Party modules
    ],
    declarations:
    [
        AppComponent,
        MenuBarComponent,
        StockTableComponent,
        StockFormComponent,
        StockPanelComponent,
        PortfoliosComponent,
        PortfolioStockTableComponent,
        PortfolioStockFormComponent,
        PortfolioStockDialogComponent,
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
        StockCrudService,
        StockSectorCrudService,
        StockFormService,
        StockPanelService,
        StockExchangeService,
        StockFactory,
        PortfolioCrudService,
        PortfolioFactory,
        PortfolioPanelService,
        PortfolioStockCrudService,
        PortfolioStockFormService,
        PortfolioStockPanelService,
        PortfolioStockFactory,
        SessionService,
        ConfirmationService,
        AppConfigurationService,
        ToastsManager
    ]
})
export class AppModule {}
