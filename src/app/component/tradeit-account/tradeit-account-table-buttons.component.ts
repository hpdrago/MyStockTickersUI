import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountController } from './tradeit-controller';
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'tradeit-account-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class TradeItAccountTableButtonsComponent extends CrudTableButtonsComponent<TradeItAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {TradeItAccountController} tradeItAccountController
     * @param {TradeItAccountFactory} tradeItAccountFactory
     */
    constructor( protected toaster: ToastsManager,
                 private tradeItAccountStateStore: TradeItAccountStateStore,
                 private tradeItAccountController: TradeItAccountController,
                 private tradeItAccountFactory: TradeItAccountFactory )
    {
        super( toaster,
               tradeItAccountStateStore,
               tradeItAccountController,
               tradeItAccountFactory )
    }

    protected getAddButtonLabel(): string
    {
        return "Add Account";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Account";
    }

}
