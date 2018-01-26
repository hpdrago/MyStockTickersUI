import { CrudTableButtonComponent } from './crud-table-button.component';
import { ModelObject } from '../../../model/common/model-object';
import { ToastsManager } from 'ng2-toastr';
import { CrudStateStore } from '../common/crud-state-store';
import { CrudController } from '../common/crud-controller';
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';
import { isNullOrUndefined } from 'util';
import { ChangeDetectorRef } from '@angular/core';

/**
 * Delete button for standard CRUD based table
 */
export abstract class CrudTableDeleteButtonComponent<T extends ModelObject<T>> extends CrudTableButtonComponent<T>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {CrudController<T extends ModelObject<T>>} crudController
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudRestService<T extends ModelObject<T>>} crudRestService
     */
    protected constructor( protected changeDetector: ChangeDetectorRef,
                           protected toaster: ToastsManager,
                           protected crudStateStore: CrudStateStore<T>,
                           protected crudController: CrudController<T>,
                           protected modelObjectFactory: ModelObjectFactory<T>,
                           protected crudRestService: CrudRestService<T> )
    {
        super( changeDetector,
               toaster,
               crudStateStore,
               crudController,
               modelObjectFactory,
               crudRestService );
    }

    public ngOnInit(): void
    {
        super.ngOnInit();
        this.buttonLabel = 'Delete';
        this.buttonIcon = 'fa fa-trash';
    }

    protected onButtonClick(): void
    {
        this.debug( "onDeleteButtonClick " + JSON.stringify( this.selectedModelObject ));
        this.crudController
            .sendTableDeleteButtonClickedEvent( this.selectedModelObject );
    }

    public get buttonDisabled(): boolean
    {
        return isNullOrUndefined( this.selectedModelObject );
    }
}
