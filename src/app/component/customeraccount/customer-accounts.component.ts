import { Component, OnInit, ViewChild } from "@angular/core";
import { CustomerPanelComponent } from "../customer/customer-panel.component";
import { SessionService } from "../../service/session.service";
import { ToastsManager } from "ng2-toastr";
import { CustomerAccountPanelComponent } from "./customer-account-panel.component";
import { CustomerAccount } from "../../model/entity/customer-account";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";
import { BaseCrudComponent } from "../crud/common/base-crud.component";

/**
 * Created by mike on 10/8/2016.
 */
@Component(
    {
        selector:    'customer-accounts',
        templateUrl: './customer-accounts.component.html'
    })
export class CustomerAccountsComponent extends BaseCrudComponent<CustomerAccount> implements OnInit
{
    @ViewChild(CustomerAccountPanelComponent)
    private customerAccountPanel: CustomerAccountPanelComponent;
    private customerAccount: CustomerAccount;

    constructor( protected toaster: ToastsManager,
                 private sessionService: SessionService,
                 private customerAccountCrudServiceContainer: CustomerAccountCrudServiceContainer )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
        this.customerAccountCrudServiceContainer
            .crudTableButtonsService
            .subscribeToModelObjectChangedEvent( (modelObject) => this.setModelObject( modelObject ) );
        this.customerAccountCrudServiceContainer
            .crudTableButtonsService
            .subscribeToCrudOperationChangeEvent( (crudOperation) => this.setCrudOperation( crudOperation ) );
    }

}
