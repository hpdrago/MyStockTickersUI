import { Input, OnInit } from "@angular/core";
import { CrudOperation } from "./crud-operation";
import { BaseCrudComponent } from "./base-crud.component";
import { CrudFormService } from "./crud-form.service";
import { ModelObjectFactory } from "../../model/model-object-factory";
import { CrudPanelService } from "./crud-panel.service";
import { ModelObject } from "../../model/base-modelobject";
import { CrudRestService } from "../../service/crud-rest.serivce";
import { ToastsManager } from "ng2-toastr";

/**
 * This class contains a CRUD Form component {@code CrudFormComponent}
 * @param <T> Read Model Type and Search Criteria
 *
 * inputs: ['crudPanelService']
 *
 * Created by mike on 11/27/2016.
 */
export abstract class CrudPanelComponent<T extends ModelObject<T>>
    extends BaseCrudComponent<T>
    implements OnInit
{
    @Input()
    protected crudPanelService: CrudPanelService<T>;

    /**
     * Identifies the type of CRUD action
     */
    protected crudOperation: CrudOperation;

    /**
     * The object that contains the form's data
     */
    protected modelObject: T;

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
     * C O N S T R U C T O R
     */
    constructor( protected toaster: ToastsManager,
                 /**
                  * A service provided from the parent component that allows the parent to make
                  * requests to this child instance
                  */
                 protected crudFormService: CrudFormService<T>,
                 protected crudRestService: CrudRestService<T>,
                 protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( toaster, modelObjectFactory );
    }

    /**
     * Initialize the class
     */
    public ngOnInit()
    {
        this.subscribeToCrudFormServiceEvents();
        this.subscribeToCrudPanelServiceEvents();
    }

    /**
     * Subscribes to the events received from the CrudPanelService
     */
    private subscribeToCrudPanelServiceEvents(): void
    {
        this.crudPanelService.handleModelObjectChanged().subscribe( ( modelObject: T ) =>
                                                                        this.modelObjectChanged( modelObject ) );
        this.crudPanelService.handleCrudOperationChanged().subscribe( ( crudOperation: CrudOperation ) =>
                                                                          this.crudOperationChanged( crudOperation ) );
    }

    /**
     * Subscribes to the events received from the CrudFormService
     */
    private subscribeToCrudFormServiceEvents(): void
    {
        /*
         * Subscribe to events when the form becomes dirty/clean
         */
        this.crudFormService.handleFormDirty().subscribe( ( dirty: boolean ) => this.onFormDirty( dirty ) );
        /*
         * Subscribe to events when the form becomes touched
         */
        this.crudFormService.handleFormTouched().subscribe( ( touched: boolean ) => this.onFormTouched( touched ) );
        /*
         * Subscribe to events when the form becomes valid/invalid
         */
        this.crudFormService.handleFormValid().subscribe( ( valid: boolean ) => this.onFormValid( valid ) );
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
        this.debug( "modelObjectChange " + JSON.stringify( modelObject ));
        this.modelObject = modelObject;
        this.crudFormService.sendModelObjectChanged( this.modelObject );
    }

    /**
     * This method is called whenever the crudOperation changes.
     * @param crudOperation
     * @override
     */
    protected crudOperationChanged( crudOperation: CrudOperation ): void
    {
        this.debug( "crudOperationChanged" + crudOperation );
        this.crudOperation = crudOperation;
        this.crudFormService.sendCrudOperationChanged( this.crudOperation );
    }

    /**
     * Reset the form
     */
    protected onClearButtonClick(): void
    {
        this.crudFormService.sendReset();
    }

    /**
     * This method is called when the Close button is clicked.
     * It will close the dialog and emit a {@code closeButtonClick} event
     */
    protected onCloseButtonClick(): void
    {
        this.crudPanelService.sendCloseButtonClicked();
    }

    /**
     * This method is called when the Save button is clicked
     * The sub class should override this method to perform
     * a Save operation using the CRUD service.
     */
    protected onSaveButtonClick(): void
    {
        var methodName = "onSaveButtonClick";
        this.logger.log( methodName + " " + JSON.stringify( this.modelObject ));
        this.crudRestService.updateModelObject( this.modelObject )
            .subscribe( ( updatedModelObject: T ) =>
                        {
                            this.modelObject = updatedModelObject;
                            this.logger.log( methodName + " saved successful.  modelObject; " +
                                             JSON.stringify( this.modelObject ));
                            this.crudFormService.sendReset();
                            this.crudPanelService.sendModelObjectUpdated( updatedModelObject );
                        },
                        err => this.reportRestError( err )
            );
    }

    /**
     * This method is called when the Add button is clicked.
     * The sub class should override this method to perform
     * an Add operation using the CRUD service.
     */
    protected onAddButtonClick(): void
    {
        var methodName = "onAddButtonClick";
        this.logger.log( methodName + " " + JSON.stringify( this.modelObject ));
        this.crudRestService.addCreateModelObject( this.modelObject )
            .subscribe( ( newModelObject: T ) =>
                        {
                            this.modelObject = newModelObject;
                            this.logger.log( methodName + " add successful.  modelObject: " +
                                             JSON.stringify( this.modelObject ) );
                            this.crudFormService.sendReset();
                            this.crudPanelService.sendModelObjectCreated( newModelObject );
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
                                this.crudPanelService.sendNavigateToModelObject( this.modelObject );
                            }
                        }
            );
    }

    /**
     * This method is called when the delete button is clicked
     * The sub class should override this method to perform
     * a Delete operation using the CRUD service.
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
                            this.crudFormService.sendReset();
                            this.crudPanelService.sendModelObjectDeleted( this.modelObject );
                        },
                        err =>
                        {
                            this.reportRestError( err );
                        }
            );
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
        this.debug( "enableDisableButtons" );
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
     * Determines if the Save Button should be shown
     * @returns {boolean}
     */
    protected isShowSaveButton(): boolean
    {
        return this.crudOperation != CrudOperation.INSERT &&
            this.crudOperation != CrudOperation.NONE
    }

    /**
     * Determines if the Delete Button should be shown
     * @returns {boolean}
     */
    protected isShowDeleteButton(): boolean
    {
        return this.crudOperation != CrudOperation.INSERT &&
               this.crudOperation != CrudOperation.NONE;
    }

    /**
     * Determines if the Add Button should be shown
     * @returns {boolean}
     */
    protected isShowAddButton(): boolean
    {
        return this.crudOperation == CrudOperation.INSERT;
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
        if ( this.crudOperation == CrudOperation.INSERT )
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

    protected onSubmit(): void
    {
        this.debug( "onSubmit " + JSON.stringify( this.modelObject ));
    }
}
