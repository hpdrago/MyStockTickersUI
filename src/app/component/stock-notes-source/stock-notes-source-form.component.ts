import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { SessionService } from "../../service/session.service";
import { StockNotesSource } from "../../model/entity/stock-notes-source";
import { StockNotesSourceStateStore } from './stock-notes-source-state-store';
import { StockNotesSourceController } from './stock-notes-source-controller';
import { StockNotesSourceFactory } from '../../model/factory/stock-notes-source.factory';
import { StockNotesSourceCrudService } from '../../service/crud/stock-notes-source-crud.service';

/**
 * This is the StockCompany Notes Source Form Component class.
 *
 * Created by mike on 10/17/2017.
 */
@Component
({
    selector: 'stock-notes-source-form',
    styleUrls: ['../crud/form/crud-form.component.css'],
    templateUrl: './stock-notes-source-form.component.html'
})
export class StockNotesSourceFormComponent extends CrudFormComponent<StockNotesSource>
{
    /**
     * Constructor.
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {StockNotesSourceStateStore} stockNotesSourceStateStore
     * @param {StockNotesSourceController} stockNotesSourceController
     * @param {StockNotesSourceFactory} stockNotesSourceFactory
     * @param {StockNotesSourceCrudService} stockNotesSourceCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
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

    /**
     * Creates and identifies the fields for the FormGroup instance for the stock notes form.
     * @return {FormGroup}
     */
    protected createFormGroup(): FormGroup
    {
        this.debug( "initializeForm " );
        var stockNoteForm: FormGroup = this.formBuilder.group(
            {
                'name':     new FormControl( this.modelObject.name, Validators.required )
            } );
        return stockNoteForm;
    }
}

