import { ModelObject } from "./modelobject";

export class StockNotesStock extends ModelObject<StockNotesStock>
{
    public stockNotesId: number;
    public customerId: number;
    public tickerSymbol: string;
    public stockPrice: number;

    isEqualPrimaryKey( modelObject: StockNotesStock ): boolean
    {
        return modelObject.stockNotesId == this.stockNotesId &&
               modelObject.customerId == this.customerId &&
               modelObject.tickerSymbol == this.tickerSymbol;
    }

    public getPrimaryKeyValue(): any
    {
        return this.stockNotesId;
    }

    public getPrimaryKeyName(): string
    {
        return "stockNotesId";
    }
}
