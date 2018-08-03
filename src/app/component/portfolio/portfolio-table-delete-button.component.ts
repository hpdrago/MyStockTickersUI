import { CrudTableDeleteButtonComponent } from '../crud/table/crud-table-delete-button.component';
import { Portfolio } from '../../model/entity/portfolio';
import { ChangeDetectorRef, Component } from '@angular/core';
import { PortfolioCrudService } from '../../service/crud/portfolio-crud.service';
import { PortfolioFactory } from '../../model/factory/portfolio.factory';
import { PortfolioController } from './portfolio-controller';
import { PortfolioStateStore } from './portfolio-state-store';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';

@Component
({
     selector: 'portfolio-table-delete-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class PortfolioTableDeleteButtonComponent extends CrudTableDeleteButtonComponent<Portfolio>
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
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private session: SessionService,
                 private portfolioStateStore: PortfolioStateStore,
                 private portfolioController: PortfolioController,
                 private portfolioFactory: PortfolioFactory,
                 private portfolioCrudService: PortfolioCrudService )
    {
        super( changeDetector,
               toaster,
               portfolioStateStore,
               portfolioController,
               portfolioFactory,
               portfolioCrudService );
    }
}
