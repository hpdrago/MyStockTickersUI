import { CrudTableButtonsComponent } from "../common/crud-table-buttons.component";
import { Stock } from "../../model/class/stock";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SessionService } from "../../service/session.service";

/**
 * Created by mike on 1/2/2017.
 */
@Component({
    selector: 'stock-table-buttons',
    templateUrl: '../common/crud-table-buttons.component.html',
    inputs: ['crudTableButtonsService']
})
export class StockTableButtonsComponent extends CrudTableButtonsComponent<Stock>
{
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService )
    {
        super( toaster );
    }

    /**
     * Determines if the Delete button should be disabled.
     * It should be disabled when no portfolio is selected
     * @returns {boolean}
     */
    protected isDeleteButtonDisabled(): boolean
    {
        //this.logger.debug( "isDeleteButtonDisabled " + JSON.stringify( this.modelObject ) );
        var disabled = true;
        if ( this.modelObject != null &&
             this.modelObject.userEntered &&
             this.sessionService.getLoggedInUserId() == this.modelObject.createdBy )
        {
            //this.logger.debug( "isDeleteButtonDisabled false" );
            disabled = false;
        }
        return disabled;
    }
}

