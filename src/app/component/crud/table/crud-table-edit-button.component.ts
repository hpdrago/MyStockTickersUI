import { CrudTableButtonComponent } from './crud-table-button.component';
import { ModelObject } from '../../../model/common/model-object';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudController } from '../common/crud-controller';
import { CrudStateStore } from '../common/crud-state-store';
import { ToastsManager } from 'ng2-toastr';
import { isNullOrUndefined } from "util";
import { ChangeDetectorRef } from '@angular/core';

/**
 * Edit button for standard CRUD based table
 */
export abstract class CrudTableEditButtonComponent<T extends ModelObject<T>> extends CrudTableButtonComponent<T>
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
        this.buttonLabel = 'Edit';
        this.buttonIcon = 'fa fa-edit';
    }

    protected onButtonClick(): void
    {
        this.debug( 'onEditButtonClick' );
        this.crudController
            .sendTableEditButtonClickedEvent();
    }

    public get buttonDisabled(): boolean
    {
        let disabled = true;
        if ( !isNullOrUndefined( this.selectedModelObject ) )
        {
            if ( isNullOrUndefined( this.selectedModelObject.getPrimaryKeyValue() ))
            {
                this.logError( "Selected object primary key is null: " + JSON.stringify( this.selectedModelObject ))
            }
            else
            {
                disabled = false;
            }
        }
        return disabled;
    }
}
