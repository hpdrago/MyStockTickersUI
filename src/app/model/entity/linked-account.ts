import { ModelObject } from "../common/model-object";
import { JsonObject, JsonProperty } from "json2typescript";
import { DateConverter } from "../common/date-converter";
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';

/**
 * This is the child (1 to Many) record of a {@code TradeItAccount}.  It contains the information for a brokerage account
 * for the user.
 */
@JsonObject
export class LinkedAccount extends ModelObject<LinkedAccount>
{
    @JsonProperty( "id", String )
    public id: string = undefined;

    @JsonProperty( "customerId", String )
    public customerId: string = undefined;

    @JsonProperty( "tradeItAccountId", String )
    public tradeItAccountId: string = undefined;

    @JsonProperty( "accountNumber", String )
    public accountNumber: string = undefined;

    @JsonProperty( "accountName", String )
    public accountName: string = undefined;

    @JsonProperty( "accountIndex", Number )
    public accountIndex: number = undefined;

    @JsonProperty( "createDate", DateConverter )
    public createDate: Date = undefined;

    @JsonProperty( "updateDate", DateConverter )
    public updateDate: Date = undefined;

    @JsonProperty( "availableCash", Number )
    public availableCash: number = undefined;

    @JsonProperty( "buyingPower", Number )
    public buyingPower: number = undefined;

    @JsonProperty( "totalValue", Number )
    public totalValue: number = undefined;

    @JsonProperty( "dayAbsoluteReturn", Number )
    public dayAbsoluteReturn: number = undefined;

    @JsonProperty( "dayPercentReturn", Number )
    public dayPercentReturn: number = undefined;

    @JsonProperty( "totalAbsoluteReturn", Number )
    public totalAbsoluteReturn: number = undefined;

    @JsonProperty( "totalPercentReturn", Number )
    public totalPercentReturn: number = undefined;

    @JsonProperty( "marginCash", Number )
    public marginCash: number = undefined;

    @JsonProperty( "loadingStatus", String )
    public loadingStatus: string = undefined;

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }

    public getDefaultColumns(): CrudTableColumns
    {
        let crudTableColumns = new CrudTableColumns( null );
        crudTableColumns.addColumn( {
                                        colId: 'accountNumber',
                                        header: 'Account Number',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'accountNumber',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'accountName',
                                        header: 'Account Name',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'accountName',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'availableCash',
                                        header: 'Available Cash',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'availableCache',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'buyingPower',
                                        header: 'Buying Power',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'buyingPower',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'totalValue',
                                        header: 'Total Value',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'totalValue',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'dayAbsoluteReturn',
                                        header: 'Day Total Gain',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'dayAbsoluteReturn',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'dayPercentReturn',
                                        header: 'Day % Gain',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'dayPercentReturn',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'totalAbsoluteReturn',
                                        header: 'Total Gain',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'totalAbsoluteReturn',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'totalPercentReturn',
                                        header: 'Total % Gain',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'totalPercentReturn',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'marginCash',
                                        header: 'Margin Cash',
                                        dataType: CrudTableColumnType.CURRENCY,
                                        field: 'marginCash',
                                        sortable: true
                                    } );
        return crudTableColumns;
    }
}
