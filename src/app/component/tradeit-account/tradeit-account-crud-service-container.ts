import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";
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
    constructor( private _customerAccountFactory: TradeItAccountFactory,
                 private _customerAccountCrudService: TradeItAccountCrudService )
    {
        super( new ModelObjectChangeService<TradeItAccount>(), _customerAccountFactory, _customerAccountCrudService );
        this.crudPanelService = new CrudPanelService<TradeItAccount>( _customerAccountFactory, this.crudFormButtonsService );
    }

    get customerAccountCrudService(): TradeItAccountCrudService
    {
        return this._customerAccountCrudService;
    }
}
