/**
 * Created by mike on 9/16/2016.
 */
import { Routes, RouterModule } from '@angular/router';
import { StocksComponent }      from './component/stock/stocks.component';
import { DashboardComponent }   from './component/dashboard/dashboard.component';
import { StockDetailComponent } from './component/stock/stock-detail.component';

const routes: Routes = [
    {
        path: 'stocks',
        component: StocksComponent,
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'stockDetail/:tickerSymbol',
        component: StockDetailComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
];

// - Updated Export
export const routing = RouterModule.forRoot(routes);
