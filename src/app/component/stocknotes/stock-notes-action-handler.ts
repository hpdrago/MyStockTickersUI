import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Injectable } from '@angular/core';
import { StockNotes } from '../../model/entity/stock-notes';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class StockNotesActionHandler extends CrudActionHandler<StockNotes>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockNotesCrudService} stockNotesCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockNotesCrudService: StockNotesCrudService )
    {
        super( toaster,
               restErrorReporter,
               stockNotesCrudService );
    }
}
