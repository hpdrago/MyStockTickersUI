import { StockNotesContainer } from "../common/stock-notes-container";
import { StockPriceQuoteModelObject } from "../common/stock-price-quote-model-object";
import { StockNotesSourceContainer } from '../common/stock-notes-source-container';
import { StockPriceQuoteContainer } from '../common/stock-price-quote-container';

/**
 * This entity contains the elements for the stock to buy
 *
 * Created 10/17/2017
 */
export class StockToBuy extends StockPriceQuoteModelObject<StockToBuy> implements StockNotesContainer,
                                                                                  StockNotesSourceContainer,
                                                                                  StockPriceQuoteContainer
{
    public id: string;
    public customerId: string;
    public comments: string;
    public buySharesUpToPrice: number;
    public notesSourceId: string;
    public notesSourceName: string;
    public stockPriceWhenCreated: number;
    public completed: boolean;
    public buyAfterDate: Date;
    public tags: string[];

    public getNotes(): string
    {
        return this.comments;
    }

    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

    public isEqualPrimaryKey( modelObject: StockToBuy ): boolean
    {
        return modelObject.id === this.id;
    }

    public getNotesSourceId(): string
    {
        return this.notesSourceId;
    }

    public setNotesSourceId( notesSourceId: string )
    {
        this.notesSourceId = notesSourceId;
    }

    public getNotesSourceName(): string
    {
        return this.notesSourceName;
    }

    public setNotesSourceName( notesSourceName: string )
    {
        this.notesSourceName = notesSourceName;
    }

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }

    public setCompanyName( companyName: string )
    {
        this.companyName = companyName;
    }

    public setLastPrice( lastPrice: number )
    {
        this.lastPrice = lastPrice;
    }

    public setTickerSymbol( tickerSymbol: string )
    {
        this.tickerSymbol = tickerSymbol;
    }
}
