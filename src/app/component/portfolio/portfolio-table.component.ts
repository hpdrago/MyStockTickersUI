import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
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
import { TradeItAccountController } from '../tradeit-account/tradeit-account-controller';
import { LinkedAccountController } from '../linked-account/linked-account-controller';
import { LazyLoadEvent } from 'primeng/api';
import { isNullOrUndefined } from 'util';

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
     * @param {TradeItAccountController} tradeItAccountController
     * @param {LinkedAccountController} linkedAccountController
     * @param {CookieService} cookieService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected session: SessionService,
                 protected portfolioStateStore: PortfolioStateStore,
                 protected portfolioController: PortfolioController,
                 protected portfolioFactory: PortfolioFactory,
                 protected portfolioCrudService: PortfolioCrudService,
                 protected tradeItAccountController: TradeItAccountController,
                 protected linkedAccountController: LinkedAccountController,
                 protected cookieService: CookieService )
    {
        super( changeDetector,
               TableLoadingStrategy.ALL_ON_CREATE,
               toaster,
               portfolioStateStore,
               portfolioController,
               portfolioFactory,
               portfolioCrudService,
               cookieService );
    }

    public ngAfterViewInit(): void
    {
        super.ngAfterViewInit();
        this.addSubscription( 'TradeItAccountSelectionChange',
                              this.tradeItAccountController
                                  .subscribeToTableSelectionChangeEvent( tradeItAccount =>
                                                                             this.onTradeItAccountTableSelectionChange( tradeItAccount )));
        this.addSubscription( 'LinkedAccountSelectionChange',
                              this.linkedAccountController
                                  .subscribeToTableSelectionChangeEvent( linkedAccount =>
                                                                             this.onLinkedAccountTableSelectionChange( linkedAccount )));
    }

    /**
     * This method is called when the user selects a row on the trade it table accounts.
     * @param {TradeItAccount} tradeItAccount
     */
    private onTradeItAccountTableSelectionChange( tradeItAccount: TradeItAccount )
    {
        const methodName = 'onTradeItAccountTableSelectionChange';
        this.log( methodName + " " + JSON.stringify( tradeItAccount ));
        this.tradeItAccount = tradeItAccount;
        this.linkedAccount = null;
        this.clearTable();
    }

    /**
     * This method is called when the user changes the linked selected linked account;
     * @param {LinkedAccount} linkedAccount
     */
    private onLinkedAccountTableSelectionChange( linkedAccount: LinkedAccount )
    {
        const methodName = 'setLinkedAccount';
        this.log( methodName + ".begin " + JSON.stringify( linkedAccount ) );
        this.linkedAccount = linkedAccount;
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
     * Load the portfolios for the customer
     */
    protected loadTable()
    {
        this.portfolioCrudService
            .getCustomerPortfolios( this.session.getLoggedInUserId() )
            .subscribe( portfolios =>
            {
                this.modelObjectRows = portfolios;
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
