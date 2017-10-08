import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { Component, Input } from "@angular/core";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { Portfolio } from "../../model/entity/portfolio";
import { PortfolioStockCrudServiceContainer } from "./portfolio-stock-crud-service-container";

/**
 * Created by mike on 12/31/2016.
 */
@Component({
    selector:    'portfolio-stock-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls:   ['../crud/form/crud-form-buttons.component.css'],
    inputs:      ['portfolio']
})
export class PortfolioStockFormButtonsComponent extends CrudFormButtonsComponent<PortfolioStock>
{
    @Input()
    private portfolio: Portfolio;

    constructor( protected toaster: ToastsManager,
                 protected portfolioStockCrudServiceContainer: PortfolioStockCrudServiceContainer )
    {
        super( toaster, portfolioStockCrudServiceContainer );
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
    public getDeleteKeyword(): string
    {
        return this.modelObject.tickerSymbol;
    }
}
