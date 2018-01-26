import { CrudPanelComponent } from "../crud/panel/crud-panel.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SessionService } from "../../service/session.service";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountController } from './tradeit-controller';
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';
import { TradeItAccountCrudService } from '../../service/crud/tradeit-account-crud.service';

/**
 * This is the customer form panel.
 * Created 12/4/2017
 */
@Component( {
                selector: 'tradeit-account-panel',
                templateUrl: './tradeit-account-panel.component.html'
            } )
export class TradeItAccountPanelComponent extends CrudPanelComponent<TradeItAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {TradeItAccountController} tradeItAccountController
     * @param {TradeItAccountFactory} tradeItAccountFactory
     * @param {TradeItAccountCrudService} tradeItCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private tradeItAccountStateStore: TradeItAccountStateStore,
                 private tradeItAccountController: TradeItAccountController,
                 private tradeItAccountFactory: TradeItAccountFactory,
                 private tradeItCrudService: TradeItAccountCrudService )
    {
        super( toaster,
               tradeItAccountStateStore,
               tradeItAccountController,
               tradeItAccountFactory,
               tradeItCrudService );
    }
}
