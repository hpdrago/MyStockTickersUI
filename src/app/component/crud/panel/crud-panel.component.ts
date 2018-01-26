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
 * Created by mike on 11/27/2016.
 */
export abstract class CrudPanelComponent<T extends ModelObject<T>>
    extends BaseCrudComponent<T>
    implements OnInit
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudServiceContainer<T extends ModelObject<T>>} crudServiceContainer
     */
    constructor( protected toaster: ToastsManager,
                 protected crudServiceContainer: CrudServiceContainer<T> )
    {
        super( toaster, crudServiceContainer.crudStateStore, crudServiceContainer.modelObjectFactory );
    }

    /**
     * Initialize the class
     */
    public ngOnInit()
    {
        this.log( "CrudPanelComponent.ngOnInit.begin" );
        super.ngOnInit();
        if ( !this.crudServiceContainer.crudPanelService )
        {
            throw new Error( "crudPanelService has not been set by Input value" );
        }
        if ( !this.crudServiceContainer.crudFormButtonsService )
        {
            throw new Error( "crudButtonsService has not been set by Input value" );
        }
        if ( !this.crudServiceContainer.crudFormService )
        {
            throw new Error( "crudFormService has not been set by Input value" );
        }
        this.subscribeToCrudFormServiceEvents();
        //this.subscribeToCrudTableServiceEvents();
        this.subscribeToCrudPanelServiceEvents();
        this.sendComponentInitializedEvent();
        this.log( "CurdPanelComponent.ngOnInit.end" );
    }

    /**
     * This method is called to set the model object and crud operation.
     * @param {T} modelObject
     * @param {CrudOperation} crudOperation
     */
    //protected displayModelObject( modelObject: T, crudOperation: CrudOperation )
    protected displayModelObject()
    {
        //this.setModelObject( modelObject );
        //this.setCrudOperation( crudOperation );
        //var subjectInfo: ModelObjectCrudOperationSubjectInfo = new ModelObjectCrudOperationSubjectInfo();
        //subjectInfo.crudOperation = crudOperation;
        //subjectInfo.modelObject = modelObject;

        /*
         * Tell the buttons and form of the changes
         */
        //this.debug( "Sending crud operation and modelObject to Form" );
        //this.crudServiceContainer
        //    .crudFormService
        //    .sendModelObjectCrudOperationChangedEvent( subjectInfo );
        //this.debug( "Sending crud operation and modelObject to the form buttons" );
        //this.crudServiceContainer
        //    .crudFormButtonsService
        //    .sendCrudOperationChangedEvent( subjectInfo.crudOperation );
        //this.crudServiceContainer
        //    .crudFormButtonsService
        //    .sendModelObjectChangedEvent( subjectInfo.modelObject );
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
            .crudPanelService
            .sendComponentInitializedEvent();
    }

    /**
     * Subscribes to the events received from the CrudFormButtonsService
     */
    protected subscribeToCrudPanelServiceEvents(): void
    {
        this.debug( "subscribeToCrudPanelServiceEvents.begin" );
        this.addSubscription( this.crudServiceContainer
                                  .crudPanelService
                                  .subscribeToDisplayFormRequestEvent( () => this.displayModelObject() ));
        this.addSubscription( this.crudServiceContainer
                                  .crudPanelService
                                  .subscribeToCancelButtonClickedEvent( () => this.cancelButtonClicked() ));
        this.debug( "subscribeToCrudPanelServiceEvents.end" );
    }

    /**
     * Subscribes to the events received from the CrudFormService
     */
    protected subscribeToCrudFormServiceEvents(): void
    {
        this.debug( "subscribeToCrudFormServiceEvents.begin" );
        this.addSubscription( this.crudServiceContainer
                                  .crudFormButtonsService
                                  .subscribeToDeleteButtonClickCompletedEvent( modelObject => this.deleteButtonClickCompleted( modelObject ) ));
        this.addSubscription( this.crudServiceContainer
                                  .crudFormButtonsService
                                  .subscribeToSaveButtonClickCompletedEvent( modelObject => this.saveButtonClickCompleted( modelObject ) ));
        this.addSubscription( this.crudServiceContainer
                                  .crudFormButtonsService
                                  .subscribeToAddButtonClickCompletedEvent( modelObject => this.addButtonClickCompleted( modelObject ) ));
        this.debug( "subscribeToCrudFormServiceEvents.end" );
    }

    /**
     * Subscribes to the events received from the CrudTableService
     */
    protected subscribeToCrudTableServiceEvents(): void
    {
        this.debug( "subscribeToCrudTableServiceEvents.begin" );
        /*
        this.addSubscription( this.crudServiceContainer
                                  .crudTableButtonsService
                                  .subscribeToAddButtonClickedEvent( customerAccount => this.setModelObject( customerAccount ) ))
        this.addSubscription( this.crudServiceContainer
                                  .crudTableButtonsService
                                  .subscribeToEditButtonClickedEvent( customerAccount => this.setModelObject( customerAccount ) ))
        this.addSubscription( this.crudServiceContainer
                                  .crudTableButtonsService
                                  .subscribeToDeleteButtonClickedEvent( customerAccount => this.setModelObject( customerAccount ) ))
        this.addSubscription( this.crudServiceContainer
                                  .crudTableButtonsService
                                  .subscribeToCrudOperationChangeEvent( crudOperation => this.setCrudOperation( crudOperation )));
                                  */
        this.debug( "subscribeToCrudTableServiceEvents.end" );
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

    /**
     * This method is called upon the successful completion of deleting a model object.
     * @param customerAccount
     */
    protected deleteButtonClickCompleted( modelObject: T )
    {
        this.debug( "deleteButtonClickCompleted" );
        this.resetPanel();
    }

    /**
     * This method is called upon the successful completion of adding a model object.
     * @param modelObject
     */
    protected addButtonClickCompleted( modelObject: T )
    {
        this.debug( "addButtonClickCompleted" );
        this.resetPanel();
    }

    /**
     * This method is called upon the successful completion of saving a model object.
     * @param modelObject
     */
    protected saveButtonClickCompleted( modelObject: T )
    {
        this.debug( "saveButtonClickCompleted" );
        this.resetPanel();
    }

    /**
     * Resets the model object and the crud operation
     */
    protected resetPanel()
    {
        //this.setCrudOperation( CrudOperation.NONE );
        //this.setModelObject( this.crudServiceContainer.modelObjectFactory.newModelObject() );
    }
}
