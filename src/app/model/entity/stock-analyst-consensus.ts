import { StockPriceQuoteModelObject } from "../common/stock-price-quote-model-object";
import { StockNotesContainer } from "../common/stock-notes-container";
import { StockNotesSourceContainer } from "../common/stock-notes-source-container";

/**
 * This entity contains the elements for the stock summary
 *
 * Created 10/17/2017
 */
export class StockAnalystConsensus extends StockPriceQuoteModelObject<StockAnalystConsensus>
                                   implements StockNotesContainer,
                                              StockNotesSourceContainer
{
    public id: string;
    public customerId: string;
    public comments: string;
    public analystStrongBuyCount: number;
    public analystBuyCount: number;
    public analystHoldCount: number;
    public analystUnderPerformCount: number;
    public analystSellCount: number;
    public analystSentimentDate: Date;
    public avgAnalystPriceTarget: number;
    public lowAnalystPriceTarget: number;
    public highAnalystPriceTarget: number;
    public analystPriceDate: Date;
    public notesSourceId: string;
    public notesSourceName: string;
    public createDate: Date;
    public updateDate: Date;

    public getNotes(): string
    {
        return this.comments;
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
}
