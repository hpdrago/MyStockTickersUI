import { Input, OnInit } from "@angular/core";
import { CrudOperation } from "./crud-operation";
import { BaseCrudComponent } from "./base-crud.component";
import { CrudFormService } from "./crud-form.service";
import { ModelObject } from "../../model/base-modelobject";
import { ToastsManager } from "ng2-toastr";
import { CrudPanelButtonsService } from "./crud-panel-buttons.service";

/**
 * This is a Panel class that contains a CRUD Form component {@code CrudFormComponent}
 *
 * @param <T> Read Model Type and Search Criteria
 *
 * inputs: ['crudPanelButtonsService', 'crudDialogService']
 *
 * Created by mike on 11/27/2016.
 */
export abstract class CrudPanelComponent<T extends ModelObject<T>>
    extends BaseCrudComponent<T>
    implements OnInit
{
    /**
     * The CRUD Panel Service provides message and information passing between the panel and the parent container
     */
    @Input()
    protected crudPanelButtonsService: CrudPanelButtonsService<T>;

    /**
     * The CRUD Form Service provides message and information passing between the form and the parent panel
     */
    @Input()
    protected crudFormService: CrudFormService<T>;


    /**
     * C O N S T R U C T O R
     */
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    /**
     * Initialize the class
     */
    public ngOnInit()
    {
        if ( !this.crudPanelButtonsService )
        {
            throw new Error( "crudPanelButtonsService has not been set by Input value" );
        }
        if ( !this.crudFormService )
        {
            throw new Error( "crudFormService has not been set by Input value" );
        }
        this.subscribeToCrudFormServiceEvents();
        this.subscribeToCrudPanelServiceEvents();
    }

    /**
     * Subscribes to the events received from the CrudPanelButtonsService
     */
    private subscribeToCrudPanelServiceEvents(): void
    {
        this.crudPanelButtonsService.handleModelObjectChanged().subscribe( ( modelObject: T ) =>
                                                                        this.modelObjectChanged( modelObject ) );
        this.crudPanelButtonsService.handleCrudOperationChanged().subscribe( ( crudOperation: CrudOperation ) =>
                                                                          this.crudOperationChanged( crudOperation ) );
    }

    /**
     * Subscribes to the events received from the CrudFormService
     */
    private subscribeToCrudFormServiceEvents(): void
    {
        /**
         * Subscribe to error notifications from child components
         */
        this.crudFormService.handleCrudOperationError().subscribe( (errorMessage: string ) => this.reportRestError( errorMessage ));
    }

    /**
     * This method is called whenever the model object changes.
     * @param modelObject
     * @override
     */
    protected modelObjectChanged( modelObject: T ): void
    {
        super.modelObjectChanged( modelObject );
        this.crudFormService.sendModelObjectChanged( this.modelObject );
    }

    /**
     * This method is called whenever the crudOperation changes.
     * @param crudOperation
     * @override
     */
    protected crudOperationChanged( crudOperation: CrudOperation ): void
    {
        super.crudOperationChanged( crudOperation );
        this.crudFormService.sendCrudOperationChanged( this.crudOperation );
    }

    protected onSubmit(): void
    {
        this.debug( "onSubmit " + JSON.stringify( this.modelObject ));
    }
}
