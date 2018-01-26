import { ModelObjectFactory } from './model-object.factory';
import { ModelObject } from '../common/model-object';
import { StockPriceQuoteFactory } from './stock-price-quote.factory';
import { StockQuoteFactory } from './stock-quote.factory';
import { SessionService } from '../../service/session.service';
import { StockQuoteContainer } from '../common/stock-quote-container';
import { StockPriceQuoteContainer } from '../common/stock-price-quote-container';

/**
 * This is the base factor for factories that create model objects that contain stock price and quote information.
 */
export abstract class StockModelObjectFactory<T extends ModelObject<T> & StockQuoteContainer & StockPriceQuoteContainer>
    extends ModelObjectFactory<T>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockQuoteFactory} stockQuoteFactory
     * @param {StockPriceQuoteFactory} stockPriceQuoteFactory
     */
    protected constructor( protected session: SessionService,
                           protected stockQuoteFactory: StockQuoteFactory,
                           protected stockPriceQuoteFactory: StockPriceQuoteFactory )
    {
        super();
    }

}
