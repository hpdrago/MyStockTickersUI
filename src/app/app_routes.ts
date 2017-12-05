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
import { AuthGuard } from "./service/auth-guard.service";
import { AdminComponent } from "./component/admin/admin.component";

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'portfolios',
        component: PortfolioTableComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'portfolioStock',
        component: PortfolioStockFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'stockNotes',
        component: StockNotesTableTabComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'stockCatalystEvents',
        component: StockCatalystEventTableComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'stockAnalystConsensus',
        component: StockAnalystConsensusTabTableComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'stocksToBuy',
        component: StockToBuyTableTabComponent,
        canActivate: [AuthGuard]
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
        canActivate: [AuthGuard]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuard]
    }
];

// - Updated Export
export const routing = RouterModule.forRoot(routes);
