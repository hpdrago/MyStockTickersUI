import { CrudTableButtonComponent } from './crud-table-button.component';
import { ModelObject } from '../../../model/common/model-object';
import { ToastsManager } from 'ng2-toastr';
import { CrudStateStore } from '../common/crud-state-store';
import { CrudController } from '../common/crud-controller';
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';
import { ChangeDetectorRef } from '@angular/core';

/**
 * Add button for standard CRUD based table
 */
export abstract class CrudTableAddButtonComponent<T extends ModelObject<T>> extends CrudTableButtonComponent<T>
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
        this.buttonLabel = 'Add';
        this.buttonIcon = 'fa-plus';
    }

    /**
     * Button click method.
     */
    protected onButtonClick(): void
    {
        this.debug( "onButtonClick " );
        this.crudController
            .sendTableAddButtonClickedEvent();
    }
}
