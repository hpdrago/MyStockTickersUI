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
import { GainsLossesTableTabComponent } from './component/gains-losses/gains-losses-table-tab.component';
import { StockNotesAddComponent } from './component/stock-notes/stock-notes-add.component';
import { StockToBuyAddComponent } from './component/stock-to-buy/stock-to-buy-add.component';
import { StockAnalystConsensusAddComponent } from './component/stock-analyst-consensus/stock-analyst-consensus-add.component';
import { StockCatalystEventAddComponent } from './component/stock-catalyst-event/stock-catalyst-event-add.component';

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
        path: 'stockNotes/add',
        component: StockNotesAddComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockNotes',
        component: StockNotesTableTabComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockNotes/view',
        component: StockNotesTableTabComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockCatalystEvents/add',
        component: StockCatalystEventAddComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockCatalystEvents/view',
        component: StockCatalystEventTableTabComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockAnalystConsensus/add',
        component: StockAnalystConsensusAddComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockAnalystConsensus/view',
        component: StockAnalystConsensusTableTabComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockToBuy/add',
        component: StockToBuyAddComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'stockToBuy/view',
        component: StockToBuyTableTabComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'gainsLosses',
        component: GainsLossesTableTabComponent,
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
