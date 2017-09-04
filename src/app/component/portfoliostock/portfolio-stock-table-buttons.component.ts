import { Component, Input } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Portfolio } from "../../model/entity/portfolio";
import { PortfolioStockCrudServiceContainer } from "./portfolio-stock-crud-service-container";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";

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

    constructor( protected toaster: ToastsManager,
                 private portfolioStockCrudServiceContainer: PortfolioStockCrudServiceContainer )
    {
        super( toaster, portfolioStockCrudServiceContainer );
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

