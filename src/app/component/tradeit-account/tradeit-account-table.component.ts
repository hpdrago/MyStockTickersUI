import { ToastsManager } from "ng2-toastr";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { Component } from "@angular/core";
import { CrudOperation } from "../crud/common/crud-operation";
import { TradeitAccountBaseTableComponent } from "./tradeit-account-base-table.component";
import { TradeItService } from "../../service/tradeit/tradeit.service";

/**
 * This component display the list of the customer's brokerage accounts
 *
 * Created by mike on 10/24/2017.
 */
@Component(
{
    selector:    'tradeit-account-table',
    styleUrls:   ['../crud/table/crud-table.component.css',
                  './tradeit-account-table.component.css'],
    templateUrl: './tradeit-account-table.component.html'
} )
export class TradeItAccountTableComponent extends TradeitAccountBaseTableComponent
{
    private OPERATION = CrudOperation;
    constructor( protected toaster: ToastsManager,
                 protected customerAccountServiceContainer: TradeItAccountCrudServiceContainer,
                 protected tradeItService: TradeItService )
    {
        super( toaster, customerAccountServiceContainer, tradeItService );
    }
}
