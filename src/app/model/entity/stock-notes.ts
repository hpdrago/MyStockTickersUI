import { ModelObject } from "./modelobject";
import { StockNotesStock } from "./stock-notes-stock";
import { StockNoteContainer } from "../../common/stock-note-container";
import { StockQuoteModelObject } from "./stock-quote-modelobject";
import { TagList } from "../../common/tag_list";
import { StockNotesActionTaken } from "../../common/stock-notes-action-taken.enum";

/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class StockNotes extends StockQuoteModelObject<StockNotes> implements StockNoteContainer
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
    public actionTaken: number;
    public actionTakenShares: number;
    public actionTakenPrice: number;
    public stockPriceWhenCreated: number;
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
        let tickerSymbols: string = '';
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
