import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";
import { CustomerAccountFactory } from "../../model/factory/customer-account.factory";
import { CustomerAccountCrudService } from "../../service/crud/customer-account-crud.service";
import { CustomerAccount } from "../../model/entity/customer-account";

/**
 * This is the service container for the CustomerAccount entity.
 */
@Injectable()
export class CustomerAccountCrudServiceContainer extends CrudServiceContainer<CustomerAccount>
{
    constructor( private _accountFactory: CustomerAccountFactory,
                 private _accountCrudService: CustomerAccountCrudService )
    {
        super( new ModelObjectChangeService<CustomerAccount>(), _accountFactory, _accountCrudService )
    }

    get accountFactory(): CustomerAccountFactory { return this._accountFactory; }

    set accountFactory( value: CustomerAccountFactory ) { this._accountFactory = value; }

    get accountCrudService(): CustomerAccountCrudService { return this._accountCrudService; }

    set accountCrudService( value: CustomerAccountCrudService ) { this._accountCrudService = value; }

}
