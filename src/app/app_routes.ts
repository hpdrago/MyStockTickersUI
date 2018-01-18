/**
 * Created by mike on 9/16/2016.
 */
import { RouterModule, Routes } from '@angular/router';
import { StockTableComponent } from './component/stock/stock-table.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { StockFormComponent } from './component/stock/stock-form.component';
import { PortfolioStockFormComponent } from "./component/portfoliostock/portfolio-stock-form.component";
import { StockNotesTableTabComponent } from "./component/stocknotes/stock-notes-table-tab.component";
import { StockToBuyTableTabComponent } from "./component/stocktobuy/stock-to-buy-table-tab.component";
import { StockAnalystConsensusTableTabComponent } from "./component/stockanalystconsensus/stock-analyst-consensus-table-tab.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { AdminComponent } from "./component/admin/admin.component";
import { StockCatalystEventTableTabComponent } from "./component/stockcatalystevent/stock-catalyst-event-table-tab.component";
import { TradeItAccountsComponent } from "./component/tradeit-account/tradeit-accounts.component";
import { PortfoliosComponent } from "./component/portfolio/portfolios.component";

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'tradeItAccounts',
        component: TradeItAccountsComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'portfolios',
        component: PortfoliosComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'portfolioStock',
        component: PortfolioStockFormComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockNotes',
        component: StockNotesTableTabComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockCatalystEvents',
        component: StockCatalystEventTableTabComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockAnalystConsensus',
        component: StockAnalystConsensusTableTabComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stocksToBuy',
        component: StockToBuyTableTabComponent,
        canActivate: [AuthGuardService]
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
        canActivate: [AuthGuardService]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        canActivate: [AuthGuardService]
    }
];

// - Updated Export
export const routing = RouterModule.forRoot(routes);
