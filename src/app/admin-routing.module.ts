import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./service/auth-guard.service";
import { AdminComponent } from "./component/admin/admin.component";

/**
 * Routing for admin operations.
 *
 * See: https://angular.io/guide/router#teach-authguard-to-authenticate
 * @type {{path: string; component: any; canActivate: AuthGuard[]; children: {path: string; canActivateChild: AuthGuard[]; children: {path: string; component: any}[]}[]}[]}
 *
 * Created 12/5/2017
 */
const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard]/*,
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                children: [
                    { path: 'crises', component: null },
                    { path: 'heroes', component: null },
                    { path: '', component: null }
                ]
            }
        ] */
    }
];
@NgModule({
              imports: [
                  RouterModule.forChild(adminRoutes)
              ],
              exports: [
                  RouterModule
              ]
          })
export class AdminRoutingModule {}
