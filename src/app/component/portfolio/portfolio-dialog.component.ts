import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Portfolio } from "../../model/entity/portfolio";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { PortfolioStateStore } from './portfolio-state-store';
import { PortfolioController } from './portfolio-controller';
import { PortfolioFactory } from '../../model/factory/portfolio.factory';
import { PortfolioCrudService } from '../../service/crud/portfolio-crud.service';

/**
 * Created by mike on 1/8/2017.
 */
@Component({
    selector: 'portfolio-dialog',
    templateUrl: './portfolio-dialog.component.html'
})
export class PortfolioDialogComponent extends CrudDialogComponent<Portfolio>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {PortfolioStateStore} portfolioStateStore
     * @param {PortfolioController} portfolioController
     * @param {PortfolioFactory} portfolioFactory
     * @param {PortfolioCrudService} portfolioCrudService
     */
    constructor( protected toaster: ToastsManager,
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
}
