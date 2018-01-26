/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { PortfolioStock } from '../../model/entity/portfolio-stock';
import { Injectable } from '@angular/core';
import { PortfolioStockFactory } from '../../model/factory/portfolio-stock.factory';

/**
 * State store for Portfolio components.
 */
@Injectable()
export class PortfolioStockStateStore extends CrudStateStore<PortfolioStock>
{

    /**
     * Constructor.
     * @param {PortfolioStockFactory} portfolioStockFactory
     */
    constructor( portfolioStockFactory: PortfolioStockFactory )
    {
        super( portfolioStockFactory );
    }
}
