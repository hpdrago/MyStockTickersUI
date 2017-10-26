import { ModelObject } from "./modelobject";
import { StockNoteContainer } from "../../common/stock-note-container";
import { TagList } from "../../common/tag_list";

/**
 * This entity contains the elements for the stock to buy
 *
 * Created 10/17/2017
 */
export class StockToBuy extends ModelObject<StockToBuy> implements StockNoteContainer
{
    public static readonly COMMENTS_LEN = 10;
    public id: number;
    public customerId: number;
    public tickerSymbol: string;
    public companyName: string;
    public comments: string;
    public buySharesBelow: number;
    public lastPrice: number;
    public lastPriceChange: Date;
    public createDate: Date;
    public updateDate: Date;
    public tags: TagList;

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
