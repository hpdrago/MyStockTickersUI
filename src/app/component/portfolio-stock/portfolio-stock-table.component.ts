import { Component } from "@angular/core";
import { Portfolio } from "../../model/entity/portfolio";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { SessionService } from "../../service/session.service";
import { TableLoadingStrategy } from "../common/table-loading-strategy";
import { PortfolioStockFactory } from '../../model/factory/portfolio-stock.factory';
import { PortfolioStockController } from './portfolio-stock-controller';
import { PortfolioStockStateStore } from './portfolio-stock-state-store';
import { PortfolioStockCrudService } from '../../service/crud/portfolio-stock-crud.service';
import { CookieService } from 'ngx-cookie-service';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { LinkedAccount } from '../../model/entity/linked-account';
import { PortfolioController } from '../portfolio/portfolio-controller';
import { LinkedAccountController } from '../linked-account/linked-account-controller';
import { TradeItAccountController } from '../tradeit-account/tradeit-account-controller';
import { isNullOrUndefined } from 'util';

/**
 * This component lists all of the stocks for a portfolio
 *
 * Created by mike on 10/30/2016.
 */
@Component(
{
    selector:    'portfolio-stock-table',
    templateUrl: './portfolio-stock-table.component.html'
})
export class PortfolioStockTableComponent extends CrudTableComponent<PortfolioStock>
{
    private title: string = 'Portfolio Stocks';
    private portfolio: Portfolio;
    private tradeItAccount: TradeItAccount;
    private linkedAccount: LinkedAccount;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {PortfolioStockStateStore} portfolioStockStateStore
     * @param {PortfolioStockController} portfolioStockController
     * @param {PortfolioStockFactory} portfolioStockFactory
     * @param {PortfolioStockCrudService} portfolioStockCrudService
     * @param {PortfolioController} portfolioController
     * @param {LinkedAccountController} linkedAccountController
     * @param {TradeItAccountController} tradeItAccountController
     * @param {CookieService} cookieService
     */
    constructor( protected toaster: ToastsManager,
                 protected session: SessionService,
                 protected portfolioStockStateStore: PortfolioStockStateStore,
                 protected portfolioStockController: PortfolioStockController,
                 protected portfolioStockFactory: PortfolioStockFactory,
                 protected portfolioStockCrudService: PortfolioStockCrudService,
                 protected portfolioController: PortfolioController,
                 protected linkedAccountController: LinkedAccountController,
                 protected tradeItAccountController: TradeItAccountController,
                 protected cookieService: CookieService )
    {
        super( TableLoadingStrategy.ALL_ON_DEMAND,
               toaster,
               portfolioStockStateStore,
               portfolioStockController,
               portfolioStockFactory,
               portfolioStockCrudService,
               cookieService );
    }

    public ngOnInit()
    {
        super.ngOnInit();
        this.portfolioController
            .subscribeToTableSelectionChangeEvent( portfolio => this.onPortfolioChange( portfolio ));
        this.linkedAccountController
            .subscribeToTableSelectionChangeEvent( linkedAccount => this.onLinkedAccountChange( linkedAccount ));
        this.tradeItAccountController
            .subscribeToTableSelectionChangeEvent( tradeItAccount => this.onTradeItAccountChange( tradeItAccount ));
    }

    /**
     * Load the stocks of the portfolio
     * @param portfolio
     */
    /**
     * This method is called from {@code ngOnInit} and can be overridden by subclasses to load the table with the
     * model objects.
     */
    protected loadTable(): void
    {
        this.modelObject
            .portfolioId = this.portfolio.id;
        super.loadTable();
    }

    /**
     * This method is called when the user changes the selection on the tradeit account able.
     * @param {TradeItAccount} tradeItAccount
     */
    public onTradeItAccountChange( tradeItAccount: TradeItAccount )
    {
        const methodName = 'onTradeItAccountChange';
        this.log( methodName + " " + JSON.stringify( tradeItAccount ));
        this.tradeItAccount = tradeItAccount;
        this.linkedAccount = null;
        this.clearTable();
    }

    /**
     * This method is called when the user changes the selection on the linked account table.
     * @param {LinkedAccount} linkedAccount
     */
    public onLinkedAccountChange( linkedAccount: LinkedAccount )
    {
        const methodName = 'onLinkedAccountChange';
        this.log( methodName + ".begin " + JSON.stringify( linkedAccount ) );
        this.linkedAccount = linkedAccount;
    }

    /**
     * This method is called when the user changes the selection on the portfolio table.
     * @param {Portfolio} portfolio
     */
    public onPortfolioChange( portfolio: Portfolio )
    {
        const methodName = 'onPortfolioChange';
        this.log( methodName + ".begin " + JSON.stringify( portfolio ) );
        this.title = portfolio.name + " Portfolio Stocks";
        this.portfolio = portfolio;
        if ( !isNullOrUndefined( portfolio ))
        {
            this.loadTable();
        }
        else
        {
            this.clearTable();
        }
    }
}
