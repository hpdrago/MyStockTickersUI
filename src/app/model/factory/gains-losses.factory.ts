import { ModelObjectFactory } from './model-object.factory';
import { GainsLosses } from '../entity/gains-losses';
import { Injectable } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { LinkedAccountFactory } from './linked-account.factory';
import { StockCompany } from '../entity/stock-company';

@Injectable()
export class GainsLossesFactory extends ModelObjectFactory<GainsLosses>
{
    /**
     * Constructor.
     * @param {SessionService} session
     */
    constructor( protected session: SessionService,
                 private linkedAccountFactory: LinkedAccountFactory )
    {
        super();
    }

    public newModelObject(): GainsLosses
    {
        let gainsLosses = new GainsLosses();
        gainsLosses.gains = 0;
        gainsLosses.id = '';
        gainsLosses.customerId = this.session.getLoggedInUserId();
        gainsLosses.linkedAccount = this.linkedAccountFactory.newModelObject();
        gainsLosses.stockCompany = new StockCompany();
        gainsLosses.losses = 0;
        gainsLosses.tickerSymbol = '';
        gainsLosses.totalGainsLosses = 0;
        return gainsLosses;
    }

}
