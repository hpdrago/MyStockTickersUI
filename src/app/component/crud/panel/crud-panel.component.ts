import { ToastsManager } from "ng2-toastr";
import { CrudServiceContainer } from "../common/crud-service-container";
import { ModelObject } from "../../../model/entity/modelobject";
import { BaseCrudComponent } from "../common/base-crud.component";
import { OnInit } from "@angular/core";
import { CrudOperation } from "../common/crud-operation";

/**
 * This is a Panel class that contains a CRUD Form component {@code CrudFormComponent}
 *
 * @param <T> Read Model Type and Search Criteria
 *
 * inputs: ['crudButtonsService', 'crudDialogService']
 *
 * Created by mike on 11/27/2016.
 */
export abstract class CrudPanelComponent<T extends ModelObject<T>>
    extends BaseCrudComponent<T>
    implements OnInit
{


    /**
     * C O N S T R U C T O R
     */
    constructor( protected toaster: ToastsManager,
                 protected crudServiceContainer: CrudServiceContainer<T> )
    {
        super( toaster );
    }

    /**
     * Initialize the class
     */
    public ngOnInit()
    {
        if ( !this.crudServiceContainer.crudFormButtonsService )
        {
            throw new Error( "crudButtonsService has not been set by Input value" );
        }
        if ( !this.crudServiceContainer.crudFormService )
        {
            throw new Error( "crudFormService has not been set by Input value" );
        }
        this.subscribeToCrudFormServiceEvents();
        this.subscribeToCrudPanelServiceEvents();
    }

    /**
     * Subscribes to the events received from the CrudFormButtonsService
     */
    private subscribeToCrudPanelServiceEvents(): void
    {
        this.debug( "subscribeToCrudPanelServiceEvents.begin" );
        this.addSubscription( this.crudServiceContainer
            .crudFormButtonsService
            .subscribeToModelObjectChangedEvent(( modelObject: T ) => this.onModelObjectChanged( modelObject ) ));
        this.addSubscription( this.crudServiceContainer
            .crudFormButtonsService
            .subscribeToCrudOperationChangeEvent( ( crudOperation: CrudOperation ) => this.onCrudOperationChanged( crudOperation ) ));
        this.debug( "subscribeToCrudPanelServiceEvents.end" );
    }

    /**
     * Subscribes to the events received from the CrudFormService
     */
    private subscribeToCrudFormServiceEvents(): void
    {
        this.debug( "subscribeToCrudFormServiceEvents.begin" );
        /**
         * Subscribe to error notifications from child components
         */
        this.addSubscription(
            this.crudServiceContainer
            .crudFormService
            .subscribeToCrudOperationError(( errorMessage: string ) => this.reportRestError( errorMessage )));
        this.debug( "subscribeToCrudFormServiceEvents.end" );
    }

    /**
     * This method is called whenever the model object changes.
     * @param modelObject
     * @override
     */
    protected onModelObjectChanged( modelObject: T ): void
    {
        super.onModelObjectChanged( modelObject );
        this.crudServiceContainer
            .crudFormService
            .sendModelObjectChangedEvent( this.modelObject );
    }

    /**
     * This method is called whenever the crudOperation changes.
     * @param crudOperation
     * @override
     */
    protected onCrudOperationChanged( crudOperation: CrudOperation ): void
    {
        super.onCrudOperationChanged( crudOperation );
        this.crudServiceContainer
            .crudFormService
            .sendCrudOperationChangedEvent( this.crudOperation );
    }

    protected onSubmit(): void
    {
        this.debug( "onSubmit " + JSON.stringify( this.modelObject ));
    }
}
