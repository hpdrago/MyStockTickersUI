import { Component, Input } from "@angular/core";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { ToastsManager } from "ng2-toastr";
import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { PortfolioStockDialogService } from "./portfolio-stock-dialog.service";
import { Portfolio } from "../../model/entity/portfolio";
import { PortfolioStockFormService } from "./portfolio-stock-form.service";
import { PortfolioStockFormButtonsService } from "./portfolio-stock-form-buttons.service";

/**
 * This class manages the modal dialog that contains the Portfolio Stock
 * editing fields
 *
 * Created by mike on 11/19/2016.
 */
@Component
({
    selector:    'portfolio-stock-dialog',
    templateUrl: './portfolio-stock-dialog.component.html',
    inputs:      ['portfolio']
})
export class PortfolioStockDialogComponent extends CrudDialogComponent<PortfolioStock>
{
    @Input()
    private portfolio: Portfolio;

    constructor( protected toaster: ToastsManager,
                 protected portfolioStockDialogService: PortfolioStockDialogService,
                 protected portfolioStockFormService: PortfolioStockFormService,
                 protected portfolioStockFormButtonsService: PortfolioStockFormButtonsService )
    {
        super( toaster, portfolioStockDialogService, portfolioStockFormService, portfolioStockFormButtonsService, false );
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     */
    protected getDuplicateKeyErrorMessage(): string
    {
        return this.modelObject.tickerSymbol + " already exists in portfolio";
    }

    protected isContinuousAdd(): boolean
    {
        return true;
    }
}
