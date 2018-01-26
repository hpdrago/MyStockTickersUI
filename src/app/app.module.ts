/**
 * Created by mike on 9/16/2016.
 */
/**
 * Angular Imports
 */
import { ErrorHandler, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
/**
 *  Angular Material
 */
import { MatProgressBarModule, MatSliderModule } from '@angular/material';
/**
 * PrimeNG
 */
import {
    ButtonModule,
    CalendarModule,
    CheckboxModule,
    ChipsModule,
    ConfirmationService,
    ConfirmDialogModule,
    DataTableModule,
    DialogModule,
    DropdownModule,
    EditorModule,
    InputTextareaModule,
    InputTextModule,
    ListboxModule,
    MenubarModule,
    PanelModule,
    RatingModule,
    SelectButtonModule,
    SliderModule,
    TabMenuModule,
    TabViewModule,
    TooltipModule
} from "primeng/primeng";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TieredMenuModule } from "primeng/components/tieredmenu/tieredmenu";
import { AutoCompleteModule } from "primeng/components/autocomplete/autocomplete";
import { InputMaskModule } from "primeng/components/inputmask/inputmask";
import { FieldsetModule } from "primeng/components/fieldset/fieldset";
/**
 * Third party imports
 */
import { ToastModule, ToastOptions, ToastsManager } from "ng2-toastr/ng2-toastr";
/**
 * Application Imports
 */
import { routing } from "./app_routes";
import { StockExchangeService } from "./service/crud/stock-exchange.service";
import { SessionService } from "./service/session.service";
import { AppConfigurationService } from "./service/app-configuration.service";
import { AppComponent } from "./app.component";
import { StockTableComponent } from "./component/stock/stock-table.component";
import { MenuBarComponent } from "./component/menubar/menu-bar.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { StockFormComponent } from "./component/stock/stock-form.component";
import { UppercaseDirective } from "./directives/uppercase.directive";
import { PortfolioStockFormComponent } from "./component/portfolio-stock/portfolio-stock-form.component";
import { PortfolioStockTableComponent } from "./component/portfolio-stock/portfolio-stock-table.component";
import { PortfolioStockFactory } from "./model/factory/portfolio-stock.factory";
import { StockFactory } from "./model/factory/stock.factory";
import { PortfolioFactory } from "./model/factory/portfolio.factory";
import { StockSectorCrudService } from "./service/crud/stock-sector-crud.service";
import { StockAutoCompleteComponent } from "./component/common/stock-autocomplete.component";
import { StockTableButtonsComponent } from "./component/stock/stock-table-buttons.component";
import { StockDialogComponent } from "./component/stock/stock-dialog.component";
import { PortfolioStockDialogComponent } from "./component/portfolio-stock/portfolio-stock-dialog.component";
import { PortfolioStockTableButtonsComponent } from "./component/portfolio-stock/portfolio-stock-table-buttons.component";
import { PortfolioDialogComponent } from "./component/portfolio/portfolio-dialog.component";
import { PortfolioFormComponent } from "./component/portfolio/portfolio-form.component";
import { PortfolioTableComponent } from "./component/portfolio/portfolio-table.component";
import { PortfolioTableButtonsComponent } from "./component/portfolio/portfolio-table-buttons.component";
import { StockSectorFactory } from "./model/factory/stock-sector.factory";
import { StockNotesDialogComponent } from "./component/stock-notes/stock-notes-dialog.component";
import { StockNotesFormComponent } from "./component/stock-notes/stock-notes-form.component";
import { StockFormButtonsComponent } from "./component/stock/stock-form-buttons.component";
import { PortfolioStockFormButtonsComponent } from "./component/portfolio-stock/portfolio-stock-form-buttons.component";
import { PortfolioFormButtonsComponent } from "./component/portfolio/portfolio-form-buttons.component";
import { StockNotesTableButtonsComponent } from "./component/stock-notes/stock-notes-table-buttons.component";
import { StockNotesFormButtonsComponent } from "./component/stock-notes/stock-notes-form-buttons.component";
import { StockCrudService } from "./service/crud/stock-crud.service";
import { PortfolioCrudService } from "./service/crud/portfolio-crud.service";
import { PortfolioStockCrudService } from "./service/crud/portfolio-stock-crud.service";
import { StockNotesCrudService } from "./service/crud/stock-notes-crud.service";
import { StockNotesFactory } from "./model/factory/stock-notes.factory";
import { StockNotesCountService } from "./service/crud/stock-notes-count.service";
import { StockNotesCountFactory } from "./model/factory/stock-note-count.factory";
import { StockNotesSourceService } from "./service/crud/stock-notes-source.service";
import { StockNotesSourceFactory } from "./model/factory/stock-notes-source.factory";
import { BusyModule } from 'angular2-busy';

