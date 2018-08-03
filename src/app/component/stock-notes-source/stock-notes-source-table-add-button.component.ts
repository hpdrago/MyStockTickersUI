import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { StockNotesSourceStateStore } from './stock-notes-source-state-store';
import { StockNotesSourceController } from './stock-notes-source-controller';
import { StockNotesSourceCrudService } from '../../service/crud/stock-notes-source-crud.service';
import { StockNotesSourceFactory } from '../../model/factory/stock-notes-source.factory';
import { StockNotesSource } from '../../model/entity/stock-notes-source';

@Component
({
     selector: 'stock-notes-source-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockNotesSourceTableAddButtonComponent extends CrudTableAddButtonComponent<StockNotesSource>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {StockNotesSourceStateStore} stockNotesSourceStateStore
     * @param {StockNotesSourceController} stockNotesSourceController
     * @param {StockNotesSourceFactory} stockNotesSourceFactory
     * @param {StockNotesSourceCrudService} stockNotesSourceCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected stockNotesSourceStateStore: StockNotesSourceStateStore,
                 protected stockNotesSourceController: StockNotesSourceController,
                 protected stockNotesSourceFactory: StockNotesSourceFactory,
                 protected stockNotesSourceCrudService: StockNotesSourceCrudService )
    {
        super( changeDetector,
               toaster,
               stockNotesSourceStateStore,
               stockNotesSourceController,
               stockNotesSourceFactory,
               stockNotesSourceCrudService );
    }
}
