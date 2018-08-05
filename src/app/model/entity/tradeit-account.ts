/**
 * Created by mike on 11/11/2017
 */
import { ModelObject } from "../common/model-object";
import { JsonObject, JsonProperty } from "json2typescript";
import { isNullOrUndefined } from "util";
import { LinkedAccount } from "./linked-account";
import { DateConverter } from "../common/date-converter";
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';

/**
 * TradeItLinkedAccount DTO
 *
 * Created 12/4/2017
 */
@JsonObject
export class TradeItAccount extends ModelObject<TradeItAccount>
{
    @JsonProperty( "id", String )
    public id: string = undefined;

    @JsonProperty( "customerId", String )
    public customerId: string = undefined;

    @JsonProperty( "name", String )
    public name: string = undefined;

    @JsonProperty( "brokerage", String )
    public brokerage: string = undefined;

    @JsonProperty( "authTimestamp", DateConverter )
    public authTimestamp: Date = undefined;

    @JsonProperty( "tradeItAccount", Boolean )
    public tradeItAccount: boolean = undefined;

    public linkedAccounts: LinkedAccount[] = undefined;

    public isTradeItAccount(): boolean
    {
        return this.tradeItAccount;
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
     * Determines if the user's last authentication time is within the timeout period of 15 minutes
     * @return {boolean} true if the user is still authenticated.  False otherwise.
     */
    public isAuthenticated(): boolean
    {
        const methodName = "isAuthenticated";
        console.log( methodName + " authTimestamp: " + this.authTimestamp );
        if ( isNullOrUndefined( this.authTimestamp ) )
        {
            console.log( methodName + " authTimestamp: null returning false" );
            return false;
        }
        else
        {
            let authTimestamp = new Date( this.authTimestamp );
            console.log( `${methodName} authTimestamp: ${authTimestamp}` );
            var diffMins = authTimestamp.getMilliseconds()/(60 * 1000 * 1000)
            console.log( `${methodName} diffMines: ${diffMins}` );
            return diffMins < 15;
        }
    }

    public getDefaultColumns(): CrudTableColumns
    {
        let crudTableColumns = new CrudTableColumns([]);
        crudTableColumns.addColumn( {
                                        colId: 'accountName',
                                        header: 'Account Name',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'name',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'brokerAge',
                                        header: 'Brokerage',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'brokerage',
                                        sortable: true
                                    } );
        return crudTableColumns;
    }
}
