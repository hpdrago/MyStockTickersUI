import { Component } from "@angular/core";
import { Portfolio } from "../../model/entity/portfolio";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { PortfolioStockCrudServiceContainer } from "./portfolio-stock-crud-service-container";
import { SessionService } from "../../service/session.service";
import { TableLoadingStrategy } from "../common/table-loading-strategy";

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
    private portfolio: Portfolio;
    private title: string = 'Portfolio Stocks';

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {PortfolioStockCrudServiceContainer} portfolioStockCrudServiceContainer
     */
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 protected portfolioStockCrudServiceContainer: PortfolioStockCrudServiceContainer )
    {
        super( TableLoadingStrategy.ALL_ON_CREATE, toaster, portfolioStockCrudServiceContainer );
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
        return this.portfolioStockCrudServiceContainer
                   .crudTableService
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
        this.portfolioStockCrudServiceContainer
            .portfolioStockCrudService
            .getPortfolioStocks( this.session.getLoggedInUserId(), portfolio.id )
            .subscribe( (stocks: PortfolioStock[]) =>
                        {
                            if ( stocks.length > 0 )
                            {
                                this.rows = stocks;
                            }
                            else
                            {
                                this.rows = [];
                            }
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        }
            );
    }
}
