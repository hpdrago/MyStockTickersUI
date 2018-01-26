import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { Stock } from "../../model/entity/stock";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SessionService } from "../../service/session.service";
import { isNullOrUndefined } from "util";
import { StockFactory } from '../../model/factory/stock.factory';
import { StockController } from './stock-controller';
import { StockStateStore } from './stock-crud-state-store';

/**
 * Created by mike on 1/2/2017.
 */
@Component({
    selector:    'stock-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class StockTableButtonsComponent extends CrudTableButtonsComponent<Stock>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {StockStateStore} stockStateStore
     * @param {StockController} stockController
     * @param {StockFactory} stockFactory
     */
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private stockStateStore: StockStateStore,
                 private stockController: StockController,
                 private stockFactory: StockFactory )
    {
        super( toaster,
               stockStateStore,
               stockController,
               stockFactory );
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
        if ( !isNullOrUndefined( this.modelObject ) &&
             this.sessionService.getLoggedInUserId() == this.modelObject.createdBy )
        {
            //this.logger.debug( "isDeleteButtonDisabled false" );
            disabled = false;
        }
        return disabled;
    }
}

