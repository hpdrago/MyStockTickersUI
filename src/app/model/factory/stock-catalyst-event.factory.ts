import { SessionService } from "../../service/session.service";
import { Injectable } from "@angular/core";
import { StockCatalystEvent } from "../entity/stock-catalyst-event";
import { StockQuoteFactory } from './stock-quote.factory';
import { StockPriceQuoteFactory } from './stock-price-quote.factory';
import { StockModelObjectFactory } from './stock-model-object.factory';

@Injectable()
export class StockCatalystEventFactory extends StockModelObjectFactory<StockCatalystEvent>
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

    public newModelObject(): StockCatalystEvent
    {
        var catalystEvent: StockCatalystEvent = new StockCatalystEvent();
        catalystEvent.id = '';
        catalystEvent.customerId = this.session.getLoggedInUserId();
        catalystEvent.tickerSymbol = '';
        catalystEvent.catalystDate = null;
        catalystEvent.catalystDesc = '';
        return catalystEvent;
    }
}