import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from "ng2-currency-mask/src/currency-mask.config";
import { StockAnalystConsensusFormComponent } from "./component/stock-analyst-consensus/stock-analyst-consensus-form.component";
import { StockAnalystConsensusTableButtonsComponent } from "./component/stock-analyst-consensus/stock-analyst-consensus-table-buttons.component";
import { StockAnalystConsensusFormButtonsComponent } from "./component/stock-analyst-consensus/stock-analyst-consensus-form-buttons.component";
import { StockAnalystConsensusDialogComponent } from "./component/stock-analyst-consensus/stock-analyst-consensus-dialog.component";
import { StockAnalystConsensusCrudService } from "./service/crud/stock-analyst-consensus-crud.service";
import { StockAnalystConsensusFactory } from "./model/factory/stock-analyst-consensus.factory";
import { StockCatalystEventFactory } from "./model/factory/stock-catalyst-event.factory";
import { StockCatalystEventCrudService } from "./service/crud/stock-catalyst-event-crud.service";
import { StockCatalystEventDialogComponent } from "./component/stock-catalyst-event/stock-catalyst-event-dialog.component";
import { StockCatalystEventTableButtonsComponent } from "./component/stock-catalyst-event/stock-catalyst-event-table-buttons.component";
import { StockCatalystEventFormButtonsComponent } from "./component/stock-catalyst-event/stock-catalyst-event-form-buttons.component";
import { StockCatalystEventFormComponent } from "./component/stock-catalyst-event/stock-catalyst-event-form.component";
import { StockToBuyDialogComponent } from "./component/stock-to-buy/stock-to-buy-dialog.component";
import { StockToBuyFormComponent } from "./component/stock-to-buy/stock-to-buy-form.component";
import { StockToBuyTableButtonsComponent } from "./component/stock-to-buy/stock-to-buy-table-buttons.component";
import { StockToBuyFormButtonsComponent } from "./component/stock-to-buy/stock-to-buy-form-buttons.component";
import { StockToBuyFactory } from "./model/factory/stock-to-buy.factory";
import { StockToBuyCrudService } from "./service/crud/stock-to-buy-crud.service";
import { StockQuoteRefreshService } from "./service/stock-quote-refresh.service";
import { CustomerCrudService } from "./service/crud/customer-crud.service";
import { CustomerFactory } from "./model/factory/customer.factory";
import { UppercaseValueDirective } from "./directives/uppercase.value.accessor";
import { StockNotesTableTabComponent } from "./component/stock-notes/stock-notes-table-tab.component";
import { StockNotesTableDashboardComponent } from "./component/dashboard/stock-notes-table-dashboard.component";
import { StockToBuyTableDashboardComponent } from "./component/dashboard/stock-to-buy-table-dashboard.component";
import { StockToBuyTableTabComponent } from "./component/stock-to-buy/stock-to-buy-table-tab.component";
import { FormErrorsComponent } from "./component/common/form-errors.component";
import { StockAnalystConsensusDashboardTableComponent } from "./component/dashboard/stock-analyst-consensus-dashboard-table.component";
import { StockAnalystConsensusTableTabComponent } from "./component/stock-analyst-consensus/stock-analyst-consensus-table-tab.component";
import { TradeItAccountFactory } from "./model/factory/tradeit-account.factory";
import { TradeItAccountCrudService } from "./service/crud/tradeit-account-crud.service";
import { CustomerFormComponent } from "./component/customer/customer-form.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { CustomerPanelComponent } from "./component/customer/customer-panel.component";
import { CustomerFormButtonsComponent } from "./component/customer/customer-form-buttons.component";
import { CustomerService } from "./service/customer.service";
import { AuthGuardService } from "./service/auth-guard.service";
import { AuthService } from "./service/auth.service";
import { LoginRoutingModule } from "./login-routes.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { LoginComponent } from "./login.component";
import { AdminComponent } from "./component/admin/admin.component";
import { CookieService } from "ngx-cookie-service";
import { StockQuoteCache } from "./service/stock-quote-cache";
import { TradeItService } from "./service/tradeit/tradeit.service";
import { TradeItAccountTableButtonsComponent } from "./component/tradeit-account/tradeit-account-table-buttons.component";
import { TradeItAccountFormButtonsComponent } from "./component/tradeit-account/tradeit-account-form-buttons.component";
import { TradeItAccountDialogComponent } from "./component/tradeit-account/tradeit-account-dialog.component";
import { TradeItAccountFormComponent } from "./component/tradeit-account/tradeit-account-form.component";
import { TradeItAccountTableComponent } from "./component/tradeit-account/tradeit-account-table.component";
import { StockSearchComponent } from "./component/common/stock-search.component";
import { StockCatalystEventTableTabComponent } from "./component/stock-catalyst-event/stock-catalyst-event-table-tab.component";
import { TradeItAccountsComponent } from "./component/tradeit-account/tradeit-accounts.component";
import { TradeItAccountPanelComponent } from "./component/tradeit-account/tradeit-account-panel.component";
import { TradeItAccountSelectionTableComponent } from "./component/tradeit-account/tradeit-account-selection-table.component";
import { PortfoliosComponent } from "./component/portfolio/portfolios.component";
import { TradeItSecurityQuestionDialogComponent } from "./component/tradeit/tradeit-security-question-dialog.component";
import { LinkedAccountFactory } from "./model/factory/linked-account.factory";
import { LinkedAccountCrudService } from "./service/crud/linked-account-crud.service";
import { LinkedAccountTableButtonsComponent } from "./component/linked-account/linked-account-table-buttons.component";
import { LinkedAccountTableComponent } from "./component/linked-account/linked-account-table.component";
import { TradeItAccountOAuthService } from "./service/tradeit/tradeit-account-oauth.service";
import { RestErrorReporter } from "./service/rest-error-reporter";
import { TradeItErrorReporter } from "./component/tradeit/tradeit-error-reporter";
import { CustomerController } from './component/customer/customer-controller';
import { StockCatalystEventDashboardTableComponent } from './component/dashboard/stock-catalyst-event-dashboard-table.component';
import { LinkedAccountController } from './component/linked-account/linked-account-controller';
import { LinkedAccountDialogComponent } from './component/linked-account/linked-account-dialog.component';
import { LinkedAccountFormComponent } from './component/linked-account/linked-account-form.component';
import { LinkedAccountFormButtonsComponent } from './component/linked-account/linked-account-form-buttons.component';
import { StockPositionTableComponent } from './component/stock-position/stock-position-table.component';
import { StockPositionTableButtonsComponent } from './component/stock-position/stock-position-table-buttons.component';
import { StockPositionFactory } from './model/factory/stock-position-factory';
import { StockPositionCrudService } from './service/crud/stock-position-crud.service';
import { AppDefaultErrorHandler } from './app.default-error-handler';
import { StockQuoteLastPriceComponent } from './component/common/stock-quote-last-price.component';
import { StockQuotePercentChangeSinceCreatedComponent } from './component/common/stock-quote-percent-change-since-created.component';
import { StockQuoteAverageUpsidePercentComponent } from './component/common/stock-quote-average-upside-percent.component';
import { StockCommentsComponent } from './component/common/stock-comments.component';
import { StockAnalystConsensusComponent } from './component/common/stock-analyst-consensus.component';
import { TipRanksLinkComponent } from './component/common/tipranks-link.component';
import { CurrencyComponent } from './component/common/currency-component';
import { GainLossCurrencyComponent } from './component/common/gain-loss-currency.component';
import { GainLossPercentComponent } from './component/common/gain-loss-percent.component';
import { PercentComponent } from './component/common/percent.component';
import { StockQuoteDayPercentChangeComponent } from './component/common/stock-quote-day-percent-change.component';
import { DateComponent } from './component/common/date.component';
import { DateOrTimePeriodComponent } from './component/common/date-or-timeperiod.component';
import { ModelObjectLoadingComponent } from './component/common/model-object-loading.component';

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

