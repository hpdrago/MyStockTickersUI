import { ToastsManager } from "ng2-toastr";
import { CrudServiceContainer } from "../common/crud-service-container";
import { ModelObject } from "../../../model/entity/modelobject";
import { BaseCrudComponent } from "../common/base-crud.component";
import { OnInit } from "@angular/core";
import { CrudOperation } from "../common/crud-operation";
import { ModelObjectCrudOperationSubjectInfo } from "../dialog/modelobject-crudoperation-subject-info";

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
        this.log( "CurdPanelComponent.ngOnInit.begin" );
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
        this.sendComponentInitializedEvent();
        this.log( "CurdPanelComponent.ngOnInit.end" );
    }

    /**
     * This method is called to set the model object and crud operation.
     * @param {T} modelObject
     * @param {CrudOperation} crudOperation
     */
    protected displayModelObject( modelObject: T, crudOperation: CrudOperation )
    {
        this.setModelObject( modelObject );
        this.setCrudOperation( crudOperation );
        var subjectInfo: ModelObjectCrudOperationSubjectInfo = new ModelObjectCrudOperationSubjectInfo();
        subjectInfo.crudOperation = crudOperation;
        subjectInfo.modelObject = modelObject;

        /*
         * Tell the buttons and form of the changes
         */
        this.debug( "Sending crud operation and modelObject to Form" );
        this.crudServiceContainer
            .crudFormService
            .sendModelObjectCrudOperationChangedEvent( subjectInfo );
        this.debug( "Sending crud operation and modelObject to the form buttons" );
        this.crudServiceContainer
            .crudFormButtonsService
            .sendCrudOperationChangedEvent( subjectInfo.crudOperation );
        this.crudServiceContainer
            .crudFormButtonsService
            .sendModelObjectChangedEvent( subjectInfo.modelObject );
        this.crudServiceContainer
            .crudFormService
            .sendFormPrepareToDisplayEvent();
    }

    /**
     * This method is called at the end of ngOnInit to notify listeners that the component has been initialized.
     * Subclasses that override ngOnInit should override this method as well and have it wait on a subject to indicate
     * when the component has completed initialization.
     */
    protected sendComponentInitializedEvent()
    {
        this.crudServiceContainer
            .crudDialogService
            .sendComponentInitializedEvent();
    }

    /**
     * Subscribes to the events received from the CrudFormButtonsService
     */
    protected subscribeToCrudPanelServiceEvents(): void
    {
        this.debug( "subscribeToCrudPanelServiceEvents.begin" );
        this.debug( "subscribeToCrudPanelServiceEvents.end" );
    }

    /**
     * Subscribes to the events received from the CrudFormService
     */
    protected subscribeToCrudFormServiceEvents(): void
    {
        this.debug( "subscribeToCrudFormServiceEvents.begin" );
        /**
         * Subscribe to error notifications from child components
         */
        /*
        this.addSubscription(
            this.crudServiceContainer
            .crudFormService
            .subscribeToCrudOperationError(( errorMessage: string ) => this.reportRestError( errorMessage )));
            */
        this.debug( "subscribeToCrudFormServiceEvents.end" );
    }

    protected onSubmit(): void
    {
        this.debug( "onSubmit " + JSON.stringify( this.modelObject ));
    }
}
