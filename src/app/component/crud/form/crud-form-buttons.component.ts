import { BaseCrudComponent } from "../common/base-crud.component";
import { ModelObject } from "../../../model/entity/modelobject";
import { CrudOperation } from "../common/crud-operation";
import { ToastsManager } from "ng2-toastr";
import { CrudServiceContainer } from "../common/crud-service-container";
import { Observable } from "rxjs/Observable";

/**
 * This class manages the set of buttons for a model object dialog.
 *
 * Created by mike on 12/31/2016.
 */
export abstract class CrudFormButtonsComponent<T extends ModelObject<T>> extends BaseCrudComponent<T>
{
    constructor( protected toaster: ToastsManager,
                 protected crudServiceContainer: CrudServiceContainer<T> )
    {
        super( toaster );
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
     * Initialize the class
     */
    public ngOnInit()
    {
        this.log( "ngOnInit.begin" );
        this.subscribeToCrudFormServiceEvents();
        this.log( "ngOnInit.end" );
        // Tell everyone that we are done
        this.crudServiceContainer
            .crudFormButtonsService
            .sendComponentInitializedEvent();
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
            .crudFormService
            .subscribeToCrudOperationChangeEvent(( crudOperation: CrudOperation ) => this.crudOperationChanged( crudOperation ) );
        this.crudServiceContainer
            .crudFormService
            .subscribeToModelObjectChangedEvent(( modelObject: T ) => this.modelObjectChanged( modelObject ) );
        this.crudServiceContainer
            .crudFormService
            .subscribeToFormLogStateRequest( () => this.logState() ) ;
        this.debug( "subscribeToCrudFormServiceEvents.end" );
    }

    protected crudOperationChanged( crudOperation: CrudOperation )
    {
        super.crudOperationChanged( crudOperation );
        this.logState();
    }

    /**
     * This method will log the state of the buttons and form validity
     */
    private logState()
    {
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
        this.log( methodName + " " + JSON.stringify( this.modelObject ));
        this.crudServiceContainer.crudFormService.sendFormPrepareToSaveEvent();
        var observable: Observable<T> = this.crudServiceContainer
                                            .crudRestService
                                            .updateModelObject( this.modelObject );
        observable.subscribe( ( updatedModelObject: T ) =>
                               {
                                   this.showInfo( "Save Successful!")
                                   this.setModelObject( updatedModelObject );
                                   this.log( methodName + " saved successful.  modelObject; " +
                                                    JSON.stringify( this.modelObject ));
                                   this.crudServiceContainer
                                       .crudFormService
                                       .sendFormResetEvent();
                                   this.crudServiceContainer
                                       .crudFormButtonsService
                                       .sendSaveButtonClickedEvent( this.modelObject );
                               },
                               err => this.reportRestError( err )
            );
        this.busyIndicator = observable.subscribe();
    }

    /**
     * This method is called when the Add button is clicked.
     */
    protected onAddButtonClick(): void
    {
        var methodName = "onAddButtonClick";
        this.log( methodName + " " + JSON.stringify( this.modelObject ));
        this.crudServiceContainer.crudFormService.sendFormPrepareToSaveEvent();
        var observable: Observable<T> = this.crudServiceContainer
                                            .crudRestService
                                            .createModelObject( this.modelObject );
        observable.subscribe( ( newModelObject: T ) =>
                   {
                       this.showInfo( "Save successful!")
                       this.modelObject = newModelObject;
                       this.log( methodName + " add successful.  modelObject: " +
                                        JSON.stringify( this.modelObject ) );
                       this.crudServiceContainer
                           .crudFormService.sendFormResetEvent();
                       this.crudServiceContainer
                           .crudFormButtonsService
                           .sendAddButtonClickedEvent( newModelObject );
                   },
                   err =>
                   {
                       this.log( methodName + " err: " + err );
                       var exception = this.reportRestError( err );
                       this.log( methodName + " exception: " + JSON.stringify( exception ));
                       /*
                        *  If we get a duplicate key, tell the stock table to jump to that stock
                        */
                       if ( exception.isDuplicateKeyExists() )
                       {
                           this.log( methodName + " duplicateKeyExists" );
                           this.crudServiceContainer
                               .crudFormButtonsService
                               .sendNavigateToModelObjectEvent( this.modelObject );
                       }
                   }
            );
        this.busyIndicator = observable.subscribe();
    }

    /**
     * This method is called when the delete button is clicked
     */
    protected onDeleteButtonClick(): void
    {
        var methodName = "onDeleteButtonClick";
        this.log( methodName + " " + JSON.stringify( this.modelObject ));
        var observable: Observable<void> = this.crudServiceContainer
                                               .crudRestService
                                               .deleteModelObject( this.modelObject );
        observable.subscribe( () =>
                   {
                       this.log( methodName + " delete successful" );
                       this.showInfo( "Delete successful!")
                       this.crudServiceContainer
                           .crudFormService
                           .sendFormResetEvent();
                       this.crudServiceContainer
                           .crudFormButtonsService
                           .sendDeleteButtonClickedEvent( this.modelObject );
                   },
                   err =>
                   {
                       this.reportRestError( err );
                   }
            );
        this.busyIndicator = observable.subscribe();
    }

    /**
     * This method is called when the user clicks the Close button.  The dialog service is used to send the close
     * message.
     */
    protected onCloseButtonClick(): void
    {
        this.crudServiceContainer
            .crudDialogService
            .sendCloseButtonClickedEvent();
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
    protected getDeleteButtonLabel(): string
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
    public getDeleteMessage(): string
    {
        return "Are you sure you want to delete this " + this.getDeleteKeyword() + "?";
    }

    /**
     * Defines the model object identifier string to display to the user in the dialog when deleting the model object.
     * This method is called by {@code getDeleteMessage} to produce a meaningful confirm delete message.
     */
    public abstract getDeleteKeyword(): string;

}
