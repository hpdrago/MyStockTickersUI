import { PortfolioStock } from "../../model/class/portfolio-stock";
import { Component, Input } from "@angular/core";
import { CrudPanelButtonsComponent } from "../common/crud-panel-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { PortfolioStockCrudService } from "../../service/portfolio-stock-crud.service";
import { Portfolio } from "../../model/class/portfolio";
import { PortfolioStockFactory } from "../../model/factory/portfolio-stock.factory";

/**
 * Created by mike on 12/31/2016.
 */
@Component({
    selector: 'portfolio-stock-panel-buttons',
    templateUrl: '../common/crud-panel-buttons.component.html',
    inputs: ['portfolio', 'crudFormService', 'crudPanelButtonsService', 'curdPanelButtonsService']
})
export class PortfolioStockPanelButtonsComponent extends CrudPanelButtonsComponent<PortfolioStock>
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
