/**
 * Created by mike on 10/23/2016.
 */
import { Component, OnInit } from "@angular/core";
import { PortfolioService } from "../../service/portfolio.service";
import { SessionService } from "../../service/session.service";
import { Portfolio } from "../../model/portfolio";
import { Logger } from "../../service/logger.service";
import { MenuItem } from "primeng/primeng";
import { DeletePortfolioDialog } from "./delete-portfolio.dialog";

@Component(
{
    selector: 'portfolios',
    templateUrl: 'portfolios.component.html',
    styleUrls: ['portfolios.component.css'],
    providers: [DeletePortfolioDialog]
})
export class PortfoliosComponent implements OnInit
{
    private menuItems: MenuItem[] = [];
    private portfolios: Portfolio[];
    private displayAddPortfolioDialog: boolean;
    private newPortfolioName: string;

    constructor( private logger: Logger,
                 private session: SessionService,
                 private portfolioService: PortfolioService,
                 private deletePortfolioDialog: DeletePortfolioDialog )
    {
        this.logger.setClassName( PortfoliosComponent.name );
    }

    /**
     * Load the portfolios when this component is created
     */
    ngOnInit(): void
    {
        this.loadPortfolios();
    }

    /**
     * This method is called when the user has clicked on a portfolio.
     * The stocks for the portfolio will be retrieved and displayed in
     * the stocks table
     * @param portfolio
     */
    private showPortfolio( portfolio: Portfolio )
    {

    }

    /**
     * This method is called when the user has completed adding a new portfolio
     */
    private hideAddPortfolioDialog(): void
    {
        this.displayAddPortfolioDialog = false;
    }

    /**
     * this method is called when the user wants to add a new portfolio
     */
    private showAddPortfolioDialog(): void
    {
        this.displayAddPortfolioDialog = true;
    }

    /**
     * The method is called when the user clicks on the x icon on the right corner of
     * the portfolio
     * @param portfolio
     */
    private promptToDeletePortfolio( portfolio: Portfolio )
    {
        this.deletePortfolioDialog.confirm( portfolio );
    }

    /**
     * This method is bound to the DeletePortfolioDialog event when the
     * user has chosen to delete the portfolio.  This method is called
     * upon completion of the REST call to delete the portfolio
     */
    private onDeletePortfolio(): void
    {
        this.loadPortfolios();
    }

    /**
     * Save the new portfolio
     */
    private addPortfolio(): void
    {
        this.displayAddPortfolioDialog = false;
        this.portfolioService.addPortfolio( this.session.getLoggedInUserId(), this.newPortfolioName )
                             .subscribe( (portfolio)  =>
                                {
                                    this.loadPortfolios();
                                },
                                err =>
                                {
                                    this.logger.error(err);
                                });
    }

    /**
     * Load the portfolios for the customer
     */
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
            menuItem.routerLink = ['/stocks'];
            //portfolioMenuItem.routerLink = 'fa-chart';
            this.menuItems.push( menuItem ) ;
        }
        /*            [
         { label: 'Dashboard', icon: 'fa-chart', routerLink: ['/dashboard'] },
         { label: 'Stock Table', icon: 'fa-chart', routerLink: ['/stocks'] }
         ]*/
    }

}
