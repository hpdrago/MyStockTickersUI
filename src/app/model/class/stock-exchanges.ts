/**
 * This class manages a list of StockExchanges
 * Created by mike on 10/10/2016.
 */

import {SelectItem} from 'primeng/primeng';

export class StockExchanges
{
    public exchanges: Array<string> = [ 'AMEX', 'NASDAQ', 'NYSE', 'OTHER' ];

    /**
     * Creates and returns a SelectItem array to be used with PrimNG components
     * @returns {any}
     */
    public getSelectItems(): SelectItem[]
    {
        var selectItems = [];
        for ( let exchange of this.exchanges )
        {
            selectItems.push( { label: exchange, value: exchange } );
        }
        return selectItems;
    }
}