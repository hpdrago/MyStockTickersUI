import { ModelObjectFactory } from "./model-object.factory";
import { Injectable } from "@angular/core";
import { WatchList } from '../entity/watch-list';
import { SessionService } from '../../service/session.service';

/**
 * This class provides watch list factory methods.
 *
 * Created by mike on 09/23/2018.
 */
@Injectable()
export class WatchListFactory extends ModelObjectFactory<WatchList>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    constructor( protected session: SessionService )
    {
        super();
    }

    public newModelObject(): WatchList
    {
        let watchList = new WatchList();
        watchList.customerId = this.session.getLoggedInUserId();
        return watchList;
    }
}
