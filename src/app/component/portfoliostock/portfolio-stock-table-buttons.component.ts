import { Component, Input } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Portfolio } from "../../model/entity/portfolio";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { PortfolioStockCrudService } from '../../service/crud/portfolio-stock-crud.service';
import { PortfolioStockFactory } from '../../model/factory/portfolio-stock.factory';
import { PortfolioStockController } from './portfolio-stock-controller';
import { PortfolioStockStateStore } from './portfolio-stock-state-store';

/**
 * Created by mike on 1/2/2017.
 */
@Component({
    selector:    'portfolio-stock-table-buttons',
    templateUrl: '../crud/table/crud-table-buttons.component.html',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css']
})
export class PortfolioStockTableButtonsComponent extends CrudTableButtonsComponent<PortfolioStock>
{
    @Input()
    private portfolio: Portfolio;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {PortfolioStockStateStore} portfolioStockStateStore
     * @param {PortfolioStockController} portfolioStockController
     * @param {PortfolioStockFactory} portfolioStockFactory
     * @param {PortfolioStockCrudService} portfolioStockCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private portfolioStockStateStore: PortfolioStockStateStore,
                 private portfolioStockController: PortfolioStockController,
                 private portfolioStockFactory: PortfolioStockFactory,
                 private portfolioStockCrudService: PortfolioStockCrudService )
    {
        super( toaster,
               portfolioStockStateStore,
               portfolioStockController,
               portfolioStockFactory )
    }

    /**
     * The user must select a portfolio in order to add a stock to the portfolio
     * @return {boolean}
     */
    protected isAddButtonDisabled(): boolean
    {
        if ( !this.portfolio )
        {
            return true;
        }
        return super.isAddButtonDisabled();
    }

    protected getAddButtonLabel(): string
    {
        return "Add Stock"
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Stock"
    }

}

