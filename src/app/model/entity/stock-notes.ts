import { ModelObject } from "./modelobject";
import { StockNotesStock } from "./stock-notes-stock";
import { JsonProperty } from "json-typescript-mapper";
/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class StockNotes extends ModelObject<StockNotes>
{
    public id: number;
    public customerId: number;
    @JsonProperty( 'notes' )
    private _notes: string;
    @JsonProperty( 'notesDate' )
    private _notesDate: Date;
    @JsonProperty( 'notesSourceName' )
    private _notesSourceName: string;
    @JsonProperty( 'notesSourceId' )
    private _notesSourceId: number;
    public notesRating: number;
    public publicInd: boolean;
    public bullOrBear: number;
    public dateCreated: Date;
    public dateModified: Date;
    public stocks: Array<StockNotesStock> = [];

    /**
     * A StockNote entity contains a list of stocks each with a ticker symbol and a price.
     * When displaying stock notes in the table, the stock notes are expanded so that there is a single row
     * for each stock of the stock note.  The following variables are the values to be displayed in the table row for each stock
     * of the stock note.
     */
    private _tickerSymbol: string;
    private _stockPrice: number;

    get tickerSymbol(): string { return this._tickerSymbol; }
    set tickerSymbol( tickerSymbol: string ) { this._tickerSymbol = tickerSymbol; }
    get stockPrice(): number { return this._stockPrice; }
    set stockPrice( stockPrice: number ) { this._stockPrice = stockPrice; }
    set notes( notes: string ) { this._notes = notes }
    get notes(): string { return this._notes }
    set notesDate( notesDate: Date ) { this._notesDate = notesDate }
    get notesDate(): Date { return this._notesDate }
    set notesSourceId( notesSourceId: number ) { this._notesSourceId = notesSourceId }
    get notesSourceId(): number { return this._notesSourceId }
    set notesSourceName( notesSourceName: string ) { this._notesSourceName = notesSourceName }
    get notesSourceName(): string { return this._notesSourceName }

    /**
     * Creates a comma delimited list of ticker symbols from the stockNotesStock array
     * @return {string}
     */
    public getTickerSymbolString(): string
    {
        var tickerSymbols = "";
        for ( let stockNoteStock of this.stocks )
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
