/**
 * Created by mike on 9/16/2016.
 */
import { Routes, RouterModule } from '@angular/router';
import { StockTableComponent }      from './component/stock/stock-table.component';
import { DashboardComponent }   from './component/dashboard/dashboard.component';
import { StockFormComponent } from './component/stock/stock-form.component';
import { PortfolioStockFormComponent } from "./component/portfoliostock/portfolio-stock-form.component";
import { PortfolioTableComponent } from "./component/portfolio/portfolio-table.component";
import {StockNotesTableComponent} from "./component/stocknotes/stock-notes-table.component";
import { StockCatalystEventTableComponent } from "./component/stockcatalystevent/stock-catalyst-event-table.component";
import { StockAnalystConsensusTableComponent } from "./component/stockanalystconsensus/stock-analyst-consensus-table.component";
import { StockToBuyTableComponent } from "./component/stocktobuy/stock-to-buy-table.component";

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
        component: StockNotesTableComponent,
    },
    {
        path: 'stockCatalystEvents',
        component: StockCatalystEventTableComponent,
    },
    {
        path: 'stockAnalystConsensus',
        component: StockAnalystConsensusTableComponent,
    },
    {
        path: 'stocksToBuy',
        component: StockToBuyTableComponent,
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
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];

// - Updated Export
export const routing = RouterModule.forRoot(routes);
