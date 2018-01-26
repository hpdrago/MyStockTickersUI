import { ModelObject } from "../common/model-object";

export class StockNotesStock extends ModelObject<StockNotesStock>
{
    public stockNotesId: string;
    public customerId: string;
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
