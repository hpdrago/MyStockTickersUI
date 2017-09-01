import { Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ValidationService } from "../../../service/validation-service";
import { CrudOperation } from "../common/crud-operation";
import { BaseCrudComponent } from "../common/base-crud.component";
import { CrudFormService } from "./crud-form.service";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { ModelObject } from "../../../model/entity/modelobject";
import { ToastsManager } from "ng2-toastr";
import { isNullOrUndefined } from "util";

/**
 * This class contains the common functionality for a form for a CRUD model object.
 *
 * Created by mike on 12/4/2016.
 */
export abstract class CrudFormComponent<T extends ModelObject<T>> extends BaseCrudComponent<T> implements OnInit
{
    /**
     * The formGroup is the Dynamic Form object
     */
    protected formGroup: FormGroup;

    /**
     * C O N S T R U C T O R
     */
    constructor( protected toaster: ToastsManager,
                 protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudFormService: CrudFormService<T> )
    {
        super( toaster );
        if ( !this.modelObjectFactory )
        {
            throw new Error( "modelObjectFactory argument cannot be null" );
        }
        if ( !this.crudFormService )
        {
            throw new Error( "crudFormService argument cannot be null" );
        }
    }

    /**
     * Object initialization
     */
    public ngOnInit()
    {
        this.logger.debug( "ngOnInit.begin" );
        this.modelObject = this.modelObjectFactory.newModelObject();
        this.formGroup = this.createCrudForm();
        this.subscribeToFormChanges();
        this.subscribeToCrudFormServiceEvents();
        // Tell everyone that we are done
        this.crudFormService.sendComponentInitializedEvent();
        this.logger.debug( "ngOnInit.end" );
    }

    public ngAfterViewInit()
    {
        this.logger.debug( "ngAfterViewInit.begin" );
        this.logger.debug( "ngAfterViewInit.end" );
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
        this.logger.debug( "subscribeToFormChanges.begin" );
        /*
         * Initialize the change stream, the $ means an Observable variable
         */
        const myFormValueChanges$ = this.formGroup.valueChanges;
        /*
         * Subscribe to the stream
         */
        myFormValueChanges$.subscribe( (formData: any) =>
                                       {
                                           this.onFormChange( formData );
                                       });
        this.logger.debug( "subscribeToFormChanges.end" );
    }

    /**
     * Subscribes to {@code CrudFormService} events through the {@code crudFormService} service.
     */
    protected subscribeToCrudFormServiceEvents()
    {
        this.logger.debug( "subscribeToCrudFormServiceEvents.begin" );
        this.crudFormService.subscribeToFormResetEvent( () => this.resetForm() );
        this.crudFormService.subscribeToCrudOperationChangeEvent( ( crudOperation: CrudOperation ) =>
                                                                         this.crudOperationChanged( crudOperation ) );
        this.crudFormService.subscribeToModelObjectChangedEvent( ( modelObject: T ) =>
                                                                       this.modelObjectChanged( modelObject ) );
        this.logger.debug( "subscribeToCrudFormServiceEvents.end" );
    }

    /**
     * This method must be override to create the formGroup
     */
    protected abstract createCrudForm(): FormGroup;

    /**
     * Identify visual fields that should be read only
     */
    protected readOnlyFields(): Array<string>
    {
        return [];
    }

    /**
     * This method is called whenever the crudOperation changes.
     * @param crudOperation
     * @override
     */
    protected crudOperationChanged( crudOperation: CrudOperation )
    {
        super.crudOperationChanged( crudOperation );
        this.enableDisableInputs();
    }

    /**
     * This method is called whenever the modelObject changes
     * @param modelObject
     * @override
     */
    protected modelObjectChanged( modelObject: T ): any
    {
        /*
         * Clear the form fields of any previous model object.
         */
        this.formGroup.reset();
        super.modelObjectChanged( modelObject );
        this.enableDisableInputs();
        if ( modelObject )
        {
            this.setFormValues( modelObject );
        }
    }

    /**
     * Extract the model object properties and attempt to set the form values based on the name of the model
     * object property
     * @param {T} modelObject
     */
    protected setFormValues( modelObject: T )
    {
        this.debug( "setFormValues: " + JSON.stringify( modelObject ));
        for ( var property in this.modelObject )
        {
            if ( !isNullOrUndefined( this.formGroup.controls[property] ) &&
                 this.formGroup.controls[property] instanceof FormControl )
            {
                this.setFormValue( property, modelObject[property] );
            }
        }
    }

    /**
     * Sets a single form control value
     * @param {string} fieldName
     * @param fieldValue
     */
    protected setFormValue( fieldName: string, fieldValue: any )
    {
        this.debug( "setFormValue fieldName: " + fieldName + " fieldValue: " + fieldValue );
        (<FormControl>this.formGroup.controls[fieldName]).setValue( fieldValue );
    }

    protected isControl( controlName: string ): boolean
    {
        var returnValue = false;
        for ( let fieldName in this.formGroup.controls )
        {
            if ( controlName === fieldName )
            {
                returnValue = true;
                break;
            }
        }
        return returnValue;
    }

    /**
     * Initializes the form and the model object to empty values
     */
    protected resetForm()
    {
        this.logger.debug( "resetForm" );
        this.formGroup.reset();
        this.modelObject = this.modelObjectFactory.newModelObject();
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
        if ( !this.formGroup.valid )
        {
            //this.debug( "Form is not valid" );
            for ( let propertyName in this.formGroup.errors )
            {
                if ( this.formGroup.errors.hasOwnProperty( propertyName ) &&
                     this.formGroup.touched )
                {
                    var errorMessage = ValidationService.getValidatorErrorMessage( propertyName,
                                                                                   this.formGroup.errors[propertyName] );
                    this.log( methodName + " error: " + errorMessage );
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
        this.crudFormService.sendFormValidEvent( this.formGroup.valid );
    }

    /**
     * Emits an event to indicate that the form is dirty (true) clean (false).
     * The event value contains a boolean flag that indicates whether the form
     * is dirty or clean.
     */
    protected emitFormDirtyChange()
    {
        //this.logger.debug( "emitFormDirtyChange" );
        this.crudFormService.sendFormDirtyEvent( this.formGroup.dirty );
    }

    /**
     * Depending on the type of {@code CrudOperation} enables or disables the
     * components
     */
    protected enableDisableInputs()
    {
        var methodName = "enableDisableInputs";
        this.logger.debug( methodName );
        if ( this.formGroup )
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
            this.logger.debug( methodName + " this.formGroup is null" );
        }
    }

    /**
     * Disables the input fields
     */
    protected disableInputs(): void
    {
        this.logger.debug( "disableInputs" );
        if ( this.formGroup )
        {
            for ( let fieldName in this.formGroup.controls )
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
        this.logger.debug( "formGroup.disableField " + fieldName );
        //this.formGroup.disable( fieldName );
        this.formGroup.controls[fieldName].disable();
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
            for ( let fieldName in this.formGroup.controls )
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
            this.formGroup.controls[fieldName].enable();
            this.logger.debug( "formGroup.enableField enable: " + fieldName );
        }
        else
        {
            this.formGroup.controls[fieldName].disable();
            this.logger.debug( "formGroup.enableField disable: " + fieldName );
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
        for ( var name of this.readOnlyFields() )
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
            case CrudOperation.CREATE:
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
