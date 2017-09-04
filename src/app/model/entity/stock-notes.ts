import { ModelObject } from "./modelobject";
import { StockNotesStock } from "./stock-notes-stock";
/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class StockNotes extends ModelObject<StockNotes>
{
    public id: number;
    public customerId: number;
    public notes: string;
    public notesDate: Date;
    public notesSourceId: number;
    public notesRating: number;
    public publicInd: boolean;
    public bullOrBear: number;
    public dateCreated: Date;
    public dateModified: Date;
    public stockNotesStocks: Array<StockNotesStock> = [];

    /**
     * Creates a comma delimited list of ticker symbols from the stockNotesStock array
     * @return {string}
     */
    public getTickerSymbolString(): string
    {
        var tickerSymbols = "";
        for ( let stockNoteStock of this.stockNotesStocks )
        {
            if ( tickerSymbols.length > 0 )
            {
                tickerSymbols += ', '
            }
            tickerSymbols += stockNoteStock.tickerSymbol;
        }
        return tickerSymbols;
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
}
