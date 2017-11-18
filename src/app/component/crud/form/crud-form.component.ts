import { Input, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ValidationService } from "../../../service/validation-service";
import { CrudOperation } from "../common/crud-operation";
import { BaseCrudComponent } from "../common/base-crud.component";
import { ModelObject } from "../../../model/entity/modelobject";
import { ToastsManager } from "ng2-toastr";
import { isNullOrUndefined } from "util";
import { CrudServiceContainer } from "../common/crud-service-container";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ModelObjectCrudOperationSubjectInfo } from "../dialog/modelobject-crudoperation-subject-info";

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
    protected continuousAdd: boolean = false;
    protected ngOnInitCompletedSubject: BehaviorSubject<boolean> = new BehaviorSubject( false );
    protected loadResourcesCompletedSubject: BehaviorSubject<boolean> = new BehaviorSubject( false );

    /**
     * C O N S T R U C T O R
     */
    constructor( protected toaster: ToastsManager,
                 private crudServiceContainer: CrudServiceContainer<T> )
    {
        super( toaster );
        if ( !this.crudServiceContainer.modelObjectFactory )
        {
            throw new Error( "modelObjectFactory argument cannot be null" );
        }
        if ( !this.crudServiceContainer.crudFormService )
        {
            throw new Error( "crudFormService argument cannot be null" );
        }
    }

    /**
     * Object initialization
     */
    public ngOnInit()
    {
        this.debug( "ngOnInit.begin" );
        this.loadResources();
        //this.modelObject = this.crudServiceContainer.modelObjectFactory.newModelObject();
        this.subscribeToCrudFormServiceEvents();
        this.initializeForm();
        // Tell everyone that we are done
        this.sendComponentInitializedCompletedEvent();
        this.ngOnInitCompletedSubject.next( true );
        this.debug( "ngOnInit.end" );
    }

    public ngAfterContentInit()
    {
        this.debug( "ngAfterContentInit" );
    }

    public ngAfterViewInit()
    {
        this.debug( "ngAfterViewInit" );
    }

    /**
     * This method is called after {@code ngOnInit() and loadResources() have both completed}
     */
    protected postInit(): void
    {
        this.debug( "postInit" );
    }

    /**
     * This method is called at the beginning of the {@code ngOnInit}.  It is provided to provide subclasses a place
     * to load external data required for the form.  By default, this method only called {@code onLoadResourcesCompleted} to
     * send the proper observable message.
     */
    protected loadResources(): void
    {
        this.debug( "loadResources" );
        this.onLoadResourcesCompleted();
    }

    /**
     * This method sends any subscribers a true message to indicate the resource loading has completed.
     * It will also call {@code postInit} if and when {@codg ngOnInit} has completed.
     */
    protected onLoadResourcesCompleted(): void
    {
        this.debug( "onLoadResourcesCompleted.begin" );
        /*
         * Must wait for the ngOnInit to complete so that we can call postInit
         */
        var completionFunction = () =>
        {
            this.loadResourcesCompletedSubject.next( true );
            this.postInit();
        }
        /*
         * Check to see if we need to set the source name on the form
         */
        if ( !this.ngOnInitCompletedSubject.getValue() )
        {
            this.debug( "waiting for ngOnInit to completed" );
            this.ngOnInitCompletedSubject
                .asObservable()
                .subscribe( () =>
                            {
                                completionFunction();
                            })
        }
        else
        {
            completionFunction();
        }
    }

    /**
     * This method is called at the end of the ngOnInit method.  Override this event to add additional logic on when
     * to send this event.
     */
    protected sendComponentInitializedCompletedEvent(): void
    {
        this.debug( "sendComponentInitializedCompletedEvent" );
        this.crudServiceContainer.crudFormService.sendComponentInitializedEvent();
    }

    /**
     * Subscribes to {@code CrudFormService} events through the {@code crudFormService} service.
     */
    protected subscribeToCrudFormServiceEvents(): void
    {
        this.debug( "subscribeToCrudFormServiceEvents.begin" );
        this.addSubscription(
            this.crudServiceContainer
                .crudFormService
                .subscribeToModelObjectCrudOperationChangedEvent(
                    ( subjectInfo: ModelObjectCrudOperationSubjectInfo ) =>
                        this.onModelObjectCrudOperationChanged( subjectInfo ) ));
        /*
         * Reset button
         */
        this.addSubscription(
            this.crudServiceContainer
                .crudFormService
                .subscribeToFormResetEvent( () => this.resetForm() ));
        /*
         * Prepare to save
         */
        this.addSubscription(
            this.crudServiceContainer
                .crudFormService
                .subscribeToFormPrepareToSaveEvent( () => this.prepareToSave() ));
        /*
         * Model Object version update
         */
        this.addSubscription(
            this.crudServiceContainer
                .crudFormService
                .subscribeToFormModelObjectVersionUpdateEvent( ( modelObject: T ) => this.onModelObjectVersionUpdate( modelObject ) ));
        /*
         * Save button
         */
        this.addSubscription(
            this.crudServiceContainer
                .crudFormButtonsService
                .subscribeToSaveButtonClickedEvent( ( modelObject: T ) => this.onSaveCompleted( modelObject ) ));
        this.debug( "subscribeToCrudFormServiceEvents.end" );
    }

    /**
     * This method is called as a result of receiving a notification from the dialog or panel that it's time to create
     * the form.  It creates the for group and subscribes to form change events.
     */
    protected initializeForm(): void
    {
        this.debug( "initializeForm.begin" );
        this.formGroup = this.createFormGroup();
        this.subscribeToFormChanges();
        this.debug( "initializeForm.end" );
    }

    /**
     * This method must be override to create the formGroup
     */
    protected abstract createFormGroup(): FormGroup;

    /**
     * This method will subscribe to events for the stock form.
     * As data changes, or other events occur, this method will be called.
     *
     * The following three events will be emitted for each change:
     * 1. formDirtyChange<boolean>
     * 2. formValidChange<boolean>
     * 3. modelObjectChange<T>
     */
    protected subscribeToFormChanges(): void
    {
        this.debug( "subscribeToFormChanges.begin" );
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
        this.debug( "subscribeToFormChanges.end" );
    }

    /**
     * Identify visual fields that should be read only
     */
    protected readOnlyFields(): Array<string>
    {
        return [];
    }

    /**
     * This method is called when the user clicks on the save button to allow the form to perform any final processing
     * to prepare the model object before it is sent to the backend to be saved.
     */
    protected prepareToSave(): void
    {
        this.log( "prepareToSave" );
    }

    /**
     * This method is called whenever the crudOperation changes.
     * @param crudOperation
     * @override
     */
    protected onCrudOperationChanged( crudOperation: CrudOperation ): void
    {
        super.onCrudOperationChanged( crudOperation );
        this.enableDisableInputs();
    }

    /**
     * This method is called whenever the modelObject changes
     * @param modelObject
     * @override
     */
    protected onModelObjectChanged( modelObject: T ): void
    {
        this.debug( "onModelObjectChanged " + JSON.stringify( this.modelObject ));
        /*
         * Clear the form fields of any previous model object.
         */
        if ( !isNullOrUndefined( this.formGroup ))
        {
            this.resetForm();
        }
        super.onModelObjectChanged( modelObject );
        this.enableDisableInputs();
        if ( modelObject )
        {
            this.setFormValues( modelObject );
        }
        this.crudServiceContainer
            .crudFormService
            .sendFormLogStateRequest();
    }

    /**
     * This method is called when a new version of the model object was loaded.
     * @param {T} modelObject
     */
    protected onModelObjectVersionUpdate( modelObject: T ): void
    {
        this.debug( "onModelObjectVersionUpdate " + JSON.stringify( modelObject ) );
    }

    /**
     * This method is called by the dialog to set the model object and crud operation for the form.
     * @param {ModelObjectCrudOperationSubjectInfo} subjectInfo
     */
    protected onModelObjectCrudOperationChanged( subjectInfo: ModelObjectCrudOperationSubjectInfo ): void
    {
        this.debug( "onModelObjectCrudOperationChanged.begin" );
        this.setCrudOperation( subjectInfo.crudOperation );
        this.setModelObject( subjectInfo.modelObject );
        this.debug( "onModelObjectCrudOperationChanged.end" );
    }

    /**
     * Extract the model object properties and attempt to set the form values based on the name of the model
     * object property
     * @param {T} modelObject
     */
    protected setFormValues( modelObject: T ): void
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
    protected setFormValue( fieldName: string, fieldValue: any ): void
    {
        this.debug( "setFormValue fieldName: " + fieldName + " fieldValue: " + fieldValue );
        if ( isNullOrUndefined( fieldName ) )
        {
            this.debug( 'setFormValue WARNING: null or undefined field name' );
            return;
        }
        if ( isNullOrUndefined( fieldValue ) )
        {
            this.debug( 'setFormValue WARNING: null or undefined field value for ' + fieldName );
            return;
        }
        if ( isNullOrUndefined( this.formGroup.controls[fieldName] ))
        {
            this.debug( 'setFormValue WARNING: there is no form control for field ' + fieldName );
            return;
        }
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
    protected resetForm(): void
    {
        this.debug( "resetForm" );
        this.formGroup.reset();
    }

    /**
     * This method is called whenever there is a change in the form data
     * @param formData
     * @return {any}
     */
    protected onFormChange( formData: any ): void
    {
        var methodName = "onFormChange";
        //this.debug( "onFormChange.begin " + JSON.stringify( formData ) );
        this.emitFormDirtyChange();
        this.emitFormValidChange();
        //this.modelObjectChange.emit( this.modelObject );
        if ( !this.formGroup.valid )
        {
            /*
            this.debug( methodName + " Form is not valid" );
            for ( let propertyName in this.formGroup.controls )
            {
                this.debug( methodName + " propertyName: " + propertyName +
                                         " status: " + this.formGroup.controls[propertyName].status );
            }
            */
            for ( let propertyName in this.formGroup.errors )
            {
                this.debug( methodName + " propertyName: " + this.formGroup.errors[propertyName] );
                if ( this.formGroup.errors.hasOwnProperty( propertyName ) &&
                     this.formGroup.touched )
                {
                    var errorMessage = ValidationService.getValidatorErrorMessage( propertyName,
                                                                                   this.formGroup.errors[propertyName] );
                    this.debug( methodName + " error: " + errorMessage );
                    return errorMessage;
                }
            }
        }
        else
        {
            this.debug( methodName + " Form IS valid" );
        }
        //this.debug( methodName + ".end" );
    }

    /**
     * Emits an event to indicate that the form validity has changed.
     * The event value contains a boolean flag that indicates whether the form
     * is valid or not
     */
    protected emitFormValidChange(): void
    {
        //this.debug( "emitFormValidChange" );
        this.crudServiceContainer
            .crudFormService
            .sendFormValidEvent( this.formGroup.valid );
    }

    /**
     * Emits an event to indicate that the form is dirty (true) clean (false).
     * The event value contains a boolean flag that indicates whether the form
     * is dirty or clean.
     */
    protected emitFormDirtyChange(): void
    {
        //this.debug( "emitFormDirtyChange" );
        this.crudServiceContainer
            .crudFormService
            .sendFormDirtyEvent( this.formGroup.dirty );
    }

    /**
     * Depending on the type of {@code CrudOperation} enables or disables the
     * components
     */
    protected enableDisableInputs(): void
    {
        var methodName = "enableDisableInputs";
        this.debug( methodName );
        if ( this.formGroup )
        {
            var readOnly: boolean = this.isModelObjectReadOnly( this.modelObject );
            this.debug( methodName + " crudOperation: " + this.crudOperation );
            this.debug( methodName + " isModelObjectReadOnly: " + readOnly );
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
            this.debug( methodName + " this.formGroup is null" );
        }
    }

    /**
     * Disables the input fields
     */
    protected disableInputs(): void
    {
        //this.debug( "disableInputs" );
        if ( this.formGroup )
        {
            for ( let property in this.formGroup.controls )
            {
                this.disableField( property );
            }
        }
    }

    /**
     * This method is called to disable the field
     *
     * @param fieldName
     */
    protected disableField( fieldName: string ): void
    {
        //this.debug( "formGroup.disableField " + fieldName );
        this.formGroup.controls[fieldName].disable();
    }

    /**
     * Enable the input fields
     */
    protected enableInputs(): void
    {
        //this.debug( "enableInputs" );
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
            //this.debug( "formGroup.enableField enable: " + fieldName );
        }
        else
        {
            this.formGroup.controls[fieldName].disable();
            //this.debug( "formGroup.enableField disable: " + fieldName );
        }
    }

    /**
     * Determines if {@code fieldName} is in the primary key fields array.
     * @param fieldName
     * @return {boolean}
     */
    protected isPrimaryKeyField( fieldName: string ): boolean
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
    protected isModelObjectReadOnly( modelObject: T ) : boolean
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

    /**
     * This method is called after the user has clicked the Save/Add button and it completed successfully.
     */
    protected onSaveCompleted( modelObject: T ): void
    {
        this.log( "onSaveCompleted" );
    }
}
