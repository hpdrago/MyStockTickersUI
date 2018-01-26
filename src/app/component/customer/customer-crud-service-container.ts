import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
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
    /**
     * Constructor.
     * @param {CustomerFactory} _customerFactory
     * @param {CustomerCrudService} _customerCrudService
     */
    constructor( private _customerFactory: CustomerFactory,
                 private _customerCrudService: CustomerCrudService )
    {
        super( _customerFactory, _customerCrudService )
        this.crudDialogService = new CrudDialogService<Customer>( this._customerFactory,
                                                                  this.crudStateStore,
                                                                  this.crudFormButtonsService );
        this.crudPanelService = this.crudDialogService;
    }

    get CustomerFactory(): CustomerFactory { return this._customerFactory; }

    set CustomerFactory( value: CustomerFactory ) { this._customerFactory = value; }

    get CustomerCrudService(): CustomerCrudService { return this._customerCrudService; }

    set CustomerCrudService( value: CustomerCrudService ) { this._customerCrudService = value; }

}
