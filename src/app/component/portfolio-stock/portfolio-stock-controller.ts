/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { PortfolioStock } from '../../model/entity/portfolio-stock';
import { Injectable } from '@angular/core';
import { PortfolioStockStateStore } from './portfolio-stock-state-store';
import { PortfolioStockFactory } from '../../model/factory/portfolio-stock.factory';
import { PortfolioCrudActionHandler } from '../portfolio/portfolio-crud-action-handler.service';
import { PortfolioStockCrudActionHandler } from './portfolio-stock-crud-action-handler.service';

/**
 * This is the controller for Portfolio StockCompany entity components.
 */
@Injectable()
export class PortfolioStockController extends CrudController<PortfolioStock>
{
    /**
     * Constructor.
     * @param {PortfolioStockStateStore} portfolioStockStateStore
     * @param {PortfolioStockFactory} portfolioStockFactory
     * @param {PortfolioCrudActionHandler} portfolioStockActionHandler
     */
    constructor( portfolioStockStateStore: PortfolioStockStateStore,
                 portfolioStockFactory: PortfolioStockFactory,
                 portfolioStockActionHandler: PortfolioStockCrudActionHandler )
    {
        super( portfolioStockStateStore,
               portfolioStockFactory,
               portfolioStockActionHandler );
    }
}
