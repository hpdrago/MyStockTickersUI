import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { Stock } from "../../model/entity/stock";
import { Component, Input } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Portfolio } from "../../model/entity/portfolio";
import { StockTableButtonsService } from "../stock/stock-table-buttons.service";

/**
 * Created by mike on 1/2/2017.
 */
@Component({
    selector: 'portfolio-stock-table-buttons',
    templateUrl: '../crud/table/crud-table-buttons.component.html',
    styleUrls: ['./portfolio-stock-table-buttons.component.css'],
    inputs: ['portfolio']
})
export class PortfolioStockTableButtonsComponent extends CrudTableButtonsComponent<Stock>
{
    @Input()
    private portfolio: Portfolio;

    constructor( protected toaster: ToastsManager,
                 protected stockTableButtonsService: StockTableButtonsService )
    {
        super( toaster, stockTableButtonsService );
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

    protected getAddButtonClass(): string
    {
        return "portfolio-stock-table-button";
    }

    protected getDeleteButtonClass(): string
    {
        return "portfolio-stock-table-button";
    }
}

