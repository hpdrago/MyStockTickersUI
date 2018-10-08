/**
 * Created by mike on 9/16/2016.
 */
import { RouterModule, Routes } from '@angular/router';
import { QuadViewComponent } from './component/quadview/quad-view.component';
import { PortfolioStockFormComponent } from "./component/portfolio-stock/portfolio-stock-form.component";
import { StockNotesTableComponent } from "./component/stock-notes/stock-notes-table.component";
import { StockToBuyTableComponent } from "./component/stock-to-buy/stock-to-buy-table.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { AuthGuardService } from "./service/auth-guard.service";
import { AdminComponent } from "./component/admin/admin.component";
import { TradeItAccountsComponent } from "./component/tradeit-account/tradeit-accounts.component";
import { GainsLossesTableComponent } from './component/gains-losses/gains-losses-table.component';
import { StockNotesAddComponent } from './component/stock-notes/stock-notes-add.component';
import { StockToBuyAddComponent } from './component/stock-to-buy/stock-to-buy-add.component';
import { StockAnalystConsensusAddComponent } from './component/stock-analyst-consensus/stock-analyst-consensus-add.component';
import { StockCatalystEventAddComponent } from './component/stock-catalyst-event/stock-catalyst-event-add.component';
import { StockAnalystConsensusTableComponent } from './component/stock-analyst-consensus/stock-analyst-consensus-table.component';
import { StockCatalystEventTableComponent } from './component/stock-catalyst-event/stock-catalyst-event-table.component';
import { WatchListAddComponent } from './component/watch-list/watch-list-add.component';
import { WatchListTableComponent } from './component/watch-list/watch-list-table.component';
import { WatchListStockAddComponent } from './component/watch-list-stock/watch-list-stock-add.component';
import { WatchListStockTableComponent } from './component/watch-list-stock/watch-list-stock-table.component';

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
    {
        path: 'watchList/add',
        component: WatchListAddComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'watchList/view',
        component: WatchListTableComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'watchListStock/add',
        component: WatchListStockAddComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'watchStockList/view',
        component: WatchListStockTableComponent,
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
        path:        'quadview',
        component:   QuadViewComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService]
    },
    {
        path: '',
        redirectTo: 'quadview',
        pathMatch: 'full',
        canActivate: [AuthGuardService]
    }
];

// - Updated Export
export const routing = RouterModule.forRoot(routes, {enableTracing: true});
