/**
 * Created by mike on 2/4/2018
 */
import { CrudStateStore } from '../crud/common/crud-state-store';
import { Portfolio } from '../../model/entity/portfolio';
import { Injectable } from '@angular/core';
import { PortfolioFactory } from '../../model/factory/portfolio.factory';

/**
 * The state store for Portfolio components.
 */
@Injectable()
export class PortfolioStateStore extends CrudStateStore<Portfolio>
{
    /**
     * Constructor
     * @param {PortfolioFactory} portfolioFactory
     */
    constructor( portfolioFactory: PortfolioFactory )
    {
        super( portfolioFactory );
    }
}
