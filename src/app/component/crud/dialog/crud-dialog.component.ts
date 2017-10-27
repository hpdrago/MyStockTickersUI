import { ToastsManager } from "ng2-toastr";
import { Input } from "@angular/core";
import { CrudServiceContainer } from "../common/crud-service-container";
import { BaseCrudComponent } from "../common/base-crud.component";
import { ModelObject } from "../../../model/entity/modelobject";
import { DisplayDialogRequestSubjectInfo } from "./display-dialog-request-subject-info";
import { CrudOperation } from "../common/crud-operation";
import { isNullOrUndefined } from "util";
import { CloseButtonEvent } from "../common/close-button-event";
/**
 * This is the base class for Modal dialogs that provide CRUD operations on a model object.
 *
 * Created by mike on 12/30/2016.
 */
export class CrudDialogComponent<T extends ModelObject<T>> extends BaseCrudComponent<T>
{
    /**
     * Controls the visibility of the dialog
     */
    protected displayDialog: boolean;

    constructor( protected toaster: ToastsManager,
                 protected crudServiceContainer: CrudServiceContainer<T> )
    {
        super( toaster );
    }

    public ngOnInit()
    {
        this.log( "ngOnInit.begin" );
        if ( !this.crudServiceContainer.crudDialogService )
        {
            throw new Error( "crudDialogService argument cannot be null" );
        }
        if ( !this.crudServiceContainer.crudFormService )
        {
            throw new Error( "crudFormService argument cannot be null" );
        }
        if ( !this.crudServiceContainer.crudFormButtonsService )
        {
            throw new Error( "crudButtonsService argument cannot be null" );
        }
        this.subscribeToCrudDialogServiceEvents();
        this.crudServiceContainer
            .crudFormService
            .subscribeToComponentInitializedEvent( ()=> this.formInitialized() );
        this.crudServiceContainer
            .crudFormButtonsService
            .subscribeToComponentInitializedEvent( ()=> this.formButtonsInitialized() );
        // Tell everyone that we are done
        this.crudServiceContainer
            .crudDialogService
            .sendComponentInitializedEvent();
        this.log( "ngOnInit.end" );
    }

    /**
     * This method is called when the dialog receives notification that the form has completed initializing.
     * We will then send the model object and crud operation back to the form that we have received previously via
     * the display dialog event.
     */
    private formInitialized()
    {
        this.debug( "formInitialized sending model object and crud operation to form" );
        this.crudServiceContainer
            .crudFormService
            .sendCrudOperationChangedEvent( this.crudOperation );
        this.crudServiceContainer
            .crudFormService
            .sendModelObjectChangedEvent( this.modelObject );
    }

    /**
     * This method is called when the dialog receives notification that the form buttons has completed initializing.
     * We will then send the model object and crud operation back to the form that we have received previously via
     * the display dialog event.
     */
    private formButtonsInitialized()
    {
        this.debug( "formButtonsInitialized sending model object and crud operation to form buttons" );
        this.crudServiceContainer
            .crudFormButtonsService
            .sendCrudOperationChangedEvent( this.crudOperation );
        this.crudServiceContainer
            .crudFormButtonsService
            .sendModelObjectChangedEvent( this.modelObject,   );
    }

    /**
     * Subscribe to the events that will be initiated by the parent container.
     */
    protected subscribeToCrudDialogServiceEvents()
    {
        this.log( "subscribeToCrudDialogServiceEvents.begin" );
        this.crudServiceContainer
            .crudDialogService
            .subscribeToCloseButtonClickedEvent(( event: CloseButtonEvent ) => this.onCloseButtonClick( event ) );
        this.crudServiceContainer
            .crudDialogService
            .subscribeToDisplayDialogRequestEvent(( subjectInfo: DisplayDialogRequestSubjectInfo ) => this.setDisplayDialog( subjectInfo ) );
        this.crudServiceContainer
            .crudDialogService
            .subscribeToCrudOperationChangeEvent(( crudOperation: CrudOperation ) => this.crudOperationChanged( crudOperation ) );
        this.crudServiceContainer
            .crudDialogService
            .subscribeToModelObjectChangedEvent(( modelObject: T ) => this.modelObjectChanged( modelObject ) );
        this.crudServiceContainer
            .crudFormButtonsService
            .subscribeToAddButtonClickedEvent( ( modelObject ) => this.onAddButtonClicked( modelObject ) )
        this.crudServiceContainer
            .crudFormButtonsService
            .subscribeToContinuousAddButtonClickedEvent(( modelObject ) => this.onContinuousAddButtonClicked( modelObject ) )
        this.crudServiceContainer
            .crudFormButtonsService
            .subscribeToSaveButtonClickedEvent( ( modelObject ) => this.onSaveButtonClicked( modelObject ) )
        this.crudServiceContainer
            .crudFormButtonsService
            .subscribeToHandleDeleteButtonClickedEvent(( modelObject ) => this.onDeleteButtonClicked( modelObject ) )
        this.log( "subscribeToCrudDialogServiceEvents.end" );
    }

