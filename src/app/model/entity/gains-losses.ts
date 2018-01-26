import { ModelObject } from '../common/model-object';
import { TickerSymbolContainer } from '../common/ticker-symbol-container';

/**
 * This entity contains the elements for gains and losses.
 *
 * Created 05/29/2018
 */
export class GainsLosses extends ModelObject<GainsLosses>
                         implements TickerSymbolContainer
{
    public id: string;
    public customerId: string;
    public tickerSymbol: string;
    public linkedAccountId: string;
    public gains: number;
    public losses: number;
    public totalGainsLosses: number;

    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

    public setTickerSymbol( tickerSymbol: string )
    {
        this.tickerSymbol = tickerSymbol;
    }

    public isEqualPrimaryKey( modelObject: GainsLosses ): boolean
    {
        return modelObject.id === this.id;
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
