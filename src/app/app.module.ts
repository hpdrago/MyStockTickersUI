///<reference path="service/crud/stock-notes-crud.service.ts"/>
/**
 * Created by mike on 9/16/2016.
 */
/**
 * Angular Imports
 */
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

/**
 *  Angular Material
 */
import {MatProgressBarModule} from '@angular/material';
import {MatSliderModule} from '@angular/material';

/**
 * PrimeNG
 */
import {
    InputTextModule,
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
    InputTextareaModule,
    CheckboxModule,
    RatingModule,
    CalendarModule,
    EditorModule,
    SliderModule,
    ChipsModule, TooltipModule
} from "primeng/primeng";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TieredMenuModule } from "primeng/components/tieredmenu/tieredmenu";
import { AutoCompleteModule } from "primeng/components/autocomplete/autocomplete";
import { InputMaskModule } from "primeng/components/inputmask/inputmask";
import { FieldsetModule } from "primeng/components/fieldset/fieldset";
/**
 * Third party imports
 */
import { ToastModule,
         ToastOptions,
         ToastsManager } from "ng2-toastr/ng2-toastr";

/**
 * Application Imports
 */
import { routing } from "./app_routes";
import { StockExchangeService } from "./service/crud/stock-exchange.service";
import { SessionService } from "./service/crud/session.service";
import { AppConfigurationService } from "./service/app-configuration.service";
import { AppComponent } from "./app.component";
import { StockTableComponent } from "./component/stock/stock-table.component";
import { MenuBarComponent } from "./component/menubar/menu-bar.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { StockFormComponent } from "./component/stock/stock-form.component";
import { UppercaseDirective } from "./directives/uppercase.directive";
import { PortfolioStockFormComponent } from "./component/portfoliostock/portfolio-stock-form.component";
import { PortfolioStockTableComponent } from "./component/portfoliostock/portfolio-stock-table.component";
import { PortfolioStockFactory } from "./model/factory/portfolio-stock.factory";
import { StockFactory } from "./model/factory/stock.factory";
import { PortfolioFactory } from "./model/factory/portfolio.factory";
import { StockSectorCrudService } from "./service/crud/stock-sector-crud.service";
import { StockAutoCompleteComponent } from "./component/common/stock-autocomplete.component";
import { StockTableButtonsComponent } from "./component/stock/stock-table-buttons.component";
import { StockDialogComponent } from "./component/stock/stock-dialog.component";
import { PortfolioStockDialogComponent } from "./component/portfoliostock/portfolio-stock-dialog.component";
import { PortfolioStockTableButtonsComponent } from "./component/portfoliostock/portfolio-stock-table-buttons.component";
import { PortfolioDialogComponent } from "./component/portfolio/portfolio-dialog.component";
import { PortfolioFormComponent } from "./component/portfolio/portfolio-form.component";
import { PortfolioTableComponent } from "./component/portfolio/portfolio-table.component";
import { PortfolioTableButtonsComponent } from "./component/portfolio/portfolio-table-buttons.component";
import { StockSectorFactory } from "./model/factory/stock-sector.factory";
import { StockNotesDialogComponent } from "./component/stocknotes/stock-notes-dialog.component";
import { StockNotesTableComponent } from "./component/stocknotes/stock-notes-table.component";
import { StockNotesFormComponent } from "./component/stocknotes/stock-notes-form.component";
import { StockFormButtonsComponent } from "./component/stock/stock-form-buttons.component";
import { PortfolioStockFormButtonsComponent } from "./component/portfoliostock/portfolio-stock-form-buttons.component";
import { PortfolioFormButtonsComponent } from "./component/portfolio/portfolio-form-buttons.component";
import { StockNotesTableButtonsComponent } from "./component/stocknotes/stock-notes-table-buttons.component";
import { StockNotesFormButtonsComponent } from "./component/stocknotes/stock-notes-form-buttons.component";
import { StockNotesCrudServiceContainer } from "./component/stocknotes/stock-notes-crud-service-container";
import { PortfolioStockCrudServiceContainer } from "./component/portfoliostock/portfolio-stock-crud-service-container";
import { PortfolioCrudServiceContainer } from "./component/portfolio/porfolio-crud-service-container";
import { StockCrudServiceContainer } from "./component/stock/stock-crud-service-container";
import { StockCrudService } from "./service/crud/stock-crud.service";
import { PortfolioCrudService } from "./service/crud/portfolio-crud.service";
import { PortfolioStockCrudService } from "./service/crud/portfolio-stock-crud.service";
import { StockNotesCrudService } from "./service/crud/stock-notes-crud.service";
import { StockNotesFactory } from "./model/factory/stock-notes.factory";
import { StockNotesCountService } from "./service/crud/stock-notes-count.service";
import { StockNotesCountFactory } from "./model/factory/stock-note-count.factory";
import { StockNotesSourceService } from "./service/crud/stock-notes-source.service";
import { StockNotesSourceFactory } from "./model/factory/stock-notes-source.factory";
import {BusyModule} from 'angular2-busy';

