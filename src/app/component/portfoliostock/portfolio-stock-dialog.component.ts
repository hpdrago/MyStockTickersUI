import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { PortfolioStock } from "../../model/portfolio-stock";
import { Portfolio } from "../../model/portfolio";
import { CrudPanelComponent } from "../common/crud-panel.component";
import { PortfolioStockFactory } from "../../model/portfolio-stock-factory";
import { PortfolioStockFormService } from "./portfolio-stock-form.service";
import { PortfolioStockCrudService } from "../../service/portfolio-stock-crud.service";
import { ToastsManager } from "ng2-toastr";

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
    inputs:      ['crudPanelService']
})
export class PortfolioStockDialogComponent extends CrudPanelComponent<PortfolioStock>
{
    @Input()
    displayDialog: boolean;
    @Input()
    portfolio: Portfolio;

    constructor( protected toaster: ToastsManager,
                 protected crudFormService: PortfolioStockFormService,
                 protected portfolioStockCrudService: PortfolioStockCrudService,
                 protected portfolioStockFactory: PortfolioStockFactory )
    {
        super( toaster, crudFormService, portfolioStockCrudService, portfolioStockFactory );
    }


    protected onCloseButtonClick(): void
    {
        this.displayDialog = false;
        return super.onCloseButtonClick();
    }

    protected onDeleteButtonClick()
    {
        this.logger.log( "onDeleteButtonClick" );
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     */
    protected getDuplicateKeyErrorMessage(): string
    {
        return this.modelObject.tickerSymbol + " already exists in " + this.portfolio.name + " portfolio";
    }

}