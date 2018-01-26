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
     * @param {CookieService} cookieService
     */
    constructor( protected toaster: ToastsManager,
                 protected session: SessionService,
                 protected portfolioStockStateStore: PortfolioStockStateStore,
                 protected portfolioStockController: PortfolioStockController,
                 protected portfolioStockFactory: PortfolioStockFactory,
                 protected portfolioStockCrudService: PortfolioStockCrudService,
                 protected cookieService: CookieService )
    {
        super( TableLoadingStrategy.ALL_ON_CREATE,
               toaster,
               portfolioStockStateStore,
               portfolioStockController,
               portfolioStockFactory,
               portfolioStockCrudService,
               cookieService );
    }

    private getAddButtonText(): string
    {
        return `Add Stock to ${this.portfolio.name} Portfolio`;
    }

    /**
     * Receive a notification when the content of the table changes which includes: updates, adds and deletes.
     * @param observer
     * @return {any}
     */
    public registerForPortfolioStockChanges( observer )
    {
        return this.portfolioStockController
                   .subscribeToTableContentChangeEvent( observer );
    }



    /**
     * Load the stocks of the portfolio
     * @param portfolio
     */
    public loadPortfolio( portfolio: Portfolio )
    {
        this.logger.log( 'loadPortfolio ' + JSON.stringify( portfolio ));
        this.title = portfolio.name + " Portfolio Stocks";
        this.portfolio = portfolio;
        this.portfolioStockCrudService
            .getPortfolioStocks( this.session.getLoggedInUserId(), portfolio.id )
            .subscribe( (stocks: PortfolioStock[]) =>
                        {
                            if ( stocks.length > 0 )
                            {
                                this.modelObjectRows = stocks;
                            }
                            else
                            {
                                this.modelObjectRows = [];
                            }
                        });
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
}
