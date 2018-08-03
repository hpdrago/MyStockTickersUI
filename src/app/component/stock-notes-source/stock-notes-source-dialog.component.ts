import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotesSource } from "../../model/entity/stock-notes-source";
import { StockNotesSourceFactory } from '../../model/factory/stock-notes-source.factory';
import { StockNotesSourceController } from './stock-notes-source-controller';
import { StockNotesSourceStateStore } from './stock-notes-source-state-store';
import { StockNotesSourceCrudService } from '../../service/crud/stock-notes-source-crud.service';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-notes-source-dialog',
    templateUrl: './stock-notes-source-dialog.component.html'
})
export class StockNotesSourceDialogComponent extends CrudDialogComponent<StockNotesSource>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockNotesSourceStateStore} stockNotesSourceStateStore
     * @param {StockNotesSourceController} stockNotesSourceController
     * @param {StockNotesSourceFactory} stockNotesSourceFactory
     * @param {StockNotesSourceCrudService} stockNotesSourceCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private stockNotesSourceStateStore: StockNotesSourceStateStore,
                 private stockNotesSourceController: StockNotesSourceController,
                 private stockNotesSourceFactory: StockNotesSourceFactory,
                 private stockNotesSourceCrudService: StockNotesSourceCrudService )
    {
        super( changeDetector,
               toaster,
               stockNotesSourceStateStore,
               stockNotesSourceController,
               stockNotesSourceFactory,
               stockNotesSourceCrudService );
    }
}
