/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { PortfolioStock } from '../../model/entity/portfolio-stock';
import { Injectable } from '@angular/core';
import { PortfolioStockStateStore } from './portfolio-stock-state-store';
import { PortfolioStockFactory } from '../../model/factory/portfolio-stock.factory';
import { PortfolioActionHandler } from '../portfolio/portfolio-action-handler';
import { PortfolioStockActionHandler } from './portfolio-stock-action-handler';

/**
 * This is the controller for Portfolio Stock entity components.
 */
@Injectable()
export class PortfolioStockController extends CrudController<PortfolioStock>
{
    /**
     * Constructor.
     * @param {PortfolioStockStateStore} portfolioStockStateStore
     * @param {PortfolioStockFactory} portfolioStockFactory
     * @param {PortfolioActionHandler} portfolioStockActionHandler
     */
    constructor( portfolioStockStateStore: PortfolioStockStateStore,
                 portfolioStockFactory: PortfolioStockFactory,
                 portfolioStockActionHandler: PortfolioStockActionHandler )
    {
        super( portfolioStockStateStore,
               portfolioStockFactory,
               portfolioStockActionHandler );
    }
}
