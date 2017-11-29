import { Component, OnInit, ViewChild } from "@angular/core";
import { SessionService } from "../../service/crud/session.service";
import { Portfolio } from "../../model/entity/portfolio";
import { MenuItem } from "primeng/primeng";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { PortfolioStockTableComponent } from "../portfoliostock/portfolio-stock-table.component";
import { PortfolioCrudServiceContainer } from "./porfolio-crud-service-container";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";

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
                 protected portfolioCrudServiceContainer: PortfolioCrudServiceContainer )
    {
        super( false, toaster, portfolioCrudServiceContainer );
    }

    /**
     * Load the portfolios when this component is created
     */
    public ngOnInit(): void
    {
        super.ngOnInit();
        this.loadTable();
        this.portfolioStocksComponent
            .registerForPortfolioStockChanges( () => this.loadPortfolio() );
    }

    private loadPortfolio()
    {
        this.debug( "loadPortfolio " );
        this.portfolioCrudServiceContainer
            .portfolioCrudService
            .getModelObject( this.modelObject )
            .subscribe( (portfolio) =>
                        {
                            this.debug( "loadPortfolio received" );
                            this.setModelObject( portfolio );
                            var index: number = this.indexOf( portfolio );
                            this.updateModelObjectTableRow( index, portfolio );
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        });
    }

    /**
     * This method is called when the user has clicked on a portfolio.
     * The stocks for the portfolio will be retrieved and displayed in
     * the stocks table
     * @param portfolio
     */
    protected onRowSelect( portfolio: Portfolio ): void
    {
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
        this.portfolioCrudServiceContainer
            .portfolioCrudService
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
        this.rows
            .forEach( portfolio =>
            {
                let menuItem = <MenuItem>{};
                menuItem.label = portfolio.name;
                menuItem.icon = 'fa-chart';
                menuItem.routerLink = ['/stocks'];
                //portfolioMenuItem.routerLink = 'fa-chart';
                this.menuItems.push( menuItem ) ;
            });
        /*            [
         { label: 'Dashboard', icon: 'fa-chart', routerLink: ['/dashboard'] },
         { label: 'Stock Table', icon: 'fa-chart', routerLink: ['/stocks'] }
         ]*/
    }
}
