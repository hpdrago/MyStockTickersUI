import { StockNotesContainer } from "../../common/stock-notes-container";
import { StockPriceQuoteModelObject } from "./stock-price-quote-model-object";

/**
 * This entity contains the elements for the stock to buy
 *
 * Created 10/17/2017
 */
export class StockToBuy extends StockPriceQuoteModelObject<StockToBuy> implements StockNotesContainer
{
    public id: number;
    public customerId: number;
    public comments: string;
    public buySharesUpToPrice: number;
    public notesSourceId: number;
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

    public getNotesSourceId(): number
    {
        return this.notesSourceId;
    }

    public setNotesSourceId( notesSourceId: number )
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
}
