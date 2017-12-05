import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "./service/auth.service";
import { BaseComponent } from "./component/common/base.component";
import { ToastsManager } from "ng2-toastr";

@Component( {
                template: `
                    <h2>LOGIN</h2>
                    <p>{{message}}</p>
                    <p>
                        <button (click)="login()" *ngIf="!authService.isLoggedIn">Login</button>
                        <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
                    </p>`
            } )
export class LoginComponent extends BaseComponent
{
    message: string;

    constructor( public authService: AuthService,
                 public router: Router,
                 protected toaster: ToastsManager )
    {
        super( toaster );
        this.setMessage();
    }

    public setMessage()
    {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
        this.debug( this.message );
    }

    public login()
    {
        this.debug( "login" );
        this.message = 'Trying to log in ...';

        this.authService
            .login( 'michael.earl.65@gmail.com', '' )
            .subscribe( () =>
            {
                this.setMessage();
                if ( this.authService.isLoggedIn )
                {
                    // Get the redirect URL from our auth service
                    // If no redirect has been set, use the default
                    let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
                    this.debug( "login redirecting to " + redirect );

                    // Redirect the user
                    this.router.navigate( [redirect] );
                }
            } );
    }

    public logout()
    {
        this.authService.logout();
        this.setMessage();
    }
}
