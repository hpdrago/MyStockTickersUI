import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { TradeItAccountFactory } from "../../model/factory/tradeit-account.factory";
import { TradeItAccountCrudService } from "../../service/crud/tradeit-account-crud.service";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { CrudPanelService } from "../crud/panel/crud-panel.service";

/**
 * This is the service container for the TradeItLinkedAccount entity.
 */
@Injectable()
export class TradeItAccountCrudServiceContainer extends CrudServiceContainer<TradeItAccount>
{
    /**
     * Constructor.
     * @param {TradeItAccountFactory} _customerAccountFactory
     * @param {TradeItAccountCrudService} _customerAccountCrudService
     */
    constructor( private _customerAccountFactory: TradeItAccountFactory,
                 private _customerAccountCrudService: TradeItAccountCrudService )
    {
        super( _customerAccountFactory, _customerAccountCrudService );
        this.crudPanelService = new CrudPanelService<TradeItAccount>( _customerAccountFactory,
                                                                      this.crudStateStore,
                                                                      this.crudFormButtonsService );
    }

    get customerAccountCrudService(): TradeItAccountCrudService
    {
        return this._customerAccountCrudService;
    }
}
