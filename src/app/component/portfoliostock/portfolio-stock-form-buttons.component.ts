import { PortfolioStock } from "../../model/class/portfolio-stock";
import { Component, Input } from "@angular/core";
import { CrudFormButtonsComponent } from "../crud/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { PortfolioStockCrudService } from "../../service/portfolio-stock-crud.service";
import { Portfolio } from "../../model/class/portfolio";
import { PortfolioStockFactory } from "../../model/factory/portfolio-stock.factory";
import { PortfolioStockFormService } from "./portfolio-stock-form.service";
import { PortfolioStockDialogService } from "./portfolio-stock-dialog.service";
import { PortfolioStockFormButtonsService } from "./portfolio-stock-form-buttons.service";

/**
 * Created by mike on 12/31/2016.
 */
@Component({
    selector:    'portfolio-stock-form-buttons',
    templateUrl: '../crud/crud-form-buttons.component.html',
    inputs:      ['portfolio']
})
export class PortfolioStockFormButtonsComponent extends CrudFormButtonsComponent<PortfolioStock>
{
    @Input()
    private portfolio: Portfolio;

    constructor( protected toaster: ToastsManager,
                 protected portfolioStockFactory: PortfolioStockFactory,
                 protected portfolioStockCrudService: PortfolioStockCrudService,
                 protected portfolioStockFormService: PortfolioStockFormService,
                 protected portfolioStockFormButtonsService: PortfolioStockFormButtonsService,
                 protected portfolioStockDialService: PortfolioStockDialogService )
    {
        super( toaster, portfolioStockFactory, portfolioStockCrudService, portfolioStockFormService,
               portfolioStockFormButtonsService, portfolioStockDialService );
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
