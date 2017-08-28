import { PortfolioStock } from "../../model/class/portfolio-stock";
import { Component, Input } from "@angular/core";
import { CrudFormButtonsComponent } from "../common/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { PortfolioStockCrudService } from "../../service/portfolio-stock-crud.service";
import { Portfolio } from "../../model/class/portfolio";
import { PortfolioStockFactory } from "../../model/factory/portfolio-stock.factory";

/**
 * Created by mike on 12/31/2016.
 */
@Component({
    selector:    'portfolio-stock-form-buttons',
    templateUrl: '../common/crud-form-buttons.component.html',
    inputs:      ['portfolio', 'crudFormService', 'crudButtonsService', 'curdPanelButtonsService']
})
export class PortfolioStockFormButtonsComponent extends CrudFormButtonsComponent<PortfolioStock>
{
    @Input()
    private portfolio: Portfolio;

    constructor( protected toaster: ToastsManager,
                 protected portfolioStockFactory: PortfolioStockFactory,
                 protected portfolioStockCrudService: PortfolioStockCrudService )
    {
        super( toaster, portfolioStockFactory, portfolioStockCrudService );
    }

    /**
     * This method is called when the user clicks the Add button (it is labeled "Save")
     */
    protected onAddButtonClick(): void
    {
        this.modelObject.portfolioId = this.portfolio.id;
        super.onAddButtonClick();
    }

    /**
     * Display the Ticker Symbol to confirm delete
     * @return {string}
     */
    public getDeleteKey(): string
    {
        return this.modelObject.tickerSymbol;
    }
}
