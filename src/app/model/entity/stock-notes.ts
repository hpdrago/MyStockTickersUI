import { ModelObject } from "./modelobject";
import { StockNotesStock } from "./stock-notes-stock";
import { StockNoteContainer } from "../../common/stock-note-container";

/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class StockNotes extends ModelObject<StockNotes> implements StockNoteContainer
{
    public id: number;
    public customerId: number;
    public notes: string;
    public notesDate: Date;
    public notesSourceName: string;
    public notesSourceId: number;
    public notesRating: number;
    public publicInd: boolean;
    public bullOrBear: number;
    public actionTaken: string;
    public actionTakenShares: number;
    public dateCreated: Date;
    public dateModified: Date;
    public stocks: Array<StockNotesStock> = [];

    /**
     * A StockNote entity contains a list of stocks each with a ticker symbol and a price.
     * When displaying stock notes in the table, the stock notes are expanded so that there is a single row
     * for each stock of the stock note.  The following variables are the values to be displayed in the table row for each stock
     * of the stock note.
     */
    public tickerSymbol: string;
    public stockPrice: number;

    /**
     * Get the notes
     * @returns {string}
     */
    public getNotes(): string
    {
        return this.notes;
    }

    /**
     * Get the ticker symbol
     * @returns {string}
     */
    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

    public isEqualPrimaryKey( modelObject: StockNotes )
    {
        var isEqual = false;
        if ( modelObject )
        {
            isEqual = this.id === modelObject.id;
        }
        return isEqual;
    }

    /**
     * Returns a comma delimeted string of the ticker symbols
     * @return {string}
     */
    public getTickerSymbols(): string
    {
        var tickerSymbols = '';
        this.stocks
            .forEach( stockNotesStock =>
             {
                 if ( tickerSymbols.length > 0 )
                 {
                     tickerSymbols += ', ';
                 }
                 tickerSymbols += stockNotesStock.tickerSymbol;
             } );
        return tickerSymbols;
    }
}
