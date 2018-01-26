import { StockNotesStock } from "./stock-notes-stock";
import { StockNotesContainer } from "../common/stock-notes-container";
import { StockNotesSourceContainer } from "../common/stock-notes-source-container";
import { StockModelObject } from '../common/stock-model-object';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';

/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class StockNotes extends StockModelObject<StockNotes> implements StockNotesContainer,
                                                                        StockNotesSourceContainer
{
    public id: string;
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
        let crudTableColumns = super.getDefaultCrudTableColumns();
        crudTableColumns.addColumn( {
                                        colId: 'notes',
                                        header: 'Notes',
                                        dataType: CrudTableColumnType.NOTES,
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
                                        dataType: CrudTableColumnType.STRING,
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
}
