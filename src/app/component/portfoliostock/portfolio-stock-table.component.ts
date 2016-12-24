/**
 * This component lists all of the stocks for a portfolio
 *
 * Created by mike on 10/30/2016.
 */
import { Component } from "@angular/core";
import { Portfolio } from "../../model/portfolio";
import { PortfolioStock } from "../../model/portfolio-stock";
import { SessionService } from "../../service/session.service";
import { CrudOperation } from "../common/crud-operation";
import { PortfolioStockFactory } from "../../model/portfolio-stock-factory";
import { CrudTableComponent } from "../common/crud-table.component";
import { PortfolioStockCrudService } from "../../service/portfolio-stock-crud.service";
import { PortfolioStockPanelService } from "./portfolio-stock-panel.service";
import { ToastsManager } from "ng2-toastr";

@Component(
{
    selector:    'portfolio-stock-table',
    templateUrl: './portfolio-stock-table.component.html',
    styleUrls:   ['./portfolio-stock-table.component.css'],
    outputs:     ['messages']
})
export class PortfolioStockTableComponent extends CrudTableComponent<PortfolioStock>
{
    private displayDialog: boolean = false;
    private portfolio: Portfolio;
    private portfolioStocks: PortfolioStock[];
    private title: string = 'Portfolio Stocks';

    constructor( protected toaster: ToastsManager,
                 protected portfolioStockPanelService: PortfolioStockPanelService,
                 protected portfolioStockFactory: PortfolioStockFactory,
                 protected portfolioStockCrudService: PortfolioStockCrudService,
                 protected session: SessionService )
    {
        super( toaster, portfolioStockFactory, portfolioStockPanelService, portfolioStockCrudService );
        this.portfolioStocks = [];
    }

    private getAddButtonText(): string
    {
        return `Add Stock to ${this.portfolio.name} Portfolio`;
    }
    /**
     * This method is called when the user clicks on the add button
     */
    private showDialogToAdd()
    {
        this.crudOperation = CrudOperation.INSERT;
        this.displayDialog = true;
    }

    /**
     * This method is called when the Close button is clicked.
     * It will close the dialog and emit a {@code closeButtonClick} event
     */
    protected onCloseButtonClick()
    {
        this.displayDialog = false;
    }

    /**
     * Determines if the Add button should be disabled.
     * It should be disabled when no portfolio is selected
     * @returns {boolean}
     */
    protected isAddButtonDisabled(): boolean
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
        this.portfolioStockCrudService
            .getPortfolioStocks( this.session.getLoggedInUserId(), portfolio.id )
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
                        error =>
                        {
                            this.reportRestError( error );
                        }
            );
    }
}