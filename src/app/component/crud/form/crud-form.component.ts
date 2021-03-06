//import { OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ValidationService } from "../../../service/validation-service";
import { CrudOperation } from "../common/crud-operation";
import { BaseCrudComponent } from "../common/base-crud.component";
import { ModelObject } from "../../../model/common/model-object";
import { ToastsManager } from "ng2-toastr";
import { isNullOrUndefined } from "util";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { INVALID } from "@angular/forms/src/model";
import { Subscription } from "rxjs/Subscription";
import { Observable } from "rxjs/Observable";
import { ModelObjectChangedEvent } from "../../../service/crud/model-object-changed.event";
import { CrudStateStore } from '../common/crud-state-store';
import { CrudController } from '../common/crud-controller';
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';
import { ChangeDetectorRef, Input, OnInit } from '@angular/core';

/**
 * This class contains the common functionality for a form for a CRUD model object.
 *
 * Created by mike on 12/4/2016.
 */
export abstract class CrudFormComponent<T extends ModelObject<T>> extends BaseCrudComponent<T> implements OnInit
{
    @Input()
    protected continuousAddEnabled: boolean = false;

    /**
     * The formGroup is the Dynamic Form object
     */
    protected formGroup: FormGroup;
    protected continuousAdd: boolean = false;
    private ngOnInitCompletedSubject: BehaviorSubject<boolean> = new BehaviorSubject( false );
    private loadResourcesCompletedSubject: BehaviorSubject<boolean> = new BehaviorSubject( false );
    private resourceLoaders: Observable<boolean>[] = [];

    /**
     * Constructor.
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {CrudController<T extends ModelObject<T>>} crudController
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudRestService<T extends ModelObject<T>>} crudRestService
     */
    protected constructor( protected changeDetector: ChangeDetectorRef,
                           protected toaster: ToastsManager,
                           protected crudStateStore: CrudStateStore<T>,
                           protected crudController: CrudController<T>,
                           protected modelObjectFactory: ModelObjectFactory<T>,
                           protected crudRestService: CrudRestService<T> )
    {
        super( changeDetector, toaster, crudStateStore, crudController, modelObjectFactory, crudRestService );
    }

    /**
     * Object initialization
     */
    public ngOnInit(): void
    {
        const methodName = 'ngOnInit';
        this.logMethodBegin( methodName );
        this.resourceLoaders = this.loadResources();
        super.ngOnInit();
        this.logMethodEnd( methodName );
    }

    /**
     * This method notifies all subject observers that the ngOnInit method has completed.
     * Subclasses should override this method and defer the subject notification if there are
     * other depending activities that need to be performed before sending this event.
     */
    protected sendNgOnInitCompletedEvent()
    {
        this.debug( "sendNgOnInitCompletedEvent.begin" );
        this.ngOnInitCompletedSubject.next( true );
        this.debug( "sendNgOnInitCompletedEvent.end" );
    }

    /*
    public ngAfterContentInit(): void
    {
        this.debug( 'ngAfterContentInit' );
    }

    public ngAfterContentChecked(): void
    {
        this.debug( 'ngAfterContentChecked' );
    }
    */

    /**
     * Complete the initialization after all of the components have been initialized.
     */
    public ngAfterViewInit(): void
    {
        const methodName = "ngAfterViewInit";
        this.debug( methodName + ".begin" );
        this.debug( methodName + " crudOperation: " + this.CrudOperation.getName( this.crudOperation ) );
        this.debug( methodName + " modelObject: " + JSON.stringify( this.modelObject ));
        super.ngAfterViewInit();
        this.initializeForm();
        if ( this.isCrudDeleteOperation() ||
             this.isCrudUpdateOperation() )
        {
            this.setFormValues( this.modelObject );
        }
        else
        {
            this.setDefaultValues();
            this.setFormValues( this.modelObject );
        }
        this.subscribeToCrudFormServiceEvents();
        this.crudController
            .sendFormLogStateRequest();
        if ( this.resourceLoaders.length > 0 )
        {
            this.debug( "Waiting for " + this.resourceLoaders.length + " resource loaders" );
            /*
             * Run all of the loaders and wait for them to complete.
             */
            Observable.forkJoin( this.resourceLoaders )
                      .subscribe( results =>
                                  {
                                      this.debug( "CrudFormComponent.ngOnInit results: " + JSON.stringify( results ));
                                      this.debug( "CrudFormComponent.ngOnInit.end" );
                                      this.sendNgOnInitCompletedEvent();
                                  });
        }
        else
        {
            this.sendNgOnInitCompletedEvent();
        }
        this.crudController
            .sendFormLogStateRequest();
        /*
         * Notify the dialog or panel that the form is ready to be displayed.
         * Need to run this on the next change cycle.
         */
        this.tickThenRun( () => this.crudController
                                        .sendFormReadyToDisplay( true ) );
        this.enableDisableInputs()
        this.changeDetector
            .detectChanges();
        this.debug( methodName + '.end' );
    }

    /**
     * Determines if all of the required data/gui components are initialized in order for the form to function.
     * @return {boolean}
     */
    public isInitialized()
    {
        return !isNullOrUndefined( this.crudOperation ) &&
               !isNullOrUndefined( this.modelObject ) &&
               !isNullOrUndefined( this.formGroup )  &&
               !this.isCrudNoneOperation();
    }

    /**
     * This method is called when the crud operation changes.
     * @param {CrudOperation} crudOperation
     */
    protected onCrudOperationChanged( crudOperation: CrudOperation )
    {
        if ( this.continuousAddEnabled )
        {
            this.debug( 'onCrudOperationChanged ignored - continuous add enabled' );
        }
        else
        {
            super.onCrudOperationChanged( crudOperation );
        }
    }

    /**
     * This method is called at the beginning of the {@code ngOnInit}.  It is provided to provide subclasses a place
     * to load external data required for the form. Override this method and return a {@code BehaviourSubject} for each
     * resource loadingData task.  Be sure to add the parents jobs to the returned array --> super.loadResources()
     */
    protected loadResources(): Observable<boolean>[]
    {
        return [];
    }

    /**
     * This method sends any subscribers a true message to indicate the resource loadingData has completed.
     * process.
     */
    protected onLoadResourcesCompleted(): void
    {
        this.debug( "onLoadResourcesCompleted" );
        this.loadResourcesCompletedSubject.next( true );
    }

    /**
     * This method will wait for the ngOnInit completion subject to send a true modelObjectRows which indicates that the method
     * has completed.
     *
     * @param {() => void} completionFunction
     */
    protected waitForCompletion( taskName: string, subject: BehaviorSubject<boolean>, completionFunction: () => void )
    {
        this.debug( "waitForNgOnInitCompletion.begin " + taskName );
        this.ngOnInitCompletedSubject.subscribe( ( completed: boolean ) =>
        {
            /*
             * Check to see if we need to set the source name on the form
             */
            if ( completed )
            {
                completionFunction();
                this.debug( "waitForNgOnInitCompletion.end " + taskName );
            }
        });
    }

    /**
     * This method will notify the subscriber when a non null modelObject has been loaded.
     * @param {(modelObject) => any} fn
     */
    protected waitForValidModelObject( fn: ( modelObject ) => any )
    {
        while ( isNullOrUndefined( this.modelObject ))
        {
            this.debug( "waitForValidModelObject waiting" );
            let subscription: Subscription = this.crudStateStore
                                                 .subscribeToModelObjectChangedEvent( ( modelObjectChangeEvent: ModelObjectChangedEvent<T> ) =>
            {
                this.debug( "waitForValidModelObject " + JSON.stringify( modelObjectChangeEvent ) );
                if ( !isNullOrUndefined( modelObjectChangeEvent ))
                {
                    this.debug( "waitForValidModelObject found" );
                    fn( modelObjectChangeEvent.modelObject );
                    subscription.unsubscribe();
                }
            })
        }
    }

    /**
     * Subscribes to {@code CrudFormService} events through the {@code crudStateStore} service.
     */
    protected subscribeToCrudFormServiceEvents(): void
    {
        const methodName = 'subscribeToCrudFormServiceEvents';
        this.debug( methodName + '.begin' );
        /*
         * Reset button
         */
        this.addSubscription( 'subscribeToFormResetEvent',
            this.crudController
                .subscribeToFormResetEvent( () => this.resetForm() ));
        /*
         * Prepare to save
         */
        this.addSubscription('subscribeToFormPrepareToSaveEvent',
            this.crudController
                .subscribeToFormPrepareToSaveEvent( () => this.prepareToSave() ));

        this.debug( methodName + '.end' );
    }

    /**
     * This method is called as a result of receiving a notification from the dialog or panel that it's time to create
     * the form.  It creates the for group and subscribes to form change events.
     */
    protected initializeForm(): void
    {
        this.debug( "initializeForm.begin" );
        this.formGroup = this.createFormGroup();
        //this.formGroup.addControl( 'errors', new FormControl( this.errors ));
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
        this.debug( "prepareToSave" );
    }

    /**
     * This method is called when a new model object is being created or when the reset button is clicked.
     * This method only calls {@code setFormValue} so for subclasses that override this method, set the model object
     * modelObjectRows sand then call {@code super.setDefaultValues()}.
     */
    protected setDefaultValues(): void
    {
        this.debug( "setDefaultValues" );
    }

    /**
     * Extract the model object properties and attempt to set the form values based on the name of the model
     * object property
     * @param {T} modelObject
     */
    protected setFormValues( modelObject: T ): void
    {
        const methodName = 'setFormValues';
        this.debug( methodName + '.begin: ' + JSON.stringify( modelObject ));
        if ( isNullOrUndefined( this.modelObject ) )
        {
            throw new ReferenceError( "modelObject has not been set'" );
        }
        for ( var property in this.modelObject )
        {
            if ( !isNullOrUndefined( this.formGroup.controls[property] ) &&
                 this.formGroup.controls[property] instanceof FormControl )
            {
                this.setFormValue( property, modelObject[property] );
            }
        }
        this.debug( methodName + '.end' );
    }

    /**
     * Sets a single form control modelObjectRows
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
            this.debug( 'setFormValue WARNING: null or undefined field modelObjectRows for ' + fieldName );
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
     * Clears the model object and the crud operation and then reset the form so that is contains empty fields.
     */
    protected clearForm(): void
    {
        const methodName = 'clearForm';
        this.debug( methodName + '.begin' );
        let modelObject: T = this.modelObjectFactory
                                 .newModelObject();
        this.crudStateStore
            .sendCrudOperationChangedEvent( CrudOperation.NONE );
        this.crudStateStore
            .sendModelObjectChangedEvent( this, modelObject );
        this.resetForm();
        this.debug( methodName + '.end' );
    }

    /**
     * Initializes the form to the current model object and default values.
     */
    protected resetForm(): void
    {
        this.debug( "resetForm" );
        if ( this.formGroup )
        {
            this.formGroup.reset();
            this.setDefaultValues();
            this.setFormValues( this.modelObject );
        }
    }

    /**
     * This method is called whenever there is a change in the form data
     * @param formData
     * @return {any}
     */
    protected onFormChange( formData: any ): void
    {
        const methodName = "onFormChange";
        //this.debug( "onFormChange.begin " + JSON.stringify( formData ) );
        this.emitFormDirtyChange();
        this.emitFormValidChange();
        //this.modelObjectChange.emit( this.modelObject );
        if ( !this.formGroup.valid )
        {
            //this.debug( methodName + " Form is not valid" );
            let errors: string[] = [];
            for ( let propertyName in this.formGroup.controls )
            {
                //this.debug( methodName + " propertyName: " + propertyName +
                //                         " status: " + this.formGroup.controls[propertyName].status );
                if ( this.formGroup.controls[propertyName].status == 'INVALID' )
                {
                    errors.push( propertyName + " is not valid" );
                    this.invalidProperty( propertyName );
                }
            }
            for ( let propertyName in this.formGroup.errors )
            {
                //this.debug( methodName + " propertyName: " + this.formGroup.errors[propertyName] );
                if ( this.formGroup.errors.hasOwnProperty( propertyName ) &&
                     this.formGroup.touched )
                {
                    let errorMessage = ValidationService.getValidatorErrorMessage( propertyName,
                                                                                   this.formGroup.errors[propertyName] );
                    //this.debug( methodName + " error: " + errorMessage );
                    errors.push( errorMessage );
                }
            }
            this.crudController.sendFormErrors( errors );
            this.log( JSON.stringify( errors ));
        }
        else
        {
            //this.debug( methodName + " Form IS valid" );
        }
        //this.debug( methodName + ".end" );
    }

    /**
     * Emits an event to indicate that the form validity has changed.
     * The event modelObjectRows contains a boolean flag that indicates whether the form
     * is valid or not
     */
    protected emitFormValidChange(): void
    {
        //this.debug( "emitFormValidChange" );
        this.crudController
            .sendFormValidEvent( this.formGroup.valid );
    }

    /**
     * Emits an event to indicate that the form is dirty (true) clean (false).
     * The event modelObjectRows contains a boolean flag that indicates whether the form
     * is dirty or clean.
     */
    protected emitFormDirtyChange(): void
    {
        //this.debug( "emitFormDirtyChange" );
        this.crudController
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
            this.debug( methodName + " crudOperation: " + CrudOperation.getName( this.crudOperation ));
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
     * Determines if the components should be disabled.
     * @return {boolean}
     */
    protected shouldDisable()
    {
        const methodName = 'shouldDisable';
        var readOnly: boolean = this.isModelObjectReadOnly( this.modelObject );
        this.debug( methodName + " crudOperation: " + CrudOperation.getName( this.crudOperation ));
        this.debug( methodName + " isModelObjectReadOnly: " + readOnly );
        return this.crudOperation == CrudOperation.NONE || readOnly;
    }

    /**
     * Disables the input fields
     */
    protected disableInputs(): void
    {
        this.debug( "disableInputs" );
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
        this.debug( "formGroup.disableField " + fieldName );
        this.formGroup.controls[fieldName].disable();
    }

    /**
     * Enable the input fields
     */
    protected enableInputs(): void
    {
        this.debug( "enableInputs" );
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
        if ( !isNullOrUndefined( this.formGroup ) && !isNullOrUndefined( this.formGroup.controls ))
        {
            let doEnable = true;
            if ( this.crudOperation == CrudOperation.UPDATE &&
                this.isPrimaryKeyField( fieldName ) )
            {
                doEnable = false;
            }
            if ( doEnable )
            {
                this.formGroup.controls[fieldName].enable();
                this.debug( "formGroup.enableField enable: " + fieldName );
            }
            else
            {
                this.formGroup.controls[fieldName].disable();
                this.debug( "formGroup.enableField disable: " + fieldName );
            }
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
     * This method is called when the user clicks on the save button but before the model object is saved.
     * This method called {@code prepareToSave()} to allow subclasses to perform any data cleanup or data
     * calculations.
     * @param {T} modelObject
     */
    protected onSaveButtonClicked(): void
    {
        const methodName = "onSaveButtonClicked";
        this.debug( methodName + " " + JSON.stringify( this.modelObject ) );
        this.prepareToSave();
    }

    /**
     * This method is called after the successful completion of the saving of the model object.
     * @param {T} modelObject
     */
    protected onAddButtonClicked(): void
    {
        const methodName = "onAddButtonClicked";
        this.debug( methodName + " " + JSON.stringify( this.modelObject ) );
        this.prepareToDisplay()
    }

    /**
     * This is called after a model object has been added to the database.
     * We must decouple the model object from the state store model object because this method will change the values
     * of the model object.
     * @param {T} modelObject
     */
    protected onModelObjectCreated( modelObject: T ): void
    {
        const methodName = 'onModelObjectCreated';
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        //super.onModelObjectCreated( modelObject );
        this.modelObject = this.modelObjectFactory.newModelObject();
        this.setDefaultValues();
        this.setFormValues( this.modelObject );
    }

    /**
     * This method is called after a model object has been saved to the database.  At this point, we must decouple the
     * model object from the state store since we are going to reset the values.
     * @param {T} modelObject
     */
    protected onModelObjectSaved( modelObject: T ): void
    {
        const methodName = 'onModelObjectSaved';
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        //super.onModelObjectSaved( modelObject );
        //this.clearForm();
        this.modelObject = this.modelObjectFactory.newModelObject();
        this.setDefaultValues();
        this.setFormValues( this.modelObject );
    }

    /**
     * This method is called after a model object has been deleted from the database.
     * @param {T} modelObject
     */
    protected onModelObjectDeleted( modelObject: T ): void
    {
        const methodName = 'onModelObjectDeleted';
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        //super.onModelObjectDeleted( modelObject );
        this.modelObject = this.modelObjectFactory.newModelObject();
        this.clearForm();
    }

    /**
     * This method is called just before the dialog is displayed.
     * This method is meant to contain initialization logic outside of the creation initialization.  Once created,
     * a form is not created again and there may be some initialization logic to be performed each time the form
     * is displayed.
     */
    protected prepareToDisplay(): void
    {
        this.debug( "prepareToDisplay" );
        //this.setFormValues( this.modelObject );
    }

    /**
     * This method is called when a form control fields is invalid.
     * @param {string} propertyName
     */
    protected invalidProperty( propertyName: string )
    {
        //this.debug( "invalidProperty " + propertyName );
    }

    protected debug( message: string ): void
    {
        super.debug( "CrudFormComponent." + message );
    }
}
