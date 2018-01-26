import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs/Observable";
import { BaseClass } from "../common/base-class";
import { TradeItService } from "./tradeit/tradeit.service";

/**
 * Router Guard to redirect user to login screen.
 * See: https://angular.io/guide/router#teach-authguard-to-authenticate
 *
 * Created 12/5/2017
 */
@Injectable()
export class TradeItAuthGuardService extends BaseClass implements CanActivate, CanActivateChild
{
    constructor( private tradeItService: TradeItService,
                 private router: Router )
    {
        super();
    }

    /*
     * Copied from auth-guard needs to be changed.
     */
    public checkLogin( url: string ): boolean
    {
        /*
        if ( this.authService.isLoggedIn )
        {
            this.debug( "checkLogin url: " + url + " true" );
            return true;
        }

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.debug( "checkLogin url: " + url + " false" );
        this.router.navigate( ['/login'] );
        */
        return false;
    }

    public canActivateChild( childRoute: ActivatedRouteSnapshot,
                             state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean
    {
        return this.canActivate( childRoute, state );
    }

    public canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean
    {
        let url: string = state.url;
        return this.checkLogin( url );
    }

}
