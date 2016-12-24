import { Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ValidationService } from "../../service/validation-service";
import { CrudOperation } from "./crud-operation";
import { BaseCrudComponent } from "./base-crud.component";
import { CrudFormService } from "./crud-form.service";
import { ModelObjectFactory } from "../../model/model-object-factory";
import { ModelObject } from "../../model/base-modelobject";
import { ToastsManager } from "ng2-toastr";

/**
 * This class contains the common functionality for a form for a CRUD model object.
 *
 * inputs: ['modelObject'],
 *
 * Created by mike on 12/4/2016.
 */
export abstract class CrudFormComponent<T extends ModelObject<T>> extends BaseCrudComponent<T> implements OnInit
{
    /**
     * Identifies the current CRUD operation
     */
    protected crudOperation: CrudOperation;

    /**
     * The modelObject is the object that contains the data on the form
     */
    @Input()
    protected modelObject: T;

    /**
     * The crudForm is the Dynamic Form object
     */
    protected crudForm: FormGroup;

    /**
     * C O N S T R U C T O R
     */
    constructor( protected toaster: ToastsManager,
                 protected crudFormService: CrudFormService<T>,
                 protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( toaster, modelObjectFactory );
    }

    /**
     * Object initialization
     */
    public ngOnInit()
    {
        this.modelObject = this.modelObjectFactory.newModelObject();
        this.crudForm = this.createCrudForm();
        this.subscribeToFormChanges();
        this.subscribeToCrudFormServiceEvents();
    }

    /**
     * This method must be override to create the crudForm
     */
    protected abstract createCrudForm(): FormGroup;

    /**
     * This method identifies the primary key fields of <T>.
     * The primary key fields are used to determine if fields should be enabled/disabled
     */
    protected abstract primaryKeyFields(): Array<string>;

    /**
     * Subscribes to {@code CrudFormService} events through the {@code crudFormService} service.
     */
    protected subscribeToCrudFormServiceEvents()
    {
        this.crudFormService.handleReset().subscribe( () => this.reset() );
        this.crudFormService.handleCrudOperationChanged().subscribe( ( crudOperation: CrudOperation ) =>
                                                                        this.crudOperationChanged( crudOperation ) )
        this.crudFormService.handleModelObjectChanged().subscribe( ( modelObject: T ) =>
                                                                      this.modelObjectChange( modelObject ) );
    }

    /**
     * This method is called whenever the crudOperation changes.
     * @param crudOperation
     * @override
     */
    protected crudOperationChanged( crudOperation: CrudOperation )
    {
        this.logger.log( "crudOperationChanged " + crudOperation );
        this.crudOperation = crudOperation;
        super.crudOperationChanged( crudOperation );
        this.enableDisableInputs();
    }

    /**
     * This method is called whenver the modelObject changes
     * @param modelObject
     * @override
     */
    protected modelObjectChange( modelObject: T ): any
    {
        this.logger.log( "modelObjectChange " + JSON.stringify( modelObject ) );
        this.modelObject = modelObject;
        super.modelObjectChange( modelObject );
        this.enableDisableInputs();
    }

    /**
     * Initializes the form and the model object to empty values
     */
    protected reset()
    {
        this.crudForm.reset();
        this.modelObject = this.modelObjectFactory.newModelObject();
        this.logger.debug( "reset" );
    }

    /**
     * This method will subscribe to events for the stock form.
     * As data changes, or other events occur, this method will be called.
     *
     * The following three events will be emitted for each change:
     * 1. formDirtyChange<boolean>
     * 2. formValidChange<boolean>
     * 3. modelObjectChange<T>
     */
    protected subscribeToFormChanges()
    {
        /*
         * Initialize the change stream, the $ means an Observable variable
         */
        const myFormValueChanges$ = this.crudForm.valueChanges;
        /*
         * Subscribe to the stream
         */
        myFormValueChanges$.subscribe( (formData: any) =>
        {
            this.onFormChange( formData );
        });
    }

    /**
     * This method is called whenever there is a change in the form data
     * @param formData
     * @return {any}
     */
    protected onFormChange( formData: any )
    {
        var methodName = "onFormChange";
        //this.debug( "onFormChange.begin " + JSON.stringify( formData ) );
        this.emitFormDirtyChange();
        this.emitFormValidChange();
        //this.modelObjectChange.emit( this.modelObject );
        if ( !this.crudForm.valid )
        {
            //this.debug( "Form is not valid" );
            for (let propertyName in this.crudForm.errors)
            {
                if ( this.crudForm.errors.hasOwnProperty( propertyName ) &&
                    this.crudForm.touched )
                {
                    var errorMessage = ValidationService.getValidatorErrorMessage( propertyName,
                                                                                   this.crudForm.errors[propertyName] );
                    //this.debug( methodName + " error: " + error );
                    return errorMessage;
                }
            }
        }
        else
        {
            //this.debug( "Form IS valid" );
        }
        //this.debug( methodName + ".end" );
    }

