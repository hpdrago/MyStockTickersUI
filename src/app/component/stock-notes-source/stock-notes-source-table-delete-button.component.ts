import { CrudTableDeleteButtonComponent } from '../crud/table/crud-table-delete-button.component';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { StockNotesSource } from '../../model/entity/stock-notes-source';
import { StockNotesSourceCrudService } from '../../service/crud/stock-notes-source-crud.service';
import { StockNotesSourceFactory } from '../../model/factory/stock-notes-source.factory';
import { StockNotesSourceController } from './stock-notes-source-controller';
import { StockNotesSourceStateStore } from './stock-notes-source-state-store';

@Component
({
     selector: 'stock-notes-source-table-delete-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockNotesSourceTableDeleteButtonComponent extends CrudTableDeleteButtonComponent<StockNotesSource>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {StockNotesSourceStateStore} stockNotesSourceStateStore
     * @param {StockNotesSourceController} stockNotesSourceController
     * @param {StockNotesSourceFactory} stockNotesSourceFactory
     * @param {StockNotesSourceCrudService} stockNotesSourceCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private session: SessionService,
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
