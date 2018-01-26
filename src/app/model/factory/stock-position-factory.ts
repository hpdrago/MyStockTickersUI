import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { StockPosition } from '../entity/stock-position';
import { StockQuoteFactory } from './stock-quote.factory';
import { StockPriceQuoteFactory } from './stock-price-quote.factory';
import { StockModelObjectFactory } from './stock-model-object.factory';

/**
 * This class provides StockPosition factory methods.
 *
 * Created by mike on 12/4/2017.
 */
@Injectable()
export class StockPositionFactory extends StockModelObjectFactory<StockPosition>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     * @param {StockQuoteFactory} stockQuoteFactory
     */
    constructor( protected session: SessionService,
                 protected stockPriceQuoteFactory: StockPriceQuoteFactory,
                 protected stockQuoteFactory: StockQuoteFactory )
    {
        super( session, stockQuoteFactory, stockPriceQuoteFactory );
    }

    /**
     * Create a new StockPosition instance
     * @returns {StockPosition}
     */
    public newModelObject(): StockPosition
    {
        var position = new StockPosition();
        position.customerId = this.session.getLoggedInUserId();
        position.id = '';
        position.tradeItAccountId = '';
        position.linkedAccountId = '';
        position.tickerSymbol = "";
        position.symbolClass = "";
        position.costBasis = 0;
        position.holdingType = "";
        position.quantity = 0;
        position.todayGainLossAbsolute = 0;
        position.todayGainLossPercentage = 0;
        position.totalGainLossAbsolute = 0;
        position.totalGainLossPercentage = 0;
        position.exchange = "";
        position.version = 0;
        return position;
    }

}
