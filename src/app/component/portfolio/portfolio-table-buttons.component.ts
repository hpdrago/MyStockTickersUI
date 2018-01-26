import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Portfolio } from "../../model/entity/portfolio";
import { PortfolioStateStore } from './portfolio-state-store';
import { PortfolioController } from './portfolio-controller';
import { PortfolioFactory } from '../../model/factory/portfolio.factory';
import { PortfolioCrudService } from '../../service/crud/portfolio-crud.service';

/**
 * Created by mike on 1/2/2017.
 */
@Component({
    selector:    'portfolio-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css', './portfolio-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class PortfolioTableButtonsComponent extends CrudTableButtonsComponent<Portfolio>
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
                 protected portfolioStateStore: PortfolioStateStore,
                 protected portfolioController: PortfolioController,
                 protected portfolioFactory: PortfolioFactory,
                 protected portfolioCrudService: PortfolioCrudService )

    {
        super( toaster,
               portfolioStateStore,
               portfolioController,
               portfolioFactory,
               portfolioCrudService );
    }
}
