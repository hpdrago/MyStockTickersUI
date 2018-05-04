import { StockNotesStock } from "./stock-notes-stock";
import { StockNotesContainer } from "../common/stock-notes-container";
import { StockPriceQuoteModelObject } from "./stock-price-quote-model-object";
import { StockNotesSourceContainer } from "../common/stock-notes-source-container";

/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class StockNotes extends StockPriceQuoteModelObject<StockNotes> implements StockNotesContainer,
                                                                                  StockNotesSourceContainer
{
    public id: string;
    public customerId: string;
    public notes: string;
    public notesDate: Date;
    public notesSourceName: string;
    public notesSourceId: string;
    public notesRating: number;
    public publicInd: boolean;
    public bullOrBear: number;
    public actionTaken: number;
    public actionTakenShares: number;
    public actionTakenPrice: number;
    public tags: string[];
    public stocks: Array<StockNotesStock>;

    /**
     * Get the notes
     * @returns {string}
     */
    public getNotes(): string
    {
        return this.notes;
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
