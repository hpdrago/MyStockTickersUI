import { Component, OnInit, ViewChild } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { Portfolio } from "../../model/class/portfolio";
import { MenuItem } from "primeng/primeng";
import { PortfolioCrudService } from "../../service/portfolio-crud.service";
import { CrudTableComponent } from "../common/crud-table.component";
import { PortfolioFactory } from "../../model/factory/portfolio.factory";
import { ToastsManager } from "ng2-toastr";
import { PortfolioPanelButtonsService } from "./portfolio-panel-buttons.service";
import { PortfolioDialogService } from "./portfolio-dialog.service";
import { PortfolioTableButtonsService } from "./portfolio-table-buttons.service";
import { PortfolioFormService } from "./portfolio-form.service";
import { PortfolioStockTableComponent } from "../portfoliostock/portfolio-stock-table.component";

/**
 * This class contains the UI for listing the user's portfolios.
 *
 * Created by mike on 10/23/2016.
 */
@Component(
{
    selector: 'portfolios',
    templateUrl: './portfolio-table.component.html',
    styleUrls: ['./portfolio-table.component.css']
})
export class PortfolioTableComponent extends CrudTableComponent<Portfolio> implements OnInit
{
    private menuItems: MenuItem[] = [];

    @ViewChild(PortfolioStockTableComponent)
    private portfolioStocksComponent: PortfolioStockTableComponent;

    constructor( protected toaster: ToastsManager,
                 protected session: SessionService,
                 protected portfolioFactory: PortfolioFactory,
                 protected portfolioCrudService: PortfolioCrudService,
                 protected portfolioFormService: PortfolioFormService,
                 protected portfolioPanelButtonService: PortfolioPanelButtonsService,
                 protected portfolioDialogService: PortfolioDialogService,
                 protected portfolioTableButtonsService: PortfolioTableButtonsService )
    {
        super( toaster, portfolioFactory, portfolioCrudService, portfolioPanelButtonService,
               portfolioDialogService, portfolioTableButtonsService );
    }

    /**
     * Load the portfolios when this component is created
     */
    public ngOnInit(): void
    {
        super.ngOnInit();
        this.loadTable();
    }

    /**
     * This method is called when the user has clicked on a portfolio.
     * The stocks for the portfolio will be retrieved and displayed in
     * the stocks table
     * @param portfolio
     */
    protected onRowSelect( portfolio: Portfolio ): void
    {
        this.selectedModelObject = portfolio;
        this.setModelObject( portfolio );
        this.logger.log( 'onRowSelect ' + JSON.stringify( this.modelObject ));
        this.portfolioStocksComponent.loadPortfolio( this.modelObject );
    }

    private isSelectedPortfolio( portfolio: Portfolio )
    {
        return this.modelObject != null && this.modelObject.id === portfolio.id;
    }

    /**
     * Load the portfolios for the customer
     */
    protected loadTable()
    {
        this.portfolioCrudService
            .getCustomerPortfolios( this.session.getLoggedInUserId() )
            .subscribe( portfolios =>
            {
                this.rows = portfolios;
                this.logger.log( "loadTable: " + JSON.stringify( this.rows ));
                this.logger.log( "loadTable length: " + this.rows.length );
                this.logger.log( "loadTable[0]: " + JSON.stringify( this.rows[0] ));
                this.logger.log( "loadTable[0]: " + this.rows );
                this.initializeMenuBar();
            }, //Bind to view
            err =>
            {
                this.reportRestError( err );
            });
    }

    private initializeMenuBar()
    {
        for ( let portfolio of this.rows )
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
