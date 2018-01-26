import { Component, OnInit, ViewChild } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { Portfolio } from "../../model/entity/portfolio";
import { MenuItem } from "primeng/primeng";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { PortfolioStockTableComponent } from "../portfolio-stock/portfolio-stock-table.component";
import { TableLoadingStrategy } from "../common/table-loading-strategy";
import { PortfolioCrudService } from '../../service/crud/portfolio-crud.service';
import { PortfolioFactory } from '../../model/factory/portfolio.factory';
import { PortfolioController } from './portfolio-controller';
import { PortfolioStateStore } from './portfolio-state-store';
import { CookieService } from 'ngx-cookie-service';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { LinkedAccount } from '../../model/entity/linked-account';

/**
 * This class contains the UI for listing the user's portfolios.
 *
 * Created by mike on 10/23/2016.
 */
@Component(
{
    selector: 'portfolio-table',
    templateUrl: './portfolio-table.component.html',
})
export class PortfolioTableComponent extends CrudTableComponent<Portfolio> implements OnInit
{
    @ViewChild(PortfolioStockTableComponent)
    private portfolioStocksComponent: PortfolioStockTableComponent;

    private menuItems: MenuItem[] = [];
    private tradeItAccount: TradeItAccount;
    private linkedAccount: LinkedAccount;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {PortfolioStateStore} portfolioStateStore
     * @param {PortfolioController} portfolioController
     * @param {PortfolioFactory} portfolioFactory
     * @param {PortfolioCrudService} portfolioCrudService
     * @param {CookieService} cookieService
     */
    constructor( protected toaster: ToastsManager,
                 protected session: SessionService,
                 protected portfolioStateStore: PortfolioStateStore,
                 protected portfolioController: PortfolioController,
                 protected portfolioFactory: PortfolioFactory,
                 protected portfolioCrudService: PortfolioCrudService,
                 protected cookieService: CookieService )
    {
        super( TableLoadingStrategy.ALL_ON_CREATE,
               toaster,
               portfolioStateStore,
               portfolioController,
               portfolioFactory,
               portfolioCrudService,
               cookieService );
    }

    /**
     * This method is called when the user selects a row on the trade it table accounts.
     * @param {TradeItAccount} tradeItAccount
     */
    public setTradeItAccount( tradeItAccount: TradeItAccount )
    {
        const methodName = 'setTradeItAccount';
        this.log( methodName + " " + JSON.stringify( tradeItAccount ));
        this.tradeItAccount = tradeItAccount;
        this.linkedAccount = null;
        this.clearTable();
    }

    /**
     * This method is called when the user changes the linked selected linked account;
     * @param {LinkedAccount} linkedAccount
     */
    public setLinkedAccount( linkedAccount: LinkedAccount )
    {
        const methodName = 'setLinkedAccount';
        this.log( methodName + ".begin " + JSON.stringify( linkedAccount ) );
        this.linkedAccount = linkedAccount;
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
        this.portfolioCrudService
            .getModelObject( this.modelObject )
            .subscribe( (portfolio) =>
                        {
                            this.debug( "loadPortfolio received" );
                            this.onModelObjectChanged( portfolio );
                            var index: number = this.indexOf( portfolio );
                            this.updateModelObjectTableRow( index, portfolio );
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
        this.logger.log( 'onRowSelect ' + JSON.stringify( this.modelObject ));
        super.onRowSelect( portfolio );
        this.portfolioStocksComponent.loadPortfolio( this.modelObject );
    }

    protected isSelectedPortfolio( portfolio: Portfolio )
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
                this.modelObjectRows = portfolios;
                this.logger.log( "loadTable: " + JSON.stringify( this.modelObjectRows ));
                this.logger.log( "loadTable length: " + this.modelObjectRows.length );
                this.logger.log( "loadTable[0]: " + JSON.stringify( this.modelObjectRows[0] ));
                this.logger.log( "loadTable[0]: " + this.modelObjectRows );
                this.initializeMenuBar();
            });
    }

    private initializeMenuBar()
    {
        this.modelObjectRows
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
