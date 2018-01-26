import { ModelObject } from "../common/model-object";
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';

/**
 * A stock note source defines a single source that the customer has identified.
 * StockCompany note sources are owned by the customer and the customer can add, remove, and change
 * their sources.  This is their way of categorizing the source of each stock note.
 */
export class StockNotesSource extends ModelObject<StockNotesSource>
{
    private _id: string;
    private _customerId: string;
    private _name: string;

    set id( id: string ) { this._id = id }
    get id(): string { return this._id }
    set customerId( customerId: string ) { this._customerId = customerId }
    get customerId(): string { return this._customerId }
    set name( name: string ) { this._name = name }
    get name(): string { return this._name }

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
        let defaultColumns = new CrudTableColumns([]);
        defaultColumns.addColumn( {
                                    colId: 'name',
                                    header: 'Source Name',
                                    dataType: CrudTableColumnType.STRING,
                                    field: 'name',
                                    sortable: true
                                } );
        return defaultColumns;
    }
}
