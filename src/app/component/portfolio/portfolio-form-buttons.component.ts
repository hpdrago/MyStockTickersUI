import { Component } from "@angular/core";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { Portfolio } from "../../model/entity/portfolio";
import { PortfolioFactory } from "../../model/factory/portfolio.factory";
import { PortfolioCrudService } from "../../service/portfolio-crud.service";
import { SessionService } from "../../service/session.service";
import { PortfolioFormService } from "./portfolio-form.service";
import { PortfolioFormButtonsService } from "./portfolio-form-buttons.service";
import { PortfolioDialogService } from "./portfolio-dialog.service";

/**
 * Button panel component for the Portfolio dialog.
 *
 * Created by mike on 12/31/2016.
 */
@Component({
    selector: 'portfolio-dialog-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html'
})
export class PortfolioFormButtonsComponent extends CrudFormButtonsComponent<Portfolio>
{
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 protected portfolioFactory: PortfolioFactory,
                 protected portfolioCrudService: PortfolioCrudService,
                 protected portfolioFormService: PortfolioFormService,
                 protected portfolioFormButtonsService: PortfolioFormButtonsService,
                 protected portfolioDialogService:  PortfolioDialogService )
    {
        super( toaster, portfolioFactory, portfolioCrudService, portfolioFormService, portfolioFormButtonsService,
               portfolioDialogService );
    }

    protected onAddButtonClick(): void
    {
        this.modelObject.customerId = this.session.getLoggedInUserId();
        super.onAddButtonClick();
    }

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage(): string
    {
        return 'Are you sure you want to delete ' + this.modelObject.name + '? ' +
               'All stock information contained within the portfolio, including any research, transactions, and historical information will be lost. ' +
               'Consider moving stocks to a different portfolio to preserve their information and then delete the portfolio.';
    }

    /**
     * @return {undefined}
     */
    public getDeleteKeyword(): string
    {
        return undefined;
    }
}
