import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { StockNotesSource } from "../../model/entity/stock-notes-source";
import { StockNotesSourceController } from './stock-notes-source-controller';
import { StockNotesSourceStateStore } from './stock-notes-source-state-store';
import { StockNotesSourceFactory } from '../../model/factory/stock-notes-source.factory';
import { StockNotesSourceCrudService } from '../../service/crud/stock-notes-source-crud.service';

/**
 * Button panel component for the StockAnalystConsensus dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-notes-source-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class StockNotesSourceFormButtonsComponent extends CrudFormButtonsComponent<StockNotesSource>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockNotesSourceStateStore} stockNotesSourceStateStore
     * @param {StockNotesSourceController} stockNotesSourceController
     * @param {StockNotesSourceFactory} stockNotesSourceFactory
     * @param {StockNotesSourceCrudService} stockNotesSourceCrudService
     */
    constructor( protected toaster: ToastsManager,
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

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage(): string
    {
        return 'Are you sure you want to delete?';
    }

    /**
     * @return {undefined}
     */
    public getDeleteKeyword(): string
    {
        return 'Notes Source'
    }
}
