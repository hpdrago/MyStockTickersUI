import { Component } from "@angular/core";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { Portfolio } from "../../model/entity/portfolio";
import { SessionService } from "../../service/session.service";
import { PortfolioCrudService } from '../../service/crud/portfolio-crud.service';
import { PortfolioFactory } from '../../model/factory/portfolio.factory';
import { PortfolioController } from './portfolio-controller';
import { PortfolioStateStore } from './portfolio-state-store';

/**
 * Button panel component for the Portfolio dialog.
 *
 * Created by mike on 12/31/2016.
 */
@Component({
    selector:    'portfolio-form-buttons',
    styleUrls: ['../crud/form/crud-form-buttons.component.css'],
    templateUrl: '../crud/form/crud-form-buttons.component.html'
})
export class PortfolioFormButtonsComponent extends CrudFormButtonsComponent<Portfolio>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {PortfolioStateStore} portfolioStateStore
     * @param {PortfolioController} portfolioController
     * @param {PortfolioFactory} portfolioFactory
     * @param {PortfolioCrudService} portfolioCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private portfolioStateStore: PortfolioStateStore,
                 private portfolioController: PortfolioController,
                 private portfolioFactory: PortfolioFactory,
                 private portfolioCrudService: PortfolioCrudService )
    {
        super( toaster,
               portfolioStateStore,
               portfolioController,
               portfolioFactory,
               portfolioCrudService );
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
