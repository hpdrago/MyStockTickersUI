/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { Injectable } from '@angular/core';
import { StockPositionStateStore } from './stock-position-state-store';
import { StockPositionCrudActionHandler } from './stock-position-crud-action-handler';
import { StockPosition } from '../../model/entity/stock-position';
import { StockPositionFactory } from '../../model/factory/stock-position-factory';

/**
 * This is the Controller for StockPosition entity components.
 */
@Injectable()
export class StockPositionController extends CrudController<StockPosition>
{
    /**
     * Constructor
     * @param {StockPositionStateStore} stockPositionStateStore
     * @param {} stockPositionFactory
     * @param {StockPositionCrudActionHandler} stockPositionActionHandler
     */
    constructor( stockPositionStateStore: StockPositionStateStore,
                 stockPositionFactory: StockPositionFactory,
                 stockPositionActionHandler: StockPositionCrudActionHandler )
    {
        super( stockPositionStateStore,
               stockPositionFactory,
               stockPositionActionHandler );
    }
}
