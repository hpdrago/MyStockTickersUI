import { Component, ViewChild } from "@angular/core";
import { BaseComponent } from "../common/base.component";
import { CustomerPanelComponent } from "../customer/customer-panel.component";
import { CrudOperation } from "../crud/common/crud-operation";
import { SessionService } from "../../service/session.service";
import { ToastsManager } from "ng2-toastr";

/**
 * Created by mike on 10/8/2016.
 */
@Component(
    {
        selector:    'customer-profile',
        templateUrl: './profile.component.html'
    })
export class ProfileComponent extends BaseComponent
{
    @ViewChild(CustomerPanelComponent)
    private customerPanel: CustomerPanelComponent;

    constructor( protected toaster: ToastsManager,
                 private sessionService: SessionService )
    {
        super( toaster );
    }

}
