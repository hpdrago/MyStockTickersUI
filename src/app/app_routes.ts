/**
 * Created by mike on 9/16/2016.
 */
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { PortfolioStockFormComponent } from "./component/portfolio-stock/portfolio-stock-form.component";
import { StockNotesTableComponent } from "./component/stock-notes/stock-notes-table.component";
import { StockToBuyTableComponent } from "./component/stock-to-buy/stock-to-buy-table.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { AdminComponent } from "./component/admin/admin.component";
import { TradeItAccountsComponent } from "./component/tradeit-account/tradeit-accounts.component";
import { PortfoliosComponent } from "./component/portfolio/portfolios.component";
import { GainsLossesTableComponent } from './component/gains-losses/gains-losses-table.component';
import { StockNotesAddComponent } from './component/stock-notes/stock-notes-add.component';
import { StockToBuyAddComponent } from './component/stock-to-buy/stock-to-buy-add.component';
import { StockAnalystConsensusAddComponent } from './component/stock-analyst-consensus/stock-analyst-consensus-add.component';
import { StockCatalystEventAddComponent } from './component/stock-catalyst-event/stock-catalyst-event-add.component';
import { StockAnalystConsensusTableComponent } from './component/stock-analyst-consensus/stock-analyst-consensus-table.component';
import { StockCatalystEventTableComponent } from './component/stock-catalyst-event/stock-catalyst-event-table.component';

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
        path: 'portfolioStock',
        component: PortfolioStockFormComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockNotes/add',
        component: StockNotesAddComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockNotes',
        component: StockNotesTableComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockNotes/view',
        component: StockNotesTableComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockCatalystEvents/add',
        component: StockCatalystEventAddComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockCatalystEvents/view',
        component: StockCatalystEventTableComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockAnalystConsensus/add',
        component: StockAnalystConsensusAddComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockAnalystConsensus/view',
        component: StockAnalystConsensusTableComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockToBuy/add',
        component: StockToBuyAddComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockToBuy/view',
        component: StockToBuyTableComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'gainsLosses',
        component: GainsLossesTableComponent,
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
export const routing = RouterModule.forRoot(routes, {enableTracing: true});
