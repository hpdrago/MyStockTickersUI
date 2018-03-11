/**
 * Created by mike on 3/10/2018
 */
import { PortfolioStock } from '../../model/entity/portfolio-stock';
import { Component } from '@angular/core';
import { PortfolioStockCrudService } from '../../service/crud/portfolio-stock-crud.service';
import { PortfolioStockFactory } from '../../model/factory/portfolio-stock.factory';
import { PortfolioStockController } from './portfolio-stock-controller';
import { PortfolioStockStateStore } from './portfolio-stock-state-store';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';

@Component
({
     selector: 'portfolio-stock-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class PortfolioStockTableAddButtonComponent extends CrudTableAddButtonComponent<PortfolioStock>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {PortfolioStockStateStore} portfolioStockStateStore
     * @param {PortfolioStockController} portfolioStockController
     * @param {PortfolioStockFactory} portfolioStockFactory
     * @param {PortfolioStockCrudService} portfolioStockCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private portfolioStockStateStore: PortfolioStockStateStore,
                 private portfolioStockController: PortfolioStockController,
                 private portfolioStockFactory: PortfolioStockFactory,
                 private portfolioStockCrudService: PortfolioStockCrudService )
    {
        super( toaster,
               portfolioStockStateStore,
               portfolioStockController,
               portfolioStockFactory,
               portfolioStockCrudService );
    }
}
