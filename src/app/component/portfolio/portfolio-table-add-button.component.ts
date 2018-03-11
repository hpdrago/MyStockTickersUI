import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { Portfolio } from '../../model/entity/portfolio';
import { Component } from '@angular/core';
import { CrudOperation } from '../crud/common/crud-operation';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { PortfolioStateStore } from './portfolio-state-store';
import { PortfolioController } from './portfolio-controller';
import { PortfolioFactory } from '../../model/factory/portfolio.factory';
import { PortfolioCrudService } from '../../service/crud/portfolio-crud.service';

@Component
({
     selector: 'portfolio-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class PortfolioTableAddButtonComponent extends CrudTableAddButtonComponent<Portfolio>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {PortfolioStateStore} portfolioStateStore
     * @param {PortfolioController} portfolioController
     * @param {PortfolioFactory} portfolioFactory
     * @param {PortfolioCrudService} portfolioCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected session: SessionService,
                 protected toaster: ToastsManager,
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

    protected onButtonClick(): void
    {
        let modelObject = this.portfolioFactory.newModelObject();
        this.crudStateStore.sendCrudOperationChangedEvent( CrudOperation.CREATE );
        this.crudStateStore.sendModelObjectChangedEvent( this, modelObject );
        super.onButtonClick();
    }
}
