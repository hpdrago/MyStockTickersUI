import { CrudTableColumns } from '../crud/table/crud-table-columns';
import { CrudTableColumnType } from '../crud/table/crud-table-column-type';

/**
 * Defines all of the columns that are found in all {@code StockModelObject}s.
 */
export class CommonStockModelObjectColumns extends CrudTableColumns
{
    public constructor()
    {
        super( null );
        let crudTableColumns: CrudTableColumns = new CrudTableColumns( null );
        crudTableColumns.addColumn( {
                                        colId: 'tickerSymbol',
                                        header: 'Ticker Symbol',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'tickerSymbol',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'lastPrice',
                                        header: 'Last Price',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'avgUpsidePercent',
                                        header: 'Avg Upside %',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'stockPriceWhenCreated',
                                        header: 'Stock Price When Entered',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'stockPriceWhenCreated',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'percentChangeSinceCreated',
                                        header: '% Changed Since Entered',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: true
                                    } );
        this.addAll( crudTableColumns );
    }

}
