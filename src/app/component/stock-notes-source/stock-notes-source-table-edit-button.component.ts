/**
 * Created by mike on 3/10/2018
 */
import { Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableEditButtonComponent } from '../crud/table/crud-table-edit-button.component';
import { StockNotesSource } from '../../model/entity/stock-notes-source';
import { StockNotesSourceStateStore } from './stock-notes-source-state-store';
import { StockNotesSourceController } from './stock-notes-source-controller';
import { StockNotesSourceFactory } from '../../model/factory/stock-notes-source.factory';
import { StockNotesSourceCrudService } from '../../service/crud/stock-notes-source-crud.service';

@Component
({
     selector: 'stock-notes-source-table-edit-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockNotesSourceTableEditButtonComponent extends CrudTableEditButtonComponent<StockNotesSource>
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
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private stockNotesSourceStateStore: StockNotesSourceStateStore,
                 private stockNotesSourceController: StockNotesSourceController,
                 private stockNotesSourceFactory: StockNotesSourceFactory,
                 private stockNotesSourceCrudService: StockNotesSourceCrudService )
    {
        super( toaster,
               stockNotesSourceStateStore,
               stockNotesSourceController,
               stockNotesSourceFactory,
               stockNotesSourceCrudService );
    }
}
