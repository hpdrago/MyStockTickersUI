import { ModelObject } from "./modelobject";
/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class StockNotes extends ModelObject<StockNotes>
{
    public id: number;
    public customerId: number;
    public tickerSymbol: string;
    public notes: string;
    public notesDate: Date;
    public notesSourceId: number;
    public noteRating: number;
    public publicInd: boolean;
    public bullOrBear: number;
    public dateCreated: Date;
    public dateModified: Date;

    public clone(): StockNotes
    {
        var newStockNote = new StockNotes();
        this.copyProperties( this, newStockNote );
        return newStockNote;
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
