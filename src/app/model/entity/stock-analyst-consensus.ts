import { ModelObject } from "./modelobject";
import { StockQuoteModelObject } from "./stock-quote-modelobject";
import { StockNoteContainer } from "../../common/stock-note-container";
import { StockNotesSourceContainer } from "../../common/stock-notes-source-container";

/**
 * This entity contains the elements for the stock summary
 *
 * Created 10/17/2017
 */
export class StockAnalystConsensus extends StockQuoteModelObject<StockAnalystConsensus>
                                   implements StockNoteContainer,
                                              StockNotesSourceContainer
{
    public id: number;
    public customerId: number;
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
    public notesSourceId: number;
    public notesSourceName: string;
    public createDate: Date;
    public updateDate: Date;

    public isEqualPrimaryKey( modelObject: StockAnalystConsensus ): boolean
    {
        return modelObject.id === this.id;
    }

    public getNotes(): string
    {
        return this.comments;
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
}
