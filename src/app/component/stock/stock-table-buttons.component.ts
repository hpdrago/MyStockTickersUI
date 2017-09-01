import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { Stock } from "../../model/entity/stock";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SessionService } from "../../service/session.service";
import { StockTableButtonsService } from "./stock-table-buttons.service";

/**
 * Created by mike on 1/2/2017.
 */
@Component({
    selector: 'stock-table-buttons',
    styleUrls: ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class StockTableButtonsComponent extends CrudTableButtonsComponent<Stock>
{
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 protected stockTableButtonsService: StockTableButtonsService )
    {
        super( toaster, stockTableButtonsService );
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
