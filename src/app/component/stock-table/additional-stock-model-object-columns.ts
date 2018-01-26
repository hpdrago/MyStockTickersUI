import { CrudTableColumns } from '../crud/table/crud-table-columns';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { StockQuote } from '../../model/entity/stock-quote';
import { StockCompany } from '../../model/entity/stock-company';
import { GainsLosses } from '../../model/entity/gains-losses';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { CrudTableColumnType } from '../crud/table/crud-table-column-type';

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
                                        colId: 'avgAnalystPriceTarget',
                                        header: 'Avg Analyst PT',
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
                                        colId: 'analystConsensus',
                                        header: 'Analyst Consensus',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: true
                                    } );
        crudTableColumns.addAll( new StockPriceQuote().getDefaultColumns() );
        crudTableColumns.addAll( new StockQuote().getDefaultCrudTableColumns() );
        crudTableColumns.addAll( new StockCompany().getDefaultCrudTableColumns() );
        crudTableColumns.addAll( new GainsLosses().getDefaultCrudTableColumns() );
        crudTableColumns.addAll( new StockAnalystConsensus().getDefaultCrudTableColumns() );
        this.addAll( crudTableColumns );
    }

}