/*
const CUSTOM_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => UppercaseValueDirective), multi: true});
*/

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
        ListboxModule,
        // Third Party modules,
        BusyModule,
        ToastModule.forRoot(),

        // StoxTracker Modules
        LoginRoutingModule,
        AdminRoutingModule
    ],
    declarations:
    [
        AppComponent,
        AdminComponent,
        LoginComponent,
        MenuBarComponent,

        CustomerFormComponent,
        CustomerPanelComponent,
        CustomerFormButtonsComponent,
        ProfileComponent,

        TradeItAccountTableComponent,
        TradeItAccountSelectionTableComponent,
        TradeItAccountFormComponent,
        TradeItAccountDialogComponent,
        TradeItAccountPanelComponent,
        TradeItAccountFormButtonsComponent,
        TradeItAccountTableButtonsComponent,
        TradeItAccountsComponent,

        LinkedAccountTableComponent,
        LinkedAccountTableButtonsComponent,
        LinkedAccountDialogComponent,
        LinkedAccountFormComponent,
        LinkedAccountFormButtonsComponent,

        StockTableComponent,
        StockFormComponent,
        StockDialogComponent,
        StockFormButtonsComponent,
        StockTableButtonsComponent,

        StockPositionTableComponent,
        StockPositionTableButtonsComponent,

        PortfoliosComponent,
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

        StockNotesTableTabComponent,
        StockNotesTableDashboardComponent,
        StockNotesFormComponent,
        StockNotesDialogComponent,
        StockNotesTableButtonsComponent,
        StockNotesFormButtonsComponent,

        StockAnalystConsensusTableTabComponent,
        StockAnalystConsensusDashboardTableComponent,
        StockAnalystConsensusFormComponent,
        StockAnalystConsensusDialogComponent,
        StockAnalystConsensusTableButtonsComponent,
        StockAnalystConsensusFormButtonsComponent,

        StockCatalystEventTableTabComponent,
        StockCatalystEventDashboardTableComponent,
        StockCatalystEventFormComponent,
        StockCatalystEventDialogComponent,
        StockCatalystEventTableButtonsComponent,
        StockCatalystEventFormButtonsComponent,

        StockToBuyTableTabComponent,
        StockToBuyTableDashboardComponent,
        StockToBuyFormComponent,
        StockToBuyDialogComponent,
        StockToBuyTableButtonsComponent,
        StockToBuyFormButtonsComponent,

        TradeItSecurityQuestionDialogComponent,

        DashboardComponent,
        FormErrorsComponent,
        UppercaseDirective,
        UppercaseValueDirective,
        StockAutoCompleteComponent,
        StockSearchComponent,
        StockQuoteLastPriceComponent,
        StockQuotePercentChangeSinceCreatedComponent,
        StockQuoteAverageUpsidePercentComponent,
        StockCommentsComponent,
        StockAnalystConsensusComponent,
        TipRanksLinkComponent,
        CurrencyComponent,
        PercentComponent,
        GainLossCurrencyComponent,
        GainLossPercentComponent,
        StockQuoteDayPercentChangeComponent,
        DateComponent,
        DateOrTimePeriodComponent,
        ModelObjectLoadingComponent
    ],
    bootstrap:
    [
        AppComponent
    ],
    providers:
    [
        // Global providers -- singletons
        AuthService,
        AuthGuardService,
        CookieService,
        StockQuoteCache,
        TradeItService,
        TradeItErrorReporter,

        CustomerController,
        CustomerService,
        CustomerCrudService,
        CustomerFactory,

        TradeItAccountCrudService,
        TradeItAccountFactory,
        TradeItAccountOAuthService,

        LinkedAccountCrudService,
        LinkedAccountFactory,
        LinkedAccountController,

        StockCrudService,
        StockSectorCrudService,
        StockExchangeService,
        StockFactory,
        StockSectorFactory,
        StockQuoteRefreshService,

        PortfolioFactory,
        PortfolioCrudService,

        PortfolioStockCrudService,
        PortfolioStockFactory,

        StockPositionCrudService,
        StockPositionFactory,

        StockNotesCrudService,
        StockNotesFactory,

        StockNotesCountService,
        StockNotesCountFactory,

        StockNotesSourceService,
        StockNotesSourceFactory,

        StockAnalystConsensusCrudService,
        StockAnalystConsensusFactory,

        StockCatalystEventCrudService,
        StockCatalystEventFactory,

        StockToBuyCrudService,
        StockToBuyFactory,

        RestErrorReporter,
        SessionService,
        ConfirmationService,
        AppConfigurationService,

        ToastOptions,
        ToastsManager,
        { provide: ErrorHandler, useClass: AppDefaultErrorHandler },
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ]
})
export class AppModule {}
