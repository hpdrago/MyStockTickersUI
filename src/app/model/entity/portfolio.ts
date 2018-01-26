import { ModelObject } from "../common/model-object";
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';

/**
 * Defines a single portfolio for a customer
 * Created by mike on 10/23/2016.
 */
export class Portfolio extends ModelObject<Portfolio>
{
    public id: string;
    public customerId: string;
    public name: string;
    public realizedGL: number;
    public unrealizedGL: number;
    public marketValue: number;

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
        crudTableColumns.addColumn( {
                                        colId: 'name',
                                        header: 'Name',
                                        dataType: CrudTableColumnType.STRING,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'realizedGL',
                                        header: 'Realized G/L',
                                        dataType: CrudTableColumnType.GAIN_LOSS_CURRENCY,
                                        field: 'realizedGL',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'unrealizedGL',
                                        header: 'Unrealized G/L',
                                        dataType: CrudTableColumnType.GAIN_LOSS_CURRENCY,
                                        field: 'unrealizedGL',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'marketValue',
                                        header: 'Market Value',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'marketValue',
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
        let crudTableColumns: CrudTableColumns = new CrudTableColumns([] );
        return crudTableColumns;
    }

}
