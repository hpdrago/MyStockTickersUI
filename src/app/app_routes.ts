/**
 * Created by mike on 9/16/2016.
 */
import { RouterModule, Routes } from '@angular/router';
import { StockTableComponent } from './component/stock/stock-table.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { StockFormComponent } from './component/stock/stock-form.component';
import { PortfolioStockFormComponent } from "./component/portfoliostock/portfolio-stock-form.component";
import { PortfolioTableComponent } from "./component/portfolio/portfolio-table.component";
import { StockCatalystEventTableComponent } from "./component/stockcatalystevent/stock-catalyst-event-table.component";
import { StockNotesTableTabComponent } from "./component/stocknotes/stock-notes-table-tab.component";
import { StockToBuyTableTabComponent } from "./component/stocktobuy/stock-to-buy-table-tab.component";
import { StockAnalystConsensusTabTableComponent } from "./component/stockanalystconsensus/stock-analyst-consensus-tab-table.component";
import { ProfileComponent } from "./component/profile/profile.component";

const routes: Routes = [
    {
        path: 'portfolios',
        component: PortfolioTableComponent,
    },
    {
        path: 'portfolioStock',
        component: PortfolioStockFormComponent,
    },
    {
        path: 'stockNotes',
        component: StockNotesTableTabComponent,
    },
    {
        path: 'stockCatalystEvents',
        component: StockCatalystEventTableComponent,
    },
    {
        path: 'stockAnalystConsensus',
        component: StockAnalystConsensusTabTableComponent,
    },
    {
        path: 'stocksToBuy',
        component: StockToBuyTableTabComponent,
    },
    {
        path: 'Popular Links',
        component: StockTableComponent,
    },
    {
        path: 'News',
        component: StockTableComponent,
    },
    {
        path: 'stocks',
        component: StockTableComponent,
    },
    {
        path: 'stockDetail/:tickerSymbol',
        component: StockFormComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'profile',
        component: ProfileComponent,
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

// - Updated Export
export const routing = RouterModule.forRoot(routes);
