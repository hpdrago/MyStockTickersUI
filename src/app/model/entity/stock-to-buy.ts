import { ModelObject } from "./modelobject";
import { StockNoteContainer } from "../../common/stock-note-container";
import { TagList } from "../../common/tag_list";
import { StockQuoteModelObject } from "./stock-quote-modelobject";

/**
 * This entity contains the elements for the stock to buy
 *
 * Created 10/17/2017
 */
export class StockToBuy extends StockQuoteModelObject<StockToBuy> implements StockNoteContainer
{
    public static readonly COMMENTS_LEN = 10;
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

}
