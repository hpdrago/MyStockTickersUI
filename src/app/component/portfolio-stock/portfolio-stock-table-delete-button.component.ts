import { CrudTableDeleteButtonComponent } from '../crud/table/crud-table-delete-button.component';
import { PortfolioStock } from '../../model/entity/portfolio-stock';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Portfolio } from '../../model/entity/portfolio';
import { PortfolioStockCrudService } from '../../service/crud/portfolio-stock-crud.service';
import { PortfolioStockFactory } from '../../model/factory/portfolio-stock.factory';
import { PortfolioStockController } from './portfolio-stock-controller';
import { PortfolioStockStateStore } from './portfolio-stock-state-store';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';

@Component
({
     selector: 'portfolio-stock-table-delete-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class PortfolioStockTableDeleteButtonComponent extends CrudTableDeleteButtonComponent<PortfolioStock>
{
    @Input()
    private portfolio: Portfolio;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {PortfolioStockStateStore} portfolioStockStateStore
     * @param {PortfolioStockController} portfolioStockController
     * @param {PortfolioStockFactory} portfolioStockFactory
     * @param {PortfolioStockCrudService} portfolioStockCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private session: SessionService,
                 private portfolioStockStateStore: PortfolioStockStateStore,
                 private portfolioStockController: PortfolioStockController,
                 private portfolioStockFactory: PortfolioStockFactory,
                 private portfolioStockCrudService: PortfolioStockCrudService )
    {
        super( changeDetector,
               toaster,
               portfolioStockStateStore,
               portfolioStockController,
               portfolioStockFactory,
               portfolioStockCrudService );
    }

    public get buttonDisabled(): boolean
    {
        if ( !this.portfolio )
        {
            return true;
        }
        return this.buttonDisabled;
    }
}
