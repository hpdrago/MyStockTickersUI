import { CrudTableColumns } from '../crud/table/crud-table-columns';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { StockQuote } from '../../model/entity/stock-quote';
import { StockCompany } from '../../model/entity/stock-company';
import { GainsLosses } from '../../model/entity/gains-losses';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { CrudTableColumnType } from '../crud/table/crud-table-column-type';
import { CrudTableColumnCachedDataType } from '../crud/table/crud-table-column-cached-data-type';

/**
 * Defines all of the stock/ticker symbol based columns.
 */
export class AdditionalStockModelObjectColumns extends CrudTableColumns
{
    public constructor()
    {
        super( null );
        let crudTableColumns: CrudTableColumns = new CrudTableColumns( null );
        crudTableColumns.addColumn( {
                                        colId: 'avgUpsidePercent',
                                        header: 'Avg Upside %',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'analystConsensus',
                                        header: 'Analyst Consensus',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: true
                                    } );
        /*
         * Add all of the cached data type columns.
         */
        crudTableColumns.addAll( new StockPriceQuote().getDefaultColumns()
                                                      .setCacheDataType( CrudTableColumnCachedDataType.STOCK_PRICE_QUOTE ) );
        crudTableColumns.addAll( new StockQuote().getDefaultColumns()
                                                 .setCacheDataType( CrudTableColumnCachedDataType.STOCK_QUOTE ));
        crudTableColumns.addAll( new StockCompany().getDefaultColumns()
                                                   .setCacheDataType( CrudTableColumnCachedDataType.STOCK_COMPANY ));
        crudTableColumns.addAll( new GainsLosses().getDefaultColumns()
                                                  .setCacheDataType( CrudTableColumnCachedDataType.STOCK_GAINS_LOSSES ));
        crudTableColumns.addAll( new StockAnalystConsensus().getDefaultColumns()
                                                            .setCacheDataType( CrudTableColumnCachedDataType.STOCK_ANALYST_CONSENSUS ));
        this.addAll( crudTableColumns );
    }

}
