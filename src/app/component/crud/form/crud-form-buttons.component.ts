import { BaseCrudComponent } from "../common/base-crud.component";
import { ModelObject } from "../../../model/entity/modelobject";
import { CrudOperation } from "../common/crud-operation";
import { ToastsManager } from "ng2-toastr";
import { CrudServiceContainer } from "../common/crud-service-container";
import { Observable } from "rxjs/Observable";
import { DialogCloseEventType } from "../common/close-button-event";
import { isNullOrUndefined } from "util";
import { CrudRestErrorReporter } from "../../../service/crud/crud-rest-error-reporter";

/**
 * This class manages the set of buttons for a model object dialog.
 *
 * Created by mike on 12/31/2016.
 */
export abstract class CrudFormButtonsComponent<T extends ModelObject<T>> extends BaseCrudComponent<T>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudRestErrorReporter} crudRestErrorReporter
     * @param {CrudServiceContainer<T extends ModelObject<T>>} crudServiceContainer
     * @param {boolean} showContinuousAddButton
     */
    constructor( protected toaster: ToastsManager,
                 protected crudServiceContainer: CrudServiceContainer<T>,
                 protected showContinuousAddButton: boolean = false )
    {
        super( toaster, crudServiceContainer.crudStateStore, crudServiceContainer.modelObjectFactory );
        if ( !this.crudServiceContainer.modelObjectFactory )
        {
            throw new Error( "modelObjectFactory argument cannot be null" );
        }
        if ( !this.crudServiceContainer.crudRestService )
        {
            throw new Error( "crudRestService argument cannot be null" );
        }
        if ( !this.crudServiceContainer.crudFormService )
        {
            throw new Error( "crudFormService argument cannot be null" );
        }
        if ( !this.crudServiceContainer.modelObjectFactory )
        {
            throw new Error( "modelObjectFactory argument cannot be null" );
        }
        if ( !this.crudServiceContainer.crudFormButtonsService )
        {
            throw new Error( "crudFormButtonsService argument cannot be null" );
        }
    }

    /**
     * Keeps track of when the form is valid or invalid.
     * This value is set from an event initiated from the child form component.
     */
    protected formValidFlag: boolean;

    /**
     * Keeps track of when the form is dirty or not dirty
     * This value is set from an event initiated from the child form component.
     */
    protected formDirtyFlag: boolean;

    /**
     * Keeps track of when the form has been touched
     * This value is set from an event initiated from the child form component.
     */
    protected formTouchedFlag: boolean;

    /**
     * Have to declare DialogCloseEventType for this context.
     * @type {CloseButtonEvent}
     */
    protected CloseButtonEvent = DialogCloseEventType;

    /**
     * Initialize the class
     */
    public ngOnInit()
    {
        this.debug( "ngOnInit.begin" );
        this.subscribeToCrudFormServiceEvents();
        // Tell everyone that we are done
        this.crudServiceContainer
            .crudFormButtonsService
            .sendComponentInitializedEvent();
        this.debug( "ngOnInit.end" );
    }

    /**
     * Subscribes to the events received from the CrudFormService
     */
    private subscribeToCrudFormServiceEvents(): void
    {
        this.debug( "subscribeToCrudFormServiceEvents.begin" );
        this.crudServiceContainer
            .crudFormService
            .subscribeToFormDirtyEvent(( dirty: boolean ) => this.onFormDirty( dirty ) );
        this.crudServiceContainer
            .crudFormService
            .subscribeToFormTouchedEvent(( touched: boolean ) => this.onFormTouched( touched ) );
        this.crudServiceContainer
            .crudFormService
            .subscribeToFormValidEvent(( valid: boolean ) => this.onFormValid( valid ) );
        this.crudServiceContainer
            .crudFormButtonsService
            .subscribeToCrudOperationChangeEvent(( crudOperation: CrudOperation ) => this.onCrudOperationChanged( crudOperation ) );
        this.crudServiceContainer
            .crudFormButtonsService
            .subscribeToModelObjectChangedEvent(( modelObject: T ) => this.onModelObjectChanged( modelObject ) );
        this.crudServiceContainer
            .crudFormService
            .subscribeToFormLogStateRequest( () => this.logState() ) ;
        this.debug( "subscribeToCrudFormServiceEvents.end" );
    }

    /**
     * This method is called when the crud operation changes.
     * @param {CrudOperation} crudOperation
     */
    protected onCrudOperationChanged( crudOperation: CrudOperation )
    {
        super.onCrudOperationChanged( crudOperation );
        this.logState();
    }

    /**
     * This method will log the state of the buttons and form validity
     */
    private logState()
    {
        this.debug( "crudOperation: " + CrudOperation.getName( this.crudOperation ));
        this.debug( "modelObject: " + JSON.stringify( this.modelObject ));
        this.debug( "isFormValid: " + this.formValidFlag );
        this.debug( "isSaveButtonDisabled: " + this.isSaveButtonDisabled() );
        this.debug( "isDeleteButtonDisabled: " + this.isDeleteButtonDisabled() );
        this.debug( "isAddButtonDisabled: " + this.isAddButtonDisabled() );
        this.debug( "isShowSaveButton: " + this.isShowSaveButton() );
        this.debug( "isShowAddButton: " + this.isShowAddButton() );
        this.debug( "isShowDeleteButton: " + this.isShowDeleteButton() );
    }

    /**
     * Determines if the Reset Button should be shown
     * @returns {boolean}
     */
    protected isShowResetButton(): boolean
    {
        return this.crudOperation != CrudOperation.DELETE;
    }

    /**
     * Determines if the Save Button should be shown
     * @returns {boolean}
     */
    protected isShowSaveButton(): boolean
    {
        return this.crudOperation == CrudOperation.UPDATE;
    }

    /**
     * Determines if the Delete Button should be shown
     * @returns {boolean}
     */
    protected isShowDeleteButton(): boolean
    {
        return this.crudOperation == CrudOperation.DELETE;
    }

    /**
     * Determines if the Add Button should be shown
     * @returns {boolean}
     */
    protected isShowAddButton(): boolean
    {
        return this.crudOperation == CrudOperation.CREATE;
    }

    /**
     * Determines if the Add Button should be shown
     * @returns {boolean}
     */
    protected isShowContinuousAddButton(): boolean
    {
        return this.crudOperation == CrudOperation.CREATE && this.showContinuousAddButton;
    }

    /**
     * Determines if the Add and continue Button should be shown
     * @returns {boolean}
     */
    protected isShowAddAndContinueButton(): boolean
    {
        return this.crudOperation == CrudOperation.CREATE;
    }

    /**
     * Determines if the Close Button should be shown
     * @returns {boolean}
     */
    protected isShowCloseButton(): boolean
    {
        return true;
    }

    /**
     * Determines if the Add button is disabled.
     * @returns {boolean} true if adding a model object and the input data is valid,
     *                    false otherwise
     */
    protected isAddButtonDisabled()
    {
        //this.debug( `isAddButtonDisabled crudOperation: ${this.crudOperation} isReadOnly: ${this.isModelObjectReadOnly( this.modelObject)} formDirty: ${this.formDirtyFlag}`);
        var disabled = true;
        if ( this.crudOperation == CrudOperation.CREATE )
        {
            disabled = !this.formValidFlag;
        }
        return disabled;
    }

    /**
     * Determines if the Continuous Add button is disabled.
     * @returns {boolean} true if adding a model object and the input data is valid,
     *                    false otherwise
     */
    protected isContinuousAddButtonDisabled()
    {
        //this.debug( `isAddButtonDisabled crudOperation: ${this.crudOperation} isReadOnly: ${this.isModelObjectReadOnly( this.modelObject)} formDirty: ${this.formDirtyFlag}`);
        var disabled = true;
        if ( this.crudOperation == CrudOperation.CREATE && this.showContinuousAddButton )
        {
            disabled = !this.formValidFlag;
        }
        return disabled;
    }

    /**
     * Determines if the Save button is disabled.
     * @returns {boolean} true if adding a model object and the input data is valid,
     *                    false otherwise
     */
    protected isSaveButtonDisabled()
    {
        //this.debug( `isSaveButtonDisabled crudOperation: ${this.crudOperation} isReadOnly: ${this.isModelObjectReadOnly( this.modelObject)} formDirty: ${this.formDirtyFlag}`);
        var disabled = true;
        if ( this.crudOperation == CrudOperation.UPDATE &&
             this.formDirtyFlag &&
             !this.isModelObjectReadOnly( this.modelObject ) )
        {
            disabled = !this.formValidFlag;
        }
        return disabled;
    }

    /**
     * Determines if the Delete button is disabled.
     * @return {T|boolean} true if the model object is read only or null, false otherwise
     */
    protected isDeleteButtonDisabled(): boolean
    {
        return !this.modelObject || this.isModelObjectReadOnly( this.modelObject );
    }

    /**
     * Determines if the Close button is disabled.
     * @return {T|boolean} true if the model object is read only or null, false otherwise
     */
    protected isCloseButtonDisabled(): boolean
    {
        return false;
    }

    /**
     * Is called whenever there is a form change
     * @param valid true if the form data is valid, false otherwise
     */
    protected onFormValid( valid: boolean ): void
    {
        //this.debug( "onFormValid: " + valid );
        this.formValidFlag = valid;
        this.enableDisableButtons();
    }

    /**
     * This method is called whenever there is a change on the form.
     * @param dirty true if the form is dirty, false otherwise
     */
    protected onFormDirty( dirty: boolean ): void
    {
        //this.debug( "onFormDirty: " + dirty );
        this.formDirtyFlag = dirty;
        this.enableDisableButtons();
    }

    /**
     * This method is called whenever the form.touched value changes
     * @param touched
     */
    private onFormTouched( touched: boolean ): void
    {
        //this.debug( "onFormTouched: " + touched );
        this.formTouchedFlag = touched;
        this.enableDisableButtons();
    }

    /**
     * This method will enable or disable the buttons based on
     * the is<button>Disabled() return value
     */
    protected enableDisableButtons(): void
    {
        //this.debug( "enableDisableButtons: formValid: " + this.formValidFlag + " formDirty: " + this.formDirtyFlag );
    }

    /**
     * Determines if the model object should not be modified -- read only
     * @param modelObject
     * @return {boolean}
     */
    protected isModelObjectReadOnly( modelObject: T ): boolean
    {
        return this.crudServiceContainer
                   .crudRestService
                   .isModelObjectReadOnly( modelObject );
    }

    /**
     * Reset the form
     */
    protected onResetButtonClick(): void
    {
        this.debug( "onResetButtonClick" );
        this.crudServiceContainer
            .crudFormService
            .sendFormResetEvent();
    }

    /**
     * This method is called when the Save button is clicked
     */
    protected onSaveButtonClick(): void
    {
        var methodName = "onSaveButtonClick";
        this.debug( methodName + ".begin " + JSON.stringify( this.modelObject ));
        this.sendSaveButtonClickedEvent();
        this.sendFormPrepareToSaveEvent();
        this.performSaveButtonWork();
        this.debug( methodName + ".end" );
    }

    /**
     * This method is called when the save button is clicked but before the save button work is started.
     * {@see notifySaveButtonSuccessful}
     */
    protected sendSaveButtonClickedEvent()
    {
        var methodName = "sendSaveButtonClickedEvent";
        this.debug( methodName + " " + JSON.stringify( this.modelObject ));
        this.crudServiceContainer
            .crudFormButtonsService
            .sendSaveButtonClickedEvent( this.modelObject );
    }

    /**
     * This method performs the REST web service calls and handles the success or failure of the request.
     * @param {string} methodName
     */
    protected performSaveButtonWork( )
    {
        var methodName = "performSaveButtonWork";
        this.debug( methodName + ".begin " + JSON.stringify( this.modelObject ));
        this.checkModelObjectReference();
        var observable: Observable<T> = this.crudServiceContainer
                                            .crudRestService
                                            .updateModelObject( this.modelObject );
        observable.subscribe( ( updatedModelObject: T ) =>
                              {
                                  this.showInfo( this.getSaveSuccessFulMessage( updatedModelObject ) );
                                  this.crudStateStore.sendModelObjectChangedEvent( this, updatedModelObject );
                                  this.debug( methodName + " saved successful.  modelObject; " + JSON.stringify( this.modelObject ) );
                                  this.notifySaveButtonSuccessful();
                              },
                              err => this.reportRestError( err )
        );
        this.busyIndicator = observable.subscribe();
        this.debug( methodName + ".end" );
    }

    /**
     * Sends the necessary notifications that the save button work completed successfully.
     */
    protected notifySaveButtonSuccessful()
    {
        this.debug( "notifySaveButtonSuccessful.begin" );
        this.crudServiceContainer
            .crudFormService
            .sendFormResetEvent();
        this.crudServiceContainer
            .crudFormButtonsService
            .sendSaveButtonClickCompletedEvent( this.modelObject );
        this.resetCrudOperationAndModelObject();
        this.sendResetCrudOperationAndModelObject();
        this.crudServiceContainer
            .crudFormService
            .resetSubjects();
        this.crudServiceContainer
            .crudFormButtonsService
            .resetSubjects();
        this.debug( "notifySaveButtonSuccessful.end" );
    }

    /**
     * This method is called to get the message to display to the user that the mdoel object was saved successfully.
     * This method can be overridden to customize the message.  The default is to display "Save Successful!"
     * @param {T} modelObject
     * @returns {string}
     */
    protected getSaveSuccessFulMessage( modelObject: T )
    {
        return "Save Successful!";
    }

    /**
     * This method is called when the delete button is clicked but before the delete button work is started.
     * {@see notifySaveButtonSuccessful}
     */
    protected sendDeleteButtonClickedEvent()
    {
        var methodName = "sendDeleteButtonClickedEvent";
        this.debug( methodName + " " + JSON.stringify( this.modelObject ));
        this.crudServiceContainer
            .crudFormButtonsService
            .sendDeleteButtonClickedEvent( this.modelObject );
    }

    /**
     * This method is called when the Continuous Add button is clicked.
     */
    protected onContinuousAddButtonClick(): void
    {
        var methodName = "onContinuousAddButtonClicked";
        this.debug( methodName + " " + JSON.stringify( this.modelObject ));
        this.performAddButtonWork( ( modelObject: T ) =>
                                   {
                                       this.crudStateStore.sendModelObjectChangedEvent( this, modelObject );
                                       this.crudServiceContainer
                                           .crudFormService.sendFormResetEvent();
                                       this.crudServiceContainer
                                           .crudFormButtonsService
                                           .sendContinuousAddButtonClickedEvent( this.modelObject );
                                   });
    }

    /**
     * This method is called when the Add button is clicked.
     */
    protected onAddButtonClick(): void
    {
        var methodName = "onAddButtonClicked";
        this.debug( methodName + ".begin " + JSON.stringify( this.modelObject ));
        this.sendAddButtonClickedEvent();
        this.sendFormPrepareToSaveEvent();
        this.performAddButtonWork();
        this.debug( methodName + ".end " + JSON.stringify( this.modelObject ));
    }

    /**
     * This method is called when the save button is clicked but before the save button work is started.
     * {@see notifySaveButtonSuccessful}
     */
    protected sendAddButtonClickedEvent()
    {
        var methodName = "sendADdButtonClickedEvent";
        this.debug( methodName + " " + JSON.stringify( this.modelObject ));
        this.crudServiceContainer
            .crudFormButtonsService
            .sendAddButtonClickedEvent( this.modelObject );
    }

    /**
     * Sends a notification to the form to perform any necessary work before the model object is saved.
     */
    protected sendFormPrepareToSaveEvent()
    {
        this.debug( "sendFormPrepareToSaveEvent" );
        this.crudServiceContainer.crudFormService.sendFormPrepareToSaveEvent();
    }

    /**
     * This method is called when the Add button is clicked.
     * @param notifySuccess - Callback to perform the work after the modelObject has been saved.  If null, the
     * notifyAddButtonWorkSuccessful method is called.
     */
    protected performAddButtonWork( notifySuccess?: ( modelObject: T ) => any ): void
    {
        var methodName = "performAddButtonWork";
        this.checkModelObjectReference();
        this.debug( methodName + " " + JSON.stringify( this.modelObject ));
        var observable: Observable<T> = this.crudServiceContainer
                                            .crudRestService
                                            .createModelObject( this.modelObject );
        observable.subscribe( ( newModelObject: T ) =>
                   {
                       this.crudStateStore
                           .sendModelObjectChangedEvent( this, newModelObject );
                       this.debug( methodName + " add successful.  modelObject: " +
                           JSON.stringify( this.modelObject ) );
                       this.showInfo( this.getSaveSuccessFulMessage( this.modelObject ));
                       /*
                        * Check to see if there is a custom notifySuccess method passed in
                        */
                       if ( isNullOrUndefined( notifySuccess ))
                       {
                           this.notifyAddButtonWorkSuccessful();
                       }
                       else
                       {
                           notifySuccess( this.modelObject );
                       }
                   },
                   err =>
                   {
                       this.debug( methodName + " err: " + err );
                       var exception = this.reportRestError( err );
                       this.debug( methodName + " exception: " + JSON.stringify( exception ));
                       /*
                        *  If we get a duplicate key, tell the stock table to jump to that stock
                        */
                       if ( exception.isDuplicateKeyExists() )
                       {
                           this.debug( methodName + " duplicateKeyExists" );
                           this.crudServiceContainer
                               .crudFormButtonsService
                               .sendNavigateToModelObjectEvent( this.modelObject );
                       }
                   }
            );
        this.busyIndicator = observable.subscribe();
    }

    /**
     * Sends the necessary add button successful notifications
     */
    protected notifyAddButtonWorkSuccessful()
    {
        this.debug( "notifyAddButtonWorkSuccessful" );
        this.crudServiceContainer
            .crudFormService.sendFormResetEvent();
        this.crudServiceContainer
            .crudFormButtonsService
            .sendAddButtonClickCompletedEvent( this.modelObject );
        this.resetCrudOperationAndModelObject();
        this.sendResetCrudOperationAndModelObject();
        this.crudServiceContainer
            .crudFormService
            .resetSubjects();
        this.crudServiceContainer
            .crudFormButtonsService
            .resetSubjects();
    }

    /**
     * This method is called when the delete button is clicked
     */
    protected onDeleteButtonClick(): void
    {
        var methodName = "onDeleteButtonClick";
        this.debug( methodName + " " + JSON.stringify( this.modelObject ));
        this.sendDeleteButtonClickedEvent()
        this.performDeleteButtonWork( methodName );
    }

    /**
     * This method performs the actual delete of the model object.
     * @param {string} methodName
     */
    protected performDeleteButtonWork( methodName: string )
    {
        var observable: Observable<void> = this.crudServiceContainer
                                               .crudRestService
                                               .deleteModelObject( this.modelObject );
        observable.subscribe( () =>
                              {
                                  this.debug( methodName + " delete successful" );
                                  this.showInfo( this.getDeleteSuccessfulMessage() )
                                  this.notifyDeleteButtonWorkSuccessful();
                              },
                              err =>
                              {
                                  this.debug( methodName + " delete failed" );
                                  this.reportRestError( err );
                              }
        );
        this.busyIndicator = observable.subscribe();
    }

    /**
     * Defines the message to show when a delete was successful.  Override this method to change the message.
     * @returns {string}
     */
    protected getDeleteSuccessfulMessage()
    {
        return "Delete successful!";
    }

    /**
     * Performs the necessary notifications that the delete button work completed successfully.
     */
    protected notifyDeleteButtonWorkSuccessful()
    {
        this.debug( "notifyDeleteButtonWorkSuccessful" );
        this.crudServiceContainer
            .crudFormService
            .sendFormResetEvent();
        this.crudServiceContainer
            .crudFormButtonsService
            .sendDeleteButtonClickCompletedEvent( this.modelObject );
        this.resetCrudOperationAndModelObject();
        this.sendResetCrudOperationAndModelObject();
    }

    /**
     * This method is called when the user clicks the Close button.  The dialog service is used to send the close
     * message.
     */
    protected onCloseButtonClick( event: DialogCloseEventType ): void
    {
        this.debug( "onCloseButtonClick " + DialogCloseEventType.getName( event ) );
        if ( !isNullOrUndefined( this.crudServiceContainer.crudDialogService ))
        {
            this.crudServiceContainer
                .crudDialogService
                .sendCloseButtonClickedEvent( event );
        }
        else
        {
            this.crudServiceContainer
                .crudPanelService
                .sendCancelButtonClickedEvent();
        }
        this.resetCrudOperationAndModelObject();
        this.sendResetCrudOperationAndModelObject();
    }

    /**
     * Returns the label for the Add button.  Defaults to Save as the Save and Add button are never shown at
     * the same time but have different functionality.
     * @return {string}
     */
    protected getAddButtonLabel(): string
    {
        return "Save";
    }

    /**
     * Returns the label for the Continuous Add button.  Defaults to Save as the Save and Add button are never shown at
     * the same time but have different functionality.
     * @return {string}
     */
    protected getContinuousAddButtonLabel(): string
    {
        return "Save & Add"
    }

    /**
     * Returns the label for the Save button.
     * @return {string}
     */
    protected getSaveButtonLabel(): string
    {
        return "Save";
    }

    /**
     * Returns the label for the Delete button.
     * @return {string}
     */
    protected getDeleteButtonLabel( modelObject: T ): string
    {
        return "Confirm";
    }

    /**
     * Returns the label for the Close button.
     * @return {string}
     */
    protected getCloseButtonLabel(): string
    {
        if ( this.crudOperation == CrudOperation.DELETE )
        {
            return "Cancel";
        }
        else
        {
            return "Close";
        }
    }

    /**
     * Returns the label for the Reset button.
     * @return {string}
     */
    protected getResetLabel(): string
    {
        return "Reset";
    }

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage( modelObject: T ): string
    {
        return "Are you sure you want to delete this " + this.getDeleteKeyword() + "?";
    }

    /**
     * Defines the model object identifier string to display to the user in the dialog when deleting the model object.
     * This method is called by {@code getDeleteMessage} to produce a meaningful confirm delete message.
     */
    public abstract getDeleteKeyword(): string;

    /**
     * Notifies the form service to send CRUD operation and model object changes.
     */
    private sendResetCrudOperationAndModelObject()
    {
        this.crudStateStore.sendModelObjectChangedEvent( this, this.crudServiceContainer
                                                                   .modelObjectFactory
                                                                   .newModelObject() );
        this.crudStateStore.sendCrudOperationChangedEvent( CrudOperation.NONE );
    }

}
