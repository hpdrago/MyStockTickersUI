import { CrudPanelComponent } from "../crud/panel/crud-panel.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SessionService } from "../../service/session.service";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { CrudOperation } from "../crud/common/crud-operation";

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
    private CrudOperation = CrudOperation;
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 protected customerAccountCrudServiceContainer: TradeItAccountCrudServiceContainer )
    {
        super( toaster, customerAccountCrudServiceContainer );
    }

    public ngOnInit(): void
    {
        super.ngOnInit();
        //this.displayModelObject( this.sessionService.customer, CrudOperation.UPDATE );
    }

}
