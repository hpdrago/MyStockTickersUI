import { ModelObject } from "./modelobject";
/**
 * Contains the number of stock notes for one ticker symbol for the customer
 * Created by mike on 8/17/2017.
 */
export class StockNoteCount extends ModelObject<StockNoteCount>
{
    public customerId: number;
    public tickerSymbol: string;
    public noteCount: number;

  /**
   * Make a copy of this instance
   * @returns {StockNoteCount}
   */
  public clone(): StockNoteCount
    {
        var newStockNote = new StockNoteCount();
        this.copyProperties( this, newStockNote );
        return newStockNote;
    }

    public isEqualPrimaryKey( modelObject: StockNoteCount )
    {
        var isEqual = false;
        if ( modelObject )
        {
          isEqual = this.tickerSymbol === modelObject.tickerSymbol;
        }
      return isEqual;
    }
}
