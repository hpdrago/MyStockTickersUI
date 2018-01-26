import { StockModelObject } from '../common/stock-model-object';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { ModelObject } from '../common/model-object';
import { StockAnalystConsensus } from './stock-analyst-consensus';
import { GainsLosses } from './gains-losses';
import { StockCompany } from './stock-company';
import { StockPriceQuote } from './stock-price-quote';
import { StockQuote } from './stock-quote';
import { AdditionalStockModelObjectColumns } from '../../component/stock-table/additional-stock-model-object-columns';
import { CommonStockModelObjectColumns } from '../../component/stock-table/common-stock-model-object-columns';
import { StockDashboardModelObject } from '../common/stock-dashboard-model-object';

/**
 * This entity contains the elements for the stock to buy
 *
 * Created 10/17/2017
 */
export class StockToBuy extends ModelObject<StockToBuy>
                        implements StockModelObject,
                                   StockDashboardModelObject
{
    public id: string;
    public tickerSymbol: string;
    public customerId: string;
    public comments: string;
    public buySharesUpToPrice: number;
    public notesSourceId: string;
    public notesSourceName: string;
    public stockPriceWhenCreated: number;
    public completed: boolean;
    public buyAfterDate: Date;
    public tags: string[];

    /*
     * Stock model object properties.
     */
    public stockAnalystConsensus: StockAnalystConsensus;
    public stockCompany: StockCompany;
    public stockGainsLosses: GainsLosses;
    public stockPriceQuote: StockPriceQuote;
    public stockQuote: StockQuote;

    public getNotes(): string
    {
        return this.comments;
    }

    public isEqualPrimaryKey( modelObject: StockToBuy ): boolean
    {
        return modelObject.id === this.id;
    }

    public getNotesSourceId(): string
    {
        return this.notesSourceId;
    }

    public setNotesSourceId( notesSourceId: string )
    {
        this.notesSourceId = notesSourceId;
    }

    public getNotesSourceName(): string
    {
        return this.notesSourceName;
    }

    public setNotesSourceName( notesSourceName: string )
    {
        this.notesSourceName = notesSourceName;
    }

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }

    /**
     * Returns all of the available crudTableColumns.
     * @return {CrudTableColumns}
     */
    public getDefaultColumns(): CrudTableColumns
    {
        let crudTableColumns: CrudTableColumns = new CrudTableColumns([] );
        crudTableColumns.addAll( new CommonStockModelObjectColumns() );
        crudTableColumns.addColumn( {
                                        colId: 'recordBuy',
                                        header: 'Record Buy',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: false
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'notesSourceName',
                                        header: 'Source',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'notesSourceName',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'buySharesUpToPrice',
                                        header: 'Buy Shares Up To',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        field: 'buySharesUpToPrice',
                                        sortable: false
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'buyAfterDate',
                                        header: 'Buy After Date',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        field: 'buyAfterDate',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'tags',
                                        header: 'Tags',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'tags',
                                        sortable: false
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'comments',
                                        header: 'Comments',
                                        dataType: CrudTableColumnType.COMMENTS,
                                        field: 'comments',
                                        sortable: false
                        } );
        return crudTableColumns;
    }

    /**
     * Creates a list of the stock columns.
     * @return {CrudTableColumns}
     */
    public getAdditionalColumns(): CrudTableColumns
    {
        return new AdditionalStockModelObjectColumns();
    }

    public getDashboardDefaultColumns(): CrudTableColumns
    {
        let crudTableColumns: CrudTableColumns = new CrudTableColumns([] );
        crudTableColumns.addColumn( {
                                        colId: 'notesSourceName',
                                        header: 'Source',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'notesSourceName',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'buySharesUpToPrice',
                                        header: 'Buy Shares Up To',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        field: 'buySharesUpToPrice',
                                        sortable: false
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'buyAfterDate',
                                        header: 'Buy After Date',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        field: 'buyAfterDate',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'comments',
                                        header: 'Comments',
                                        dataType: CrudTableColumnType.COMMENTS,
                                        field: 'comments',
                                        sortable: false
                                    } );
        crudTableColumns.addAll( new CommonStockModelObjectColumns() );
        return crudTableColumns;
    }

    public getDashboardAdditionalColumns(): CrudTableColumns
    {
        let crudTableColumns: CrudTableColumns = new CrudTableColumns([] );
        crudTableColumns.addColumn( {
                                        colId: 'recordBuy',
                                        header: 'Record Buy',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        sortable: false
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'tags',
                                        header: 'Tags',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'tags',
                                        sortable: false
                                    } );
        crudTableColumns.addAll( this.getAdditionalColumns() );
        return crudTableColumns;
    }

    public initializeStockModelObjects()
    {
        this.stockPriceQuote = new StockPriceQuote();
        this.stockQuote = new StockQuote();
        this.stockCompany = new StockCompany();
        this.stockGainsLosses = new GainsLosses();
        this.stockAnalystConsensus = new StockAnalystConsensus();
    }
}