import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from "ng2-currency-mask/src/currency-mask.config";
import { StockAnalystConsensusTableComponent } from "./component/stockanalystconsensus/stock-analyst-consensus-table.component";
import { StockAnalystConsensusFormComponent } from "./component/stockanalystconsensus/stock-analyst-consensus-form.component";
import { StockAnalystConsensusTableButtonsComponent } from "./component/stockanalystconsensus/stock-analyst-consensus-table-buttons.component";
import { StockAnalystConsensusFormButtonsComponent } from "./component/stockanalystconsensus/stock-analyst-consensus-form-buttons.component";
import { StockAnalystConsensusDialogComponent } from "./component/stockanalystconsensus/stock-analyst-consensus-dialog.component";
import { StockAnalystConsensusCrudService } from "./service/crud/stock-analyst-consensus-crud.service";
import { StockAnalystConsensusCrudServiceContainer } from "./component/stockanalystconsensus/stock-analyst-consensus-crud-service-container";
import { StockAnalystConsensusFactory } from "./model/factory/stock-analyst-consensus.factory";
import { StockCatalystEventFactory } from "./model/factory/stock-catalyst-event.factory";
import { StockCatalystEventCrudServiceContainer } from "./component/stockcatalystevent/stock-catalyst-event-crud-service-container";
import { StockCatalystEventCrudService } from "./service/crud/stock-catalyst-event-crud.service";
import { StockCatalystEventDialogComponent } from "./component/stockcatalystevent/stock-catalyst-event-dialog.component";
import { StockCatalystEventTableComponent } from "./component/stockcatalystevent/stock-catalyst-event-table.component";
import { StockCatalystEventTableButtonsComponent } from "./component/stockcatalystevent/stock-catalyst-event-table-buttons.component";
import { StockCatalystEventFormButtonsComponent } from "./component/stockcatalystevent/stock-catalyst-event-form-buttons.component";
import { StockCatalystEventFormComponent } from "./component/stockcatalystevent/stock-catalyst-event-form.component";
import { StockToBuyDialogComponent } from "./component/stocktobuy/stock-to-buy-dialog.component";
import { StockToBuyTableComponent } from "./component/stocktobuy/stock-to-buy-table.component";
import { StockToBuyFormComponent } from "./component/stocktobuy/stock-to-buy-form.component";
import { StockToBuyTableButtonsComponent } from "./component/stocktobuy/stock-to-buy-table-buttons.component";
import { StockToBuyFormButtonsComponent } from "./component/stocktobuy/stock-to-buy-form-buttons.component";
import { StockToBuyFactory } from "./model/factory/stock-to-buy.factory";
import { StockToBuyCrudServiceContainer } from "./component/stocktobuy/stock-to-buy-crud-service-container";
import { StockToBuyCrudService } from "./service/crud/stock-to-buy-crud.service";
import { StockQuoteRefreshService } from "./service/stock-quote-refresh.service";
import { CustomerService } from "./service/crud/customer.service";
import { CustomerFactory } from "./model/factory/customer.factory";
import { ModelObjectChangeService } from "./service/crud/model-object-change.service";

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "left",
    allowNegative: false,
    allowZero: true,
    decimal: ".",
    precision: 2,
    prefix: "$ ",
    suffix: "",
    thousands: ","
};

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
        BrowserAnimationsModule,
        // Angular Material modules
        MatProgressBarModule,
        MatSliderModule,
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
        AutoCompleteModule,
        PanelModule,
        MenubarModule,
        TieredMenuModule,
        ConfirmDialogModule,
        InputTextareaModule,
        RatingModule,
        CalendarModule,
        EditorModule,
        SliderModule,
        CurrencyMaskModule,
        ChipsModule,
        CheckboxModule,
        TooltipModule,
        // Third Party modules,
        BusyModule,
        ToastModule.forRoot()
    ],
    declarations:
    [
        AppComponent,
        MenuBarComponent,

        StockTableComponent,
        StockFormComponent,
        StockDialogComponent,
        StockFormButtonsComponent,
        StockTableButtonsComponent,

        PortfolioTableComponent,
        PortfolioFormComponent,
        PortfolioFormButtonsComponent,
        PortfolioDialogComponent,
        PortfolioTableButtonsComponent,

        PortfolioStockTableComponent,
        PortfolioStockTableButtonsComponent,
        PortfolioStockFormComponent,
        PortfolioStockDialogComponent,
        PortfolioStockFormButtonsComponent,

        StockNotesTableComponent,
        StockNotesFormComponent,
        StockNotesDialogComponent,
        StockNotesTableButtonsComponent,
        StockNotesFormButtonsComponent,

        StockAnalystConsensusTableComponent,
        StockAnalystConsensusFormComponent,
        StockAnalystConsensusDialogComponent,
        StockAnalystConsensusTableButtonsComponent,
        StockAnalystConsensusFormButtonsComponent,

        StockCatalystEventTableComponent,
        StockCatalystEventFormComponent,
        StockCatalystEventDialogComponent,
        StockCatalystEventTableButtonsComponent,
        StockCatalystEventFormButtonsComponent,

        StockToBuyTableComponent,
        StockToBuyFormComponent,
        StockToBuyDialogComponent,
        StockToBuyTableButtonsComponent,
        StockToBuyFormButtonsComponent,

        DashboardComponent,
        UppercaseDirective,
        StockAutoCompleteComponent
    ],
    bootstrap:
    [
        AppComponent
    ],
    providers:
    [
        // Global providers -- singletons
        CustomerService,
        CustomerFactory,

        StockCrudService,
        StockCrudServiceContainer,
        StockSectorCrudService,
        StockExchangeService,
        StockFactory,
        StockSectorFactory,
        StockQuoteRefreshService,

        PortfolioFactory,
        PortfolioCrudService,
        PortfolioCrudServiceContainer,

        PortfolioStockCrudService,
        PortfolioStockCrudServiceContainer,
        PortfolioStockFactory,

        StockNotesCrudService,
        StockNotesCrudServiceContainer,
        StockNotesFactory,

        StockNotesCountService,
        StockNotesCountFactory,

        StockNotesSourceService,
        StockNotesSourceFactory,

        StockAnalystConsensusCrudService,
        StockAnalystConsensusCrudServiceContainer,
        StockAnalystConsensusFactory,

        StockCatalystEventCrudService,
        StockCatalystEventCrudServiceContainer,
        StockCatalystEventFactory,

        StockToBuyCrudService,
        StockToBuyCrudServiceContainer,
        StockToBuyFactory,

        SessionService,
        ConfirmationService,
        AppConfigurationService,

        ToastOptions,
        ToastsManager,
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ]
})
export class AppModule {}
