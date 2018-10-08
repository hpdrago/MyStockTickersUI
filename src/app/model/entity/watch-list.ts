/**
 * Created by mike on 9/9/2018
 */
import { ModelObject } from '../common/model-object';
import { WatchListStock } from './watch-list-stock';
import { StockCompany } from './stock-company';
import { isNullOrUndefined } from 'util';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';

export class WatchList extends ModelObject<WatchList>
{
    public id: string;
    public customerId: string;
    public name: string;
    public watchListStocks: WatchListStock[];

    constructor()
    {
        super();
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    /**
     * Add a watch list stock.
     * @param {StockCompany} stockCompany
     */
    public addStock( stockCompany: StockCompany )
    {
        if ( isNullOrUndefined( this.watchListStocks ))
        {
            this.watchListStocks = [];
        }
        let watchListStock: WatchListStock = new WatchListStock();
        watchListStock.tickerSymbol = stockCompany.tickerSymbol;
        watchListStock.watchListId = this.id;
        this.watchListStocks
            .push( watchListStock );
    }

    /**
     * Returns all of the available crudTableColumns.
     * @return {CrudTableColumns}
     */
    public getDefaultColumns(): CrudTableColumns
    {
        let crudTableColumns: CrudTableColumns = new CrudTableColumns( [] );
        crudTableColumns.addColumn( {
                                        colId:    'name',
                                        field:    'name',
                                        header:   'Name',
                                        dataType: CrudTableColumnType.STRING,
                                        sortable: false
                                    } );
        return crudTableColumns;
    }
}
