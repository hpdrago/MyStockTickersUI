/**
 * Created by mike on 9/9/2018
 */
import { ModelObject } from '../common/model-object';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { CommonStockModelObjectColumns } from '../../component/stock-table/common-stock-model-object-columns';

export class WatchListStock extends ModelObject<WatchListStock>
{
    public id: string;
    public tickerSymbol: string;
    public notes: string;
    public stockPriceWhenCreated: number;
    public shares: number;
    public costBasis: number;
    public watchListId: string;
    public watchListName;

    public getPrimaryKeyName(): string
    {
        return "id";
    }

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    /**
     * Returns all of the available crudTableColumns.
     * @return {CrudTableColumns}
     */
    public getDefaultColumns(): CrudTableColumns
    {
        let crudTableColumns: CrudTableColumns = new CrudTableColumns( [] );
        let commonStockColumns = new CommonStockModelObjectColumns();
        crudTableColumns.addColumn( {
                                        colId:    'watchListName',
                                        field:    'watchListName',
                                        header:   'Watch List',
                                        dataType: CrudTableColumnType.STRING,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( commonStockColumns.getColumn( 'tickerSymbol' ));
        crudTableColumns.addColumn( {
                                        colId:    'shares',
                                        field:    'shares',
                                        header:   'Shares',
                                        dataType: CrudTableColumnType.NUMBER,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( commonStockColumns.getColumn( 'lastPrice' ));
        crudTableColumns.addColumn( {
                                        colId:    'costBasis',
                                        field:    'costBasis',
                                        header:   'Cost Basis',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( commonStockColumns.getColumn( 'avgUpsidePercent' ));
        crudTableColumns.addColumn( commonStockColumns.getColumn( 'stockPriceWhenCreated' ));
        crudTableColumns.addColumn( commonStockColumns.getColumn( 'percentChangeSinceCreated' ));
        crudTableColumns.addColumn( {
                                        colId:    'notes',
                                        field:    'notes',
                                        header:   'Notes',
                                        dataType: CrudTableColumnType.STRING,
                                        sortable: true
                                    } );
        return crudTableColumns;
    }
}
