import { Component, Input } from "@angular/core";
import { PortfolioStock } from "../../model/class/portfolio-stock";
import { PortfolioStockCrudService } from "../../service/portfolio-stock-crud.service";
import { ToastsManager } from "ng2-toastr";
import { CrudDialogComponent } from "../common/crud-dialog.component";
import { PortfolioStockDialogService } from "./portfolio-stock-dialog.service";
import { Portfolio } from "../../model/class/portfolio";

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
    inputs:      ['portfolio', 'crudDialogService', 'crudFormService', 'crudPanelButtonsService']
})
export class PortfolioStockDialogComponent extends CrudDialogComponent<PortfolioStock>
{
    @Input()
    private portfolio: Portfolio;

    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
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
