/**
 * Created by mike on 10/23/2016.
 */
import { Component, OnInit } from "@angular/core";
import { PortfolioService } from "../../service/portfolio.service";
import { SessionService } from "../../service/session.service";
import { Portfolio } from "../../model/portfolio";
import { Logger } from "../../service/logger.service";
import { MenuItem } from "primeng/primeng";

@Component(
{
    selector: 'portfolio-table',
    templateUrl: 'portfolio-table.component.html'
})
export class PortfolioTableComponent implements OnInit
{
    private menuItems: MenuItem[] = [];
    private portfolios: Portfolio[];

    constructor( private logger: Logger,
                 private session: SessionService,
                 private portfolioService: PortfolioService )
    {
        this.logger.setClassName( PortfolioTableComponent.name );
    }

    ngOnInit(): void
    {
        this.loadPortfolios();
    }

    private loadPortfolios()
    {
        this.portfolioService
            .getCustomerPortfolios( this.session.getLoggedInUserId() )
            .subscribe( portfolios =>
                {
                    this.portfolios = portfolios;
                    this.logger.log( "loadPortfolios: " + JSON.stringify( this.portfolios ));
                    this.logger.log( "loadPortfolios length: " + this.portfolios.length );
                    this.logger.log( "loadPortfolios[0]: " + JSON.stringify( this.portfolios[0] ));
                    this.logger.log( "loadPortfolios[0]: " + this.portfolios );
                    this.initializeMenuBar();
                }, //Bind to view
                err =>
                {
                    // Log errors if any
                    console.log(err);
                });
    }

    private initializeMenuBar()
    {
        for ( let portfolio of this.portfolios )
        {
            let menuItem = <MenuItem>{};
            menuItem.label = portfolio.name;
            menuItem.icon = 'fa-chart';
            //portfolioMenuItem.routerLink = 'fa-chart';
            this.menuItems.push( menuItem ) ;
        }
        /*            [
         { label: 'Dashboard', icon: 'fa-chart', routerLink: ['/dashboard'] },
         { label: 'Stock Table', icon: 'fa-chart', routerLink: ['/stocks'] }
         ]*/
    }

}
