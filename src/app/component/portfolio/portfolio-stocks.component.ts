/**
 * This component lists all of the stocks for a portfolio
 *
 * Created by mike on 10/30/2016.
 */
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PortfolioService } from "../../service/portfolio.service";
import { Portfolio } from "../../model/portfolio";
import { PortfolioStock } from "../../model/portfolio-stock";
import { ModelFactory } from "../../model/model-factory";
import { SessionService } from "../../service/session.service";
import { PortfolioStockService } from "../../service/portfolio-stock.service";
import { BaseComponent } from "../common/base.component";
import { CrudOperation } from "../../common/crud-operation";

@Component(
{
    selector: 'portfolio-stocks',
    templateUrl: 'portfolio-stocks.component.html',
    styleUrls: ['portfolio-stocks.component.css']
})
export class PortfolioStocksComponent extends BaseComponent
{
    private selectedPortfolioStock: PortfolioStock;
    private portfolio: Portfolio;
    private portfolioStocks: PortfolioStock[];
    private title: string = 'Portfolio Stocks';
    @Output()
    private crudOperation: CrudOperation;
    @Input()
    private displayStockForm: boolean;

    constructor( private portfolioStockService: PortfolioStockService,
                 private session: SessionService )
    {
        super();
        this.crudOperation = CrudOperation.NONE;
        this.portfolioStocks = [];
        this.selectedPortfolioStock = ModelFactory.newPortfolioStockInstance();
    }

    /**
     * This method is called when the user clicks on the add button
     */
    private showDialogToAdd()
    {
        this.crudOperation = CrudOperation.INSERT;
        this.displayStockForm = true;
    }

    /**
     * Determines if the Add button should be disabled.
     * It should be disabled when no portfolio is selected
     * @returns {boolean}
     */
    private isAddButtonDisabled(): boolean
    {
        return this.portfolio == null;
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
        this.portfolioStockService
            .getPortfolioStocks( portfolio.id )
            .subscribe( (stocks: PortfolioStock[]) =>
                        {
                            if ( stocks.length > 0 )
                            {
                                this.portfolioStocks = stocks;
                            }
                            else
                            {
                                this.portfolioStocks = [];
                            }
                        },
                        error => console.error( error )
            );
    }
}