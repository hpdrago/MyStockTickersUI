import { Component, OnInit, ViewChild } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { Portfolio } from "../../model/portfolio";
import { MenuItem } from "primeng/primeng";
import { DeletePortfolioDialog } from "./delete-portfolio.dialog";
import { PortfolioStockTableComponent } from "../portfoliostock/portfolio-stock-table.component";
import { PortfolioCrudService } from "../../service/portfolio-crud.service";
import { CrudTableComponent } from "../common/crud-table.component";
import { PortfolioFactory } from "../../model/portfolio-factory";
import { PortfolioPanelService } from "./portfolio-panel.service";
import { ToastsManager } from "ng2-toastr";

/**
 * This class contains the UI for listing the user's portfolios.
 *
 * Created by mike on 10/23/2016.
 */
@Component(
{
    selector: 'portfolios',
    templateUrl: './portfolios.component.html',
    styleUrls: ['./portfolios.component.css'],
    providers: [DeletePortfolioDialog]
})
export class PortfoliosComponent extends CrudTableComponent<Portfolio> implements OnInit
{
    private menuItems: MenuItem[] = [];
    private portfolios: Portfolio[];
    private displayAddPortfolioDialog: boolean;
    private newPortfolioName: string;
    private selectedPortfolio: Portfolio;
    @ViewChild(PortfolioStockTableComponent)
    private portfolioStocksComponent: PortfolioStockTableComponent;

    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private portfolioFactory: PortfolioFactory,
                 private portfolioPanelService: PortfolioPanelService,
                 private portfolioCrudService: PortfolioCrudService,
                 private deletePortfolioDialog: DeletePortfolioDialog )
    {
        super( toaster, portfolioFactory, portfolioPanelService, portfolioCrudService );
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
        this.logger.log( 'showPortfolio ' + JSON.stringify( portfolio ));
        this.selectedPortfolio = portfolio;
        this.portfolioStocksComponent.loadPortfolio( portfolio );
    }

    /**
     * This method is called when the user has completed adding a new portfolio
     */
    private hideAddPortfolioDialog(): void
    {
        this.newPortfolioName = "";
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
        this.portfolioCrudService.addPortfolio( this.session.getLoggedInUserId(), this.newPortfolioName )
                                 .subscribe( (portfolio)  =>
                                    {
                                        this.loadPortfolios();
                                    },
                                    err =>
                                    {
                                        this.reportRestError( err );
                                    });
    }

    /**
     * Load the portfolios for the customer
     */
    private loadPortfolios()
    {
        this.portfolioCrudService
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
                this.reportRestError( err );
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