    /**
     * Set the display dialog flag which will hide or display the dialog.
     *
     * @param displayDialog
     */
    protected setDisplayDialog( subjectInfo: DisplayDialogRequestSubjectInfo ): void
    {
        this.debug( "setDisplayDialog.begin " + JSON.stringify( subjectInfo ) );
        if ( !isNullOrUndefined( subjectInfo ) )
        {
            if ( isNullOrUndefined( subjectInfo.modelObject ) )
            {
                this.debug( "setDisplayDialog model objects is null or not defined" );
            }
            else
            {
                this.setModelObject( subjectInfo.modelObject );
                this.setCrudOperation( subjectInfo.crudOperation );
                /*
                 * Tell the buttons and form of the changes
                 */
                this.debug( "Sending events to Form" );
                this.crudServiceContainer
                    .crudFormService
                    .sendCrudOperationChangedEvent( subjectInfo.crudOperation );
                this.crudServiceContainer
                    .crudFormService
                    .sendModelObjectChangedEvent( subjectInfo.modelObject );
                this.debug( "Sending events to Form Buttons" );
                this.crudServiceContainer
                    .crudFormButtonsService
                    .sendCrudOperationChangedEvent( subjectInfo.crudOperation );
                this.crudServiceContainer
                    .crudFormButtonsService
                    .sendModelObjectChangedEvent( subjectInfo.modelObject );
                this.displayDialog = true;
            }
        }
        this.debug( "setDisplayDialog.end" );
    }

    /**
     * This method is called when the Close button is clicked.
     * It will close the dialog and emit a {@code closeButtonClick} event
     */
    protected onCloseButtonClick( event: CloseButtonEvent ): void
    {
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.debug( "onCloseButtonClick " + JSON.stringify( event ) );
            this.displayDialog = false;
        }
    }

    /**
     * This method is called when the Add button (labeled "Save") is clicked.
     *
     * @param modelObject
     */
    protected onAddButtonClicked( modelObject: T )
    {
        this.debug( "onAddButtonClick " + JSON.stringify( modelObject ) );
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.onCloseButtonClick( CloseButtonEvent.ADD_BUTTON );
        }
    }

    /**
     * This method is called when the Add and continue button (labeled "Save & Add another") is clicked.
     *
     * @param modelObject
     */
    protected onContinuousAddButtonClicked( modelObject: T )
    {
        this.debug( "onContinuousAddButtonClicked " + JSON.stringify( modelObject ) );
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.setModelObject( this.crudServiceContainer.modelObjectFactory.newModelObject() );
        }
    }

    /**
     * This method is called when the save button is clicked.  All observers of this event will be notified.
     * @param modelObject
     */
    private onSaveButtonClicked( modelObject: any )
    {
        this.debug( "onSaveButtonClick " + JSON.stringify( modelObject ) );
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.onCloseButtonClick( CloseButtonEvent.SAVE_BUTTON );
        }
    }

    /**
     * This method is called when the delete button is clicked.  All observers of this event will be notified.
     * @param modelObject
     */
    private onDeleteButtonClicked( modelObject: T )
    {
        this.debug( "onDeleteButtonClick " + JSON.stringify( modelObject ) );
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.displayDialog = false;
        }
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     */
    protected getDuplicateKeyErrorMessage(): string
    {
        return "This entry already exists";
    }
}