    /**
     * Emits an event to indicate that the form validity has changed.
     * The event value contains a boolean flag that indicates whether the form
     * is valid or not
     */
    protected emitFormValidChange()
    {
        //this.logger.debug( "emitFormValidChange" );
        this.crudFormService.sendFormValid( this.crudForm.valid );
    }

    /**
     * Emits an event to indicate that the form is dirty (true) clean (false).
     * The event value contains a boolean flag that indicates whether the form
     * is dirty or clean.
     */
    protected emitFormDirtyChange()
    {
        //this.logger.debug( "emitFormDirtyChange" );
        this.crudFormService.sendFormDirty( this.crudForm.dirty );
    }

    /**
     * Depending on the type of {@code CrudOperation} enables or disables the
     * components
     */
    protected enableDisableInputs()
    {
        var methodName = "enableDisableInputs";
        this.logger.debug( methodName );
        if ( this.crudForm )
        {
            var readOnly: boolean = this.isModelObjectReadOnly( this.modelObject );
            this.logger.debug( methodName + " crudOperation: " + this.crudOperation );
            this.logger.debug( methodName + " isModelObjectReadOnly: " + readOnly );
            if ( this.crudOperation == CrudOperation.NONE || readOnly )
            {
                this.disableInputs();
            }
            else
            {
                this.enableInputs();
            }
        }
        else
        {
            this.logger.debug( methodName + " this.crudForm is null" );
        }
    }

    /**
     * Disables the input fields
     */
    protected disableInputs(): void
    {
        this.logger.debug( "disableInputs" );
        if ( this.crudForm )
        {
            for ( let fieldName in this.crudForm.controls )
            {
                this.disableField( fieldName );
            }
        }
    }

    /**
     * This method is called to disable the field
     *
     * @param fieldName
     */
    protected disableField( fieldName: string )
    {
        this.logger.debug( "crudForm.disableField " + fieldName );
        //this.crudForm.disable( fieldName );
        this.crudForm.controls[fieldName].disable();
    }

    /**
     * Enable the input fields
     */
    protected enableInputs(): void
    {
        this.logger.debug( "enableInputs" );
        if ( this.crudOperation != CrudOperation.NONE &&
             this.crudOperation != CrudOperation.DELETE )
        {
            for ( let fieldName in this.crudForm.controls )
            {
                this.enableField( fieldName );
            }
        }
    }

    /**
     * This method is called to enable {@code fieldName}
     * @param fieldName
     */
    protected enableField( fieldName: string ): void
    {
        var doEnable = true;
        if ( this.crudOperation == CrudOperation.UPDATE &&
             this.isPrimaryKeyField( fieldName ) )
        {
            doEnable = false;
        }
        if ( doEnable )
        {
            this.crudForm.controls[fieldName].enable();
            this.logger.debug( "crudForm.enableField enable: " + fieldName );
        }
        else
        {
            this.crudForm.controls[fieldName].disable();
            this.logger.debug( "crudForm.enableField disable: " + fieldName );
        }
    }

    /**
     * Determines if {@code fieldName} is in the primary key fields array.
     * @param fieldName
     * @return {boolean}
     */
    protected isPrimaryKeyField( fieldName: string )
    {
        var found = false;
        for ( var name of this.primaryKeyFields() )
        {
            if ( name === fieldName )
            {
                found = true;
                break;
            }
        }
        return found;
    }

    /**
     * Determines if the {@code modelObject} should be read only -- not able to be edited
     * @param stock
     * @returns {boolean}
     */
    protected isModelObjectReadOnly( modelObject: T )
    {
        var isReadOnly = true;
        switch ( this.crudOperation )
        {
            case CrudOperation.INSERT:
                isReadOnly = false;
                break;

            case CrudOperation.UPDATE:
                isReadOnly = false;
                break;

            case CrudOperation.DELETE:
                isReadOnly = true;
                break;
        }
        //this.debug( "isModelObjectReadOnly " + isReadOnly );
        return isReadOnly;
    }
}
