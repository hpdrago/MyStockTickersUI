import { Component, Input } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { PortfolioStockCrudServiceContainer } from "./portfolio-stock-crud-service-container";
import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { Portfolio } from "../../model/entity/portfolio";

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
                 private portfolioStockCrudServiceContainer: PortfolioStockCrudServiceContainer )
    {
        super( toaster, portfolioStockCrudServiceContainer );
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     */
    public getDuplicateKeyErrorMessage(): string
    {
        return this.modelObject.tickerSymbol + " already exists in portfolio";
    }

    protected isContinuousAdd(): boolean
    {
        return true;
    }
}
