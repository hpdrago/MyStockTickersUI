import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";
import { Customer } from "../../model/entity/customer";
import { CustomerFactory } from "../../model/factory/customer.factory";
import { CustomerCrudService } from "../../service/crud/customer-crud.service";
import { CrudDialogService } from "../crud/dialog/crud-dialog.service";

/**
 * This is the service container for the Customer entity.
 *
 * Created 12/4/2017
 */
@Injectable()
export class CustomerCrudServiceContainer extends CrudServiceContainer<Customer>
{
    constructor( private _customerFactory: CustomerFactory,
                 private _customerCrudService: CustomerCrudService )
    {
        super( new ModelObjectChangeService<Customer>(), _customerFactory, _customerCrudService )
        this.crudDialogService = new CrudDialogService<Customer>( this._customerFactory,
                                                                   this.crudFormButtonsService );
        this.crudPanelService = this.crudDialogService;
    }

    get CustomerFactory(): CustomerFactory { return this._customerFactory; }

    set CustomerFactory( value: CustomerFactory ) { this._customerFactory = value; }

    get CustomerCrudService(): CustomerCrudService { return this._customerCrudService; }

    set CustomerCrudService( value: CustomerCrudService ) { this._customerCrudService = value; }

}
