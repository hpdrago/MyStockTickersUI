import { StockNotesStock } from "./stock-notes-stock";
import { StockModelObject } from '../common/stock-model-object';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { AdditionalStockModelObjectColumns } from '../../component/stock-table/additional-stock-model-object-columns';
import { StockAnalystConsensus } from './stock-analyst-consensus';
import { StockCompany } from './stock-company';
import { GainsLosses } from './gains-losses';
import { StockPriceQuote } from './stock-price-quote';
import { StockQuote } from './stock-quote';
import { ModelObject } from '../common/model-object';
import { CommonStockModelObjectColumns } from '../../component/stock-table/common-stock-model-object-columns';

/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class StockNotes extends ModelObject<StockNotes> implements StockModelObject
{
    public id: string;
    public tickerSymbol: string;
    public stockPriceWhenCreated: number;
    public customerId: string;
    public notes: string;
    public notesDate: Date;
    public notesSourceName: string;
    public notesSourceId: string;
    public notesRating: number;
    public publicInd: boolean;
    public bullOrBear: number;
    public actionTaken: number;
    public actionTakenShares: number;
    public actionTakenPrice: number;
    public tags: string[];
    public stocks: Array<StockNotesStock>;

    /*
     * Stock model object properties.
     */
    public stockAnalystConsensus: StockAnalystConsensus;
    public stockCompany: StockCompany;
    public stockGainsLosses: GainsLosses;
    public stockPriceQuote: StockPriceQuote;
    public stockQuote: StockQuote;

    /**
     * Get the notes
     * @returns {string}
     */
    public getNotes(): string
    {
        return this.notes;
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

    public getDefaultCrudTableColumns(): CrudTableColumns
    {
        let crudTableColumns = new CrudTableColumns([]);
        crudTableColumns.addAll( new CommonStockModelObjectColumns() );
        crudTableColumns.addColumn( {
                                        colId: 'notes',
                                        header: 'Notes',
                                        dataType: CrudTableColumnType.COMMENTS,
                                        field: 'notes',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'notesDate',
                                        header: 'Notes Date',
                                        dataType: CrudTableColumnType.DATE,
                                        field: 'notesDate',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'notesSourceName',
                                        header: 'Notes Source',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'notesSourceName',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'notesRating',
                                        header: 'Notes Rating',
                                        dataType: CrudTableColumnType.STAR_RATING,
                                        field: 'notesRating',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'bullOrBear',
                                        header: 'Bull or Bear',
                                        dataType: CrudTableColumnType.BULL_OR_BEAR,
                                        field: 'bullOrBear',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'actionTaken',
                                        header: 'Action Taken',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        field: 'actionTaken',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'actionTakenShares',
                                        header: 'Action Shares',
                                        dataType: CrudTableColumnType.NUMBER,
                                        field: 'actionTakenShares',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'tags',
                                        header: 'Tags',
                                        dataType: CrudTableColumnType.TAGS,
                                        field: 'tags',
                                        sortable: true
                                    } );
        return crudTableColumns;
    }

    /**
     * Creates a list of the stock columns.
     * @return {CrudTableColumns}
     */
    public getAdditionalCrudTableColumns(): CrudTableColumns
    {
        return new AdditionalStockModelObjectColumns();
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
