/**
 * Created by mike on 9/16/2016.
 */
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { PortfolioStockFormComponent } from "./component/portfolio-stock/portfolio-stock-form.component";
import { StockNotesTableTabComponent } from "./component/stock-notes/stock-notes-table-tab.component";
import { StockToBuyTableTabComponent } from "./component/stock-to-buy/stock-to-buy-table-tab.component";
import { StockAnalystConsensusTableTabComponent } from "./component/stock-analyst-consensus/stock-analyst-consensus-table-tab.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { AdminComponent } from "./component/admin/admin.component";
import { StockCatalystEventTableTabComponent } from "./component/stock-catalyst-event/stock-catalyst-event-table-tab.component";
import { TradeItAccountsComponent } from "./component/tradeit-account/tradeit-accounts.component";
import { PortfoliosComponent } from "./component/portfolio/portfolios.component";

const routes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'linkedAccounts',
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
    /* for the future
    {
        path: 'Popular Links',
        component: StockTableComponent,
    },
    {
        path: 'News',
        component: StockTableComponent,
    },
    */
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
