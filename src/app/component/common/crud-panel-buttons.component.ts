import { BaseCrudComponent } from "./base-crud.component";
import { ModelObject } from "../../model/base-modelobject";
import { Input } from "@angular/core";
import { CrudOperation } from "./crud-operation";
import { CrudFormService } from "./crud-form.service";
import { CrudRestService } from "../../service/crud-rest.serivce";
import { ToastsManager } from "ng2-toastr";
import { CrudPanelButtonsService } from "./crud-panel-buttons.service";
import { CrudDialogService } from "./crud-dialog.service";
import { ModelObjectFactory } from "../../model/model-object.factory";

/**
 * This class manages the set of buttons for a model object dialog.
 *                                                                             *** OPTIONAL ***
 * inputs: ['crudFormService', 'crudPanelButtonsService', 'modelObjectFactory, 'crudPanelDialogService']
 *
 * Created by mike on 12/31/2016.
 */
export abstract class CrudPanelButtonsComponent<T extends ModelObject<T>> extends BaseCrudComponent<T>
{
    /**
     * Used to receive state information from the form
     */
    @Input()
    protected crudFormService: CrudFormService<T>;

    /**
     * Used to send event information to subscribers
     */
    @Input()
    protected crudPanelButtonsService: CrudPanelButtonsService<T>;

    /**
     * Optional input if the panel should display the close button for a dialog
     */
    @Input()
    protected crudDialogService: CrudDialogService<T>;

    constructor( protected toaster: ToastsManager,
                 protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudRestService: CrudRestService<T> )
    {
        super( toaster );
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
        if ( !this.crudFormService )
        {
            throw new Error( "crudFormService has not been set by Input value" );
        }
        if ( !this.modelObjectFactory )
        {
            throw new Error( "modelObjectFactory has not been set by Input value" );
        }
        if ( !this.crudPanelButtonsService )
        {
            throw new Error( "crudPanelButtonsService has not been set by Input value" );
        }
        this.subscribeToCrudFormServiceEvents();
    }

    /**
     * Subscribes to the events received from the CrudFormService
     */
    private subscribeToCrudFormServiceEvents(): void
    {
        this.crudFormService.handleFormDirty().subscribe( ( dirty: boolean ) => this.onFormDirty( dirty ) );
        this.crudFormService.handleFormTouched().subscribe( ( touched: boolean ) => this.onFormTouched( touched ) );
        this.crudFormService.handleFormValid().subscribe( ( valid: boolean ) => this.onFormValid( valid ) );
        this.crudFormService.handleCrudOperationChanged().subscribe( (crudOperation: CrudOperation) =>
                                                                         this.crudOperationChanged( crudOperation ) );
        this.crudFormService.handleModelObjectChanged().subscribe( (modelObject: T) =>
                                                                         this.modelObjectChanged( modelObject ) );
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
        this.debug( "enableDisableButtons: formValid: " + this.formValidFlag + " formDirty: " + this.formDirtyFlag );
    }

    /**
     * Determines if the model object should not be modified -- read only
     * @param modelObject
     * @return {boolean}
     */
    protected isModelObjectReadOnly( modelObject: T ): boolean
    {
        return this.crudRestService.isModelObjectReadOnly( modelObject );
    }

    /**
     * Reset the form
     */
    protected onResetButtonClick(): void
    {
        this.crudFormService.sendFormReset();
    }

    /**
     * This method is called when the Save button is clicked
     */
    protected onSaveButtonClick(): void
    {
        var methodName = "onSaveButtonClick";
        this.logger.log( methodName + " " + JSON.stringify( this.modelObject ));
        //this.crudRestService.updateModelObject( this.modelObjectFactory.newModelObjectFromJSON( this.modelObject ))
        this.crudRestService.updateModelObject( this.modelObject )
            .subscribe( ( updatedModelObject: T ) =>
                        {
                            this.modelObject = updatedModelObject;
                            this.logger.log( methodName + " saved successful.  modelObject; " +
                                             JSON.stringify( this.modelObject ));
                            this.crudFormService.sendFormReset();
                            this.crudPanelButtonsService.sendSaveButtonClicked( updatedModelObject );
                        },
                        err => this.reportRestError( err )
            );
    }

    /**
     * This method is called when the Add button is clicked.
     */
    protected onAddButtonClick(): void
    {
        var methodName = "onAddButtonClick";
        this.logger.log( methodName + " " + JSON.stringify( this.modelObject ));
        this.crudRestService.createModelObject( this.modelObject )
            .subscribe( ( newModelObject: T ) =>
                        {
                            this.modelObject = newModelObject;
                            this.logger.log( methodName + " add successful.  modelObject: " +
                                             JSON.stringify( this.modelObject ) );
                            this.crudFormService.sendFormReset();
                            this.crudPanelButtonsService.sendAddButtonClicked( newModelObject );
                        },
                        err =>
                        {
                            this.logger.log( methodName + " err: " + err );
                            var exception = this.reportRestError( err );
                            this.logger.log( methodName + " exception: " + JSON.stringify( exception ));
                            /*
                             *  If we get a duplicate key, tell the stock table to jump to that stock
                             */
                            if ( exception.isDuplicateKeyExists() )
                            {
                                this.logger.log( methodName + " duplicateKeyExists" );
                                this.crudPanelButtonsService.sendNavigateToModelObject( this.modelObject );
                            }
                        }
            );
    }

    /**
     * This method is called when the delete button is clicked
     */
    protected onDeleteButtonClick(): void
    {
        var methodName = "onDeleteButtonClick";
        this.logger.log( methodName + " " + JSON.stringify( this.modelObject ));
        this.crudRestService
            .deleteModelObject( this.modelObject )
            .subscribe( () =>
                        {
                            this.logger.log( methodName + " delete successful" );
                            this.crudFormService.sendFormReset();
                            this.crudPanelButtonsService.sendDeleteButtonClicked( this.modelObject );
                        },
                        err =>
                        {
                            this.reportRestError( err );
                        }
            );
    }

    /**
     * This method is called when the user clicks the Close button.  The dialog service is used to send the close
     * message.
     */
    protected onCloseButtonClick(): void
    {
        this.crudDialogService.sendCloseButtonClicked();
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
        return "Are you sure you want to delete this " + this.getDeleteKey() + "?";
    }

    /**
     * Defines the model object identifier string to display to the user in the dialog when deleting the model object.
     * This method is called by {@code getDeleteMessage} to produce a meaningful confirm delete message.
     */
    public abstract getDeleteKey(): string;

}
