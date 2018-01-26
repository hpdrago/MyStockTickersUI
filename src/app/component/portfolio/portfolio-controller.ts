/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { Portfolio } from '../../model/entity/portfolio';
import { Injectable } from '@angular/core';
import { PortfolioStateStore } from './portfolio-state-store';
import { PortfolioFactory } from '../../model/factory/portfolio.factory';
import { PortfolioActionHandler } from './portfolio-action-handler';

/**
 * This is the controller for Portfolio entity components.
 */
@Injectable()
export class PortfolioController extends CrudController<Portfolio>
{
    /**
     * Constructor.
     * @param {PortfolioStateStore} portfolioStateStore
     * @param {PortfolioFactory} portfolioFactory
     * @param {PortfolioActionHandler} portfolioActionHandler
     */
    constructor( portfolioStateStore: PortfolioStateStore,
                 portfolioFactory: PortfolioFactory,
                 portfolioActionHandler: PortfolioActionHandler )
    {
        super( portfolioStateStore,
               portfolioFactory,
               portfolioActionHandler );
    }
}
