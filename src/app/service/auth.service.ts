import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { BaseService } from "./base-service";
import { Customer } from "../model/entity/customer";
import { CustomerCrudService } from "./crud/customer-crud.service";
import { SessionService } from "./session.service";
import { CookieService } from "ngx-cookie-service";
import { CustomerFactory } from "../model/factory/customer.factory";
import { CustomerService } from "./customer.service";
import { StockAnalystConsensusCache } from './stock-analyst-consensus-cache';

/**
 * This is the service that identifies the login status of a user and performs the login and logout functionality.
 *
 * See: https://angular.io/guide/router#teach-authguard-to-authenticate
 */
@Injectable()
export class AuthService extends BaseService
{
    public isLoggedIn = false;

    // store the URL so we can redirect after logging in
    public redirectUrl: string;

    constructor( private customerCrudService: CustomerCrudService,
                 private customerFactory: CustomerFactory,
                 private customerService: CustomerService,
                 private cookieService: CookieService,
                 private sessionService: SessionService,
                 private stockAnalystConsensusCache: StockAnalystConsensusCache )
    {
        super();
        if ( this.cookieService.check( "customer" ) )
        {
            this.debug( "found customer cookie: " +  this.cookieService.get( "customer" ) );
            this.sessionService.customer = this.customerFactory
                                               .newModelObjectFromJSON( JSON.parse( this.cookieService.get( "customer" )));
            this.onLogin( this.sessionService.customer );
        }
    }

    /**
     * Perform the login authentication.
     * @param {string} email
     * @param {string} password
     * @returns {Observable<boolean>}
     */
    public login( email: string, password: string ): Observable<boolean>
    {
        this.debug( "login email: " + email );
        return this.customerCrudService
                   .getCustomerByEmail( email )
                   .map( (customer: Customer ) =>
                         {
                             if ( customer.email === email )
                             {
                                 this.debug( "login successful" );
                                 this.onLogin( customer );
                                 return true;
                             }
                             else
                             {
                                 this.debug( "login failed" );
                                 this.isLoggedIn = false;
                                 return false;
                             }
                         } );
    }

    /**
     * This method is called when the user logs in successfully or the login cookies are found.
     * @param {Customer} customer
     */
    private onLogin( customer: Customer )
    {
        this.cookieService.set( "customer", JSON.stringify( customer ) );
        this.isLoggedIn = true;
        this.sessionService.customer = customer;
        this.customerService.onLogin( this.sessionService.customer );
        this.stockAnalystConsensusCache.load();
    }

    public logout(): void
    {
        this.debug( "logout" );
        this.isLoggedIn = false;
    }
}
