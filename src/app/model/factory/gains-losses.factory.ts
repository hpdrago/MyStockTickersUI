import { ModelObjectFactory } from './model-object.factory';
import { GainsLosses } from '../entity/gains-losses';
import { Injectable } from '@angular/core';
import { SessionService } from '../../service/session.service';

@Injectable()
export class GainsLossesFactory extends ModelObjectFactory<GainsLosses>
{
    /**
     * Constructor.
     * @param {SessionService} session
     */
    constructor( protected session: SessionService )
    {
        super();
    }

    public newModelObject(): GainsLosses
    {
        let gainsLosses = new GainsLosses();
        gainsLosses.gains = 0;
        gainsLosses.id = '';
        gainsLosses.customerId = this.session.getLoggedInUserId();
        gainsLosses.linkedAccountId = '';
        gainsLosses.losses = 0;
        gainsLosses.tickerSymbol = '';
        gainsLosses.totalGainsLosses = 0;
        return gainsLosses;
    }

}
