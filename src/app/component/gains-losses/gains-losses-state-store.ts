/**
 * Created by mike on 2/4/2018
 */

import { CrudStateStore } from '../crud/common/crud-state-store';
import { Injectable } from '@angular/core';
import { GainsLosses } from '../../model/entity/gains-losses';
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';

/**
 * Gains/Losses state store.
 * Created by Mike on 5/29/2018
 */
@Injectable()
export class GainsLossesStateStore extends CrudStateStore<GainsLosses>
{
    /**
     * Constructor.
     * @param {GainsLossesFactory} gainsLossesFactory
     */
    constructor( gainsLossesFactory: GainsLossesFactory )
    {
        super( gainsLossesFactory );
    }
}
