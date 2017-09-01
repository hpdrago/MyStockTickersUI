import { Component } from "@angular/core";
import { Portfolio } from "../../model/entity/portfolio";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { SessionService } from "../../service/session.service";
import { PortfolioStockFactory } from "../../model/factory/portfolio-stock.factory";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { PortfolioStockCrudService } from "../../service/portfolio-stock-crud.service";
import { ToastsManager } from "ng2-toastr";
import { PortfolioStockDialogService } from "./portfolio-stock-dialog.service";
import { PortfolioStockTableButtonsService } from "./portfolio-stock-table-buttons.service";
import { PortfolioStockFormService } from "./portfolio-stock-form.service";
import { PortfolioStockFormButtonsService } from "./portfolio-stock-form-buttons.service";

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

    constructor( protected toaster: ToastsManager,
                 protected portfolioStockFactory: PortfolioStockFactory,
                 protected portfolioStockCrudService: PortfolioStockCrudService,
                 protected portfolioStockFormService: PortfolioStockFormService,
                 protected portfolioStockPanelButtonsService: PortfolioStockFormButtonsService,
                 protected portfolioStockDialogService: PortfolioStockDialogService,
                 protected portfolioStockTableButtonsService: PortfolioStockTableButtonsService,
                 protected session: SessionService )
    {
        super( toaster,
               portfolioStockFactory,
               portfolioStockCrudService,
               portfolioStockFormService,
               portfolioStockPanelButtonsService,
               portfolioStockDialogService,
               portfolioStockTableButtonsService );
    }

    private getAddButtonText(): string
    {
        return `Add Stock to ${this.portfolio.name} Portfolio`;
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
