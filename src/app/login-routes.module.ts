import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './service/auth-guard.service';
import { AuthService } from './service/auth.service';
import { LoginComponent } from './login.component';

const loginRoutes: Routes = [
    {path: 'login', component: LoginComponent}
];

/**
 * Login routes module.
 * See: https://angular.io/guide/router#teach-authguard-to-authenticate
 *
 * Guards and the service providers they require must be provided at the module-level.
 * This allows the Router access to retrieve these services from the Injector during the navigation process.
 * The same rule applies for feature modules loaded asynchronously.
 *
 * Created 12/5/2017
 */
@NgModule( {
               imports: [
                   RouterModule.forChild( loginRoutes )
               ],
               exports: [
                   RouterModule
               ],
               providers: [
                   AuthGuardService,
                   AuthService
               ]
           } )
export class LoginRoutingModule {}
