import { Input, OnInit } from "@angular/core";
import { CrudOperation } from "./crud-operation";
import { BaseCrudComponent } from "./base-crud.component";
import { CrudFormService } from "./crud-form.service";
import { ModelObject } from "../../model/class/modelobject";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsService } from "./crud-form-buttons.service";

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
     * C O N S T R U C T O R
     */
    constructor( protected toaster: ToastsManager,
                 /**
                  * The CRUD Panel Service provides message and information passing between the panel and the parent container
                  */
                 protected crudFormButtonsService: CrudFormButtonsService<T>,
                 /**
                  * The CRUD Form Service provides message and information passing between the form and the parent panel
                  */
                 protected crudFormService: CrudFormService<T> )
    {
        super( toaster );
    }

    /**
     * Initialize the class
     */
    public ngOnInit()
    {
        if ( !this.crudFormButtonsService )
        {
            throw new Error( "crudFormButtonsService has not been set by Input value" );
        }
        if ( !this.crudFormService )
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
        this.crudFormButtonsService.subscribeToModelObjectChangedEvent(( modelObject: T ) =>
                                                                        this.modelObjectChanged( modelObject ) );
        this.crudFormButtonsService.subscribeToCrudOperationChangeEvent(( crudOperation: CrudOperation ) =>
                                                                          this.crudOperationChanged( crudOperation ) );
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
        this.crudFormService.subscribeToCrudOperationError(( errorMessage: string ) => this.reportRestError( errorMessage ));
        this.debug( "subscribeToCrudFormServiceEvents.end" );
    }

    /**
     * This method is called whenever the model object changes.
     * @param modelObject
     * @override
     */
    protected modelObjectChanged( modelObject: T ): void
    {
        super.modelObjectChanged( modelObject );
        this.crudFormService.sendModelObjectChangedEvent( this.modelObject );
    }

    /**
     * This method is called whenever the crudOperation changes.
     * @param crudOperation
     * @override
     */
    protected crudOperationChanged( crudOperation: CrudOperation ): void
    {
        super.crudOperationChanged( crudOperation );
        this.crudFormService.sendCrudOperationChangedEvent( this.crudOperation );
    }

    protected onSubmit(): void
    {
        this.debug( "onSubmit " + JSON.stringify( this.modelObject ));
    }
}
