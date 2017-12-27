import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";
import { CustomerAccountFactory } from "../../model/factory/customer-account.factory";
import { CustomerAccountCrudService } from "../../service/crud/customer-account-crud.service";
import { CustomerAccount } from "../../model/entity/customer-account";
import { CrudPanelService } from "../crud/panel/crud-panel.service";

/**
 * This is the service container for the CustomerAccount entity.
 */
@Injectable()
export class CustomerAccountCrudServiceContainer extends CrudServiceContainer<CustomerAccount>
{
    constructor( private _customerAccountFactory: CustomerAccountFactory,
                 private _customerAccountCrudService: CustomerAccountCrudService )
    {
        super( new ModelObjectChangeService<CustomerAccount>(), _customerAccountFactory, _customerAccountCrudService );
        this.crudPanelService = new CrudPanelService<CustomerAccount>( _customerAccountFactory, this.crudFormButtonsService );
    }
}
