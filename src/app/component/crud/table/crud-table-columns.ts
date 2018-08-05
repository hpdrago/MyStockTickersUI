import { CrudTableColumn } from './crud-table-column';
import { isNullOrUndefined } from 'util';
import { Column } from 'primeng/shared';
import { CrudTableColumnCachedDataType } from './crud-table-column-cached-data-type';

/**
 * Manages a list of {@code CrudTableColumns}.
 */
export class CrudTableColumns
{
    private columns: CrudTableColumn[] = [];

    /**
     * Constructor.
     * @param {Column[]} columns which are expected to be instances of CrudTableColumn
     */
    constructor( columns: any[] )
    {
        this.columns = [];
        if ( !isNullOrUndefined( columns ))
        {
            columns.forEach( column => this.columns
                                           .push( column ) );
        }
    }

    /**
     * Adds a new column to the end of the list.
     * @param {CrudTableColumn} column
     */
    public addColumn( column: CrudTableColumn )
    {
        /*
        if ( column.dataType != CrudTableColumnType.CUSTOM &&
             isNullOrUndefined( column.field ) )
        {
            throw new ReferenceError( "Non custom fields must have a field property set: " +
                JSON.stringify( column ) );
        }
        */
        this.columns.push( column );
    }

    /**
     * Removes any columns that are in {@code columnsToRemove} from the column list.
     * @param {CrudTableColumns} columnsToRemove
     */
    public removeColumns( columnsToRemove: CrudTableColumns )
    {
        columnsToRemove.columns
                       .forEach( columnToRemove => this.removeColumn( columnToRemove.colId ));
    }

    /**
     * Remove the colume for the {@code columnId}
     * @param {string} columnId
     */
    public removeColumn( columnId: string )
    {
        this.columns = this.columns
                           .filter( column => column.colId != columnId );
    }

    /**
     * Iterator for the crudTableColumns.
     * @return {IterableIterator<CrudTableColumn>}
     */
    public iterator(): IterableIterator<CrudTableColumn>
    {
        return this.columns.values();
    }

    /**
     * Creates a new array from the internal array.
     * @return {CrudTableColumn[]}
     */
    public toArray(): CrudTableColumn[]
    {
        let returnColumns = [];
        this.columns
            .forEach( column => returnColumns.push( column ) );
        return returnColumns;
    }

    /**
     * Convert to a PrimeNg column array.
     * @return {Column[]}
     */
    public toColumnArray(): Column[]
    {
        let returnColumns = [];
        this.columns
            .forEach( column => returnColumns.push( column ) );
        return returnColumns;
    }

    /**
     * Adds all of the crudTableColumns from {@code crudTableColumns} to the internal column list.
     * @param {CrudTableColumns} crudTableColumns
     */
    public addAll( crudTableColumns: CrudTableColumns )
    {
        crudTableColumns.columns
                        .forEach(column =>
                                 {
                                     /*
                                      * don't add duplicates.
                                      */
                                     if ( this.getColumn( column.colId ) == null )
                                     {
                                         this.columns = this.columns.concat( crudTableColumns.columns );
                                     }
                                 })
    }

    /**
     * Adds all of the columns from {@code crudTableColumns} to the internal column list.
     * @param {CrudTableColumn[]} crudTableColumns
     */
    public addAllFromArray( crudTableColumns: CrudTableColumn[] )
    {
        this.columns = this.columns.concat( crudTableColumns );
    }

    /**
     * Create a new instance from a JSON string.
     * @param {string} json
     * @return {CrudTableColumns}
     */
    public static fromJSON( json: string )
    {
        let crudTableColumns = JSON.parse( json );
        return new CrudTableColumns( crudTableColumns.columns );
    }

    /**
     * Get the column for the {@code columnId}.
     * @param {string} columnId
     * @return {CrudTableColumn}
     */
    public getColumn( columnId: string ): CrudTableColumn
    {
        let filteredColumns = this.columns
                                  .filter( column => column.colId == columnId );
        if ( filteredColumns.length == 0 )
        {
            return null;
        }
        return filteredColumns[0];
    }

    /**
     * Set the cache data type on all of the columns
     * @param {CrudTableColumnCachedDataType} cachedDataType
     */
    public setCacheDataType( cachedDataType: CrudTableColumnCachedDataType ): CrudTableColumns
    {
        this.columns
            .forEach( column => column.cachedDataType = cachedDataType );
        return this;
    }
}
