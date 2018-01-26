import { Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { BaseComponent } from "../common/base.component";
import { TradeItAccountTableComponent } from "./tradeit-account-table.component";
import { LinkedAccountTableComponent } from "../linked-account/linked-account-table.component";
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountController } from './tradeit-account-controller';
import { LinkedAccountStateStore } from '../linked-account/linked-account-state-store';
import { LinkedAccountController } from '../linked-account/linked-account-controller';
import { TradeItAccountCrudActionHandler } from './tradeit-account-crud-action-handler';
import { LinkedAccountCrudActionHandler } from '../linked-account/linked-account-crud-action-handler';
import { StockPositionTableComponent } from '../stock-position/stock-position-table.component';
import { LinkedAccount } from '../../model/entity/linked-account';

/**
 * Created by mike on 10/8/2016.
 */
@Component(
    {
        selector:    'tradeit-accounts',
        templateUrl: './tradeit-accounts.component.html',
        providers: [TradeItAccountStateStore, TradeItAccountController, TradeItAccountCrudActionHandler,
                    LinkedAccountStateStore, LinkedAccountController, LinkedAccountCrudActionHandler]
    })
export class TradeItAccountsComponent extends BaseComponent
{
    @ViewChild(TradeItAccountTableComponent)
    private tradeItAccountTableComponent: TradeItAccountTableComponent;

    @ViewChild(LinkedAccountTableComponent)
    private linkedAccountTableComponent: LinkedAccountTableComponent;

    @ViewChild(StockPositionTableComponent)
    private stockPositionTableComponent: StockPositionTableComponent;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItAccountCrudServiceContainer} customerAccountCrudServiceContainer
     * @param {TradeItService} tradeItService
     */
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

}
