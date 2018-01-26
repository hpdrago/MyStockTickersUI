import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'tradeit-account-dialog',
    templateUrl: './tradeit-account-dialog.component.html'
})
export class TradeItAccountDialogComponent extends CrudDialogComponent<TradeItAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItAccountCrudServiceContainer} customerAccountCrudServiceContainer
     */
    constructor( protected toaster: ToastsManager,
                 private customerAccountCrudServiceContainer: TradeItAccountCrudServiceContainer )
    {
        super( toaster, customerAccountCrudServiceContainer );
    }
}
