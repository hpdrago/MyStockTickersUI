import { ToastsManager } from "ng2-toastr";
import { ModelObject } from "../../../model/common/model-object";
import { BaseCrudComponent } from "../common/base-crud.component";
import { OnInit } from "@angular/core";
import { CrudStateStore } from '../common/crud-state-store';
import { CrudController } from '../common/crud-controller';
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';

/**
 * This is a Panel class that contains a CRUD Form component {@code CrudFormComponent}
 *
 * @param <T> Read Model Type and Search Criteria
 *
 * Created by mike on 11/27/2016.
 */
export abstract class CrudPanelComponent<T extends ModelObject<T>>
    extends BaseCrudComponent<T>
    implements OnInit
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {CrudController<T extends ModelObject<T>>} crudController
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudRestService<T extends ModelObject<T>>} crudRestService
     */
    constructor( protected toaster: ToastsManager,
                 protected crudStateStore: CrudStateStore<T>,
                 protected crudController: CrudController<T>,
                 protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudRestService: CrudRestService<T> )
    {
        super( toaster,
               crudStateStore,
               crudController,
               modelObjectFactory,
               crudRestService );
    }

    /**
     * Initialize the class
     */
    public ngOnInit()
    {
        this.log( "CrudPanelComponent.ngOnInit.begin" );
        super.ngOnInit();
        this.subscribeToCrudPanelServiceEvents();
        this.log( "CurdPanelComponent.ngOnInit.end" );
    }

    /**
     * Subscribes to the events received from the CrudFormButtonsService
     */
    protected subscribeToCrudPanelServiceEvents(): void
    {
        const methodName = 'subscribeToCrudPanelServiceEvents';
        this.debug( methodName + ".begin" );
        this.addSubscription( 'subscribeToCancelButtonClickedEvent',
            this.crudController
                .subscribeToPanelCancelButtonClickedEvent( () => this.cancelButtonClicked() ));
        this.debug( methodName + ".end" );
    }

    protected onSubmit(): void
    {
        this.debug( "onSubmit " + JSON.stringify( this.modelObject ));
    }

    /**
     * This method is called when the cancel button is clicked.
     */
    protected cancelButtonClicked()
    {
        this.debug( "cancelButtonClicked" );
        this.resetCrudOperationAndModelObject();
    }

    protected resetPanel()
    {
    }
}
