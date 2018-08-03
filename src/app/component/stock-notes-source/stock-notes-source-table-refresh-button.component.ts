/**
 * Created by mike on 3/10/2018
 */
import { StockNotesSource } from '../../model/entity/stock-notes-source';
import { ChangeDetectorRef, Component } from '@angular/core';
import { StockNotesSourceCrudService } from '../../service/crud/stock-notes-source-crud.service';
import { StockNotesSourceController } from './stock-notes-source-controller';
import { StockNotesSourceStateStore } from './stock-notes-source-state-store';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableRefreshButtonComponent } from '../crud/table/crud-table-refresh-button.component';
import { StockNotesSourceFactory } from '../../model/factory/stock-notes-source.factory';

@Component
({
    selector: 'stock-notes-source-table-refresh-button',
    templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockNotesSourceTableRefreshButtonComponent extends CrudTableRefreshButtonComponent<StockNotesSource>
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
