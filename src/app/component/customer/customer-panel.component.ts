import { CrudPanelComponent } from "../crud/panel/crud-panel.component";
import { Customer } from "../../model/entity/customer";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SessionService } from "../../service/session.service";
import { CustomerController } from './customer-controller';
import { CustomerFactory } from '../../model/factory/customer.factory';

/**
 * This is the customer form panel.
 * Created 12/4/2017
 */
@Component( {
                selector: 'customer-panel',
                templateUrl: './customer-panel.component.html'
            } )
export class CustomerPanelComponent extends CrudPanelComponent<Customer>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param customerStateStore
     * @param CustomerStateStore
     * @param {CustomerController} customerController
     * @param {CustomerFactory} customerFactory
     */
    constructor( protected toaster: ToastsManager,
                 private sessionService: SessionService,
                 private customerStateStore, CustomerStateStore,
                 private customerController: CustomerController,
                 private customerFactory: CustomerFactory )
    {
        super( toaster,
               customerStateStore,
               customerController,
               customerFactory );
    }

    public ngOnInit(): void
    {
        super.ngOnInit();
        this.displayModelObject();
    }

}
