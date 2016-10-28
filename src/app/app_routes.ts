/**
 * Created by mike on 9/16/2016.
 */
import { Routes, RouterModule } from '@angular/router';
import { StockTableComponent }      from './component/stock/stock-table.component';
import { DashboardComponent }   from './component/dashboard/dashboard.component';
import { StockFormComponent } from './component/stock/stock-form.component';
//import { PortfolioTableComponent } from "./component/portfolio/portfolio-table.component";
import { PortfoliosComponent } from "./component/portfolio/portfolios.component";

const routes: Routes = [
    {
        path: 'portfolios',
        component: PortfoliosComponent,
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
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

// - Updated Export
export const routing = RouterModule.forRoot(routes);
