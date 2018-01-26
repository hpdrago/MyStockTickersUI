import { BaseComponent } from "../../common/base.component";
import { ModelObject } from "../../../model/entity/modelobject";
import { ToastsManager } from "ng2-toastr";
import { CrudOperation } from "./crud-operation";
import { Subscription } from "rxjs/Subscription";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { isNullOrUndefined } from "util";
import { RestException } from "../../../common/rest-exception";
import { TradeItException } from "../../../service/tradeit/tradeit-execption";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { CrudRestErrorReporter } from "../../../service/crud/crud-rest-error-reporter";
import { CrudStateStore } from "./crud-state-store";
import { OnInit } from "@angular/core";
import { ModelObjectChangedEvent } from "../../../service/crud/model-object-changed.event";
import { ModelObjectDeletedEvent } from "../../../service/crud/model-object-deleted-event";
import { ModelObjectCreatedEvent } from "../../../service/crud/model-object-created-event";

/**
 * This class is the base class for all CRUD components
 *
 * Created by mike on 12/9/2016.
 */
export class BaseCrudComponent<T extends ModelObject<T>> extends BaseComponent implements OnInit
{
    /**
     * Local type of enum so that it's available in the components HTML.
     * @type {CrudOperation}
     */
    protected CrudOperation = CrudOperation;
    /**
     * Identifies the type of CRUD action
     */
    protected crudOperation: CrudOperation = CrudOperation.NONE;
    private displayProgressBar: boolean = false;
    private _busyIndicator: Subscription;

    /**
     * The object that contains the form's data
     */
    protected modelObject: T;
    /**
     * Rest error rep
     */
    private crudRestErrorReporter: CrudRestErrorReporter;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     */
    constructor( protected toaster: ToastsManager,
                 protected crudStateStore?: CrudStateStore<T>,
                 protected modelObjectFactory?: ModelObjectFactory<T> )
    {
        super( toaster );
        if ( !this.toaster )
        {
            throw new Error( "toaster argument cannot be null" );
        }
        this.crudRestErrorReporter = this.createCrudRestErrorReporter();
        this.modelObject = modelObjectFactory.newModelObject();
    }

    /**
     * Initialize the instance.
     */
    public ngOnInit()
    {
        let methodName = "ngOnInit";
        this.log( methodName + ".begin" );
        this.subscribeToModelObjectChangeEvents();
        this.crudStateStore
            .subscribeToCrudOperationChangeEvent( (crudOperation: CrudOperation) => this.crudOperationChangedEvent( crudOperation ));
        this.log( methodName + ".end" );
    }

    /**
     * Creates the instance of the CRUD REST error report to be used to report exceptions.
     * @return {CrudRestErrorReporter}
     */
    protected createCrudRestErrorReporter(): CrudRestErrorReporter
    {
        return new CrudRestErrorReporter( this.toaster, this );
    }

    /**
     * Resets behaviour subjects to a default value.
     */
    protected resetSubjects(): void
    {
        this.crudStateStore.resetSubjects();
    }

    /**
     * Checks {@code this.modelObject} to make sure it's not null.
     * If it is null, a ReferenceError exception is thrown.
     */
    protected checkModelObjectReference(): void
    {
        if ( isNullOrUndefined( this.modelObject ) )
        {
            throw new ReferenceError( "this.modelObject is null or undefined." );
        }
    }

    /**
     * Subscribe to be notified when the model object has been changed.
     * @param {(T) => any} fn
     * @return {Subscription}
     */
    private subscribeToModelObjectChangeEvents()
    {
        this.debug( "subscribeToModelObjectChangeEvents" );
        this.crudStateStore
            .subscribeToModelObjectChangedEvent( (changeEvent: ModelObjectChangedEvent<T>) => this.onModelObjectChangedEvent( changeEvent ));
        this.crudStateStore
            .subscribeToModelObjectDeletedEvent( (deleteEvent: ModelObjectDeletedEvent<T>) => this.onModelObjectDeletedEvent( deleteEvent ));
        this.crudStateStore
            .subscribeToModelObjectCreatedEvent( (createEvent: ModelObjectCreatedEvent<T>) => this.onModelObjectCreatedEvent( createEvent ));
    }

    /**
     * This method is called from the {@code CrudStateStore} when a model object has changed.
     * The change event is evaluated and if the change was not sent by this instance (receiving our own event),
     * then the change will be propagated.
     * @param {ModelObjectChangedEvent<T extends ModelObject<T>>} modelObjectChangedEvent
     */
    protected onModelObjectChangedEvent( modelObjectChangedEvent: ModelObjectChangedEvent<T> )
    {
        let methodName = "onModelObjectChangedEvent";
        this.debug( methodName + " " + JSON.stringify( modelObjectChangedEvent.modelObject ));
        if ( !this.isReceivedOurOwnEvent( methodName, modelObjectChangedEvent ))
        {
            this.onModelObjectChanged( modelObjectChangedEvent.modelObject ) ;
        }
    }

    /**
     * This method is called from the {@code CrudStateStore} when a model object has been deleted.
     * The change event is evaluated and if the change was not sent by this instance (receiving our own event),
     * then the change will be propagated.
     * @param {ModelObjectDeletedEvent<T extends ModelObject<T>>} modelObjectDeletedEvent
     */
    protected onModelObjectDeletedEvent( modelObjectDeletedEvent: ModelObjectDeletedEvent<T> )
    {
        let methodName = "onModelObjectDeletedEvent";
        this.debug( methodName + " " + JSON.stringify( modelObjectDeletedEvent.modelObject ));
        if ( !this.isReceivedOurOwnEvent( methodName, modelObjectDeletedEvent ))
        {
            this.onModelObjectDeleted( modelObjectDeletedEvent.modelObject ) ;
        }
    }

    /**
     * This method is called from the {@code CrudStateStore} when a model object has been created.
     * The change event is evaluated and if the change was not sent by this instance (receiving our own event),
     * then the change will be propagated.
     * @param {ModelObjectCreatedEvent<T extends ModelObject<T>>} modelObjectCreatedEvent
     */
    protected onModelObjectCreatedEvent( modelObjectCreatedEvent: ModelObjectCreatedEvent<T> )
    {
        let methodName = "onModelObjectCreatedEvent";
        this.debug( methodName + " " + JSON.stringify( modelObjectCreatedEvent.modelObject ));
        if ( !this.isReceivedOurOwnEvent( methodName, modelObjectCreatedEvent ))
        {
            this.onModelObjectCreated( modelObjectCreatedEvent.modelObject ) ;
        }
    }

    /**
     * Determines if the sender of the model object object change event is this class instance.
     * @param {string} methodName
     * @param {ModelObjectChangedEvent<T extends ModelObject<T>>} modelObjectChangedEvent
     * @return {boolean}
     */
    protected isReceivedOurOwnEvent( methodName: string, modelObjectChangedEvent: ModelObjectChangedEvent<T> ): boolean
    {
        if ( modelObjectChangedEvent.sender == this && this.modelObject == modelObjectChangedEvent.modelObject )
        {
            this.debug( methodName + " received our own event" );
            return true;
        }
        return false;
    }

    /**
    * This method is called by the super class whenever an @Input() property changes.
    * It looks for specific common CRUD component properties and calls change methods
    * so that subclasses can be notified of these changes.
    * @param property
    * @param previousValue
    * @param newValue
    */
   protected inputPropertyChange( property: string, previousValue: any, newValue: any )
   {
      switch ( property )
      {
         case 'crudOperation':
             this.debug( "inputPropertyChange: " + property +
                 " previousValue: " + (previousValue ? JSON.stringify( previousValue ) : previousValue ) +
                 " newValue: " + (newValue ? JSON.stringify( newValue ) : newValue ));
             /*
              * The object might still be initializing so execute on next clock tick
              */
             this.onCrudOperationChanged( newValue );
             //this.onCrudOperationChanged( newValue );
             break;

         case 'modelObject':
             this.debug( "inputPropertyChange: " + property +
                 " previousValue: " + (previousValue ? JSON.stringify( previousValue ) : previousValue ) +
                 " newValue: " + (newValue ? JSON.stringify( newValue ) : newValue ));
             this.onModelObjectChanged( newValue );
             //this.onModelObjectChanged( newValue );
             break;

         //default:
             //this.debug( "inputPropertyChange: " + property + " previousValue: " + previousValue + " newValue: " + newValue );
      }
   }

    /**
     * Sets the crudOperation to NONE and the model object to an empty object.
     */
    protected resetCrudOperationAndModelObject()
    {
        this.debug( "resetCrudOperationAndModelObject" );
        this.crudStateStore.sendCrudOperationChangedEvent( CrudOperation.NONE );
        this.crudStateStore.sendModelObjectChangedEvent( this, this.modelObjectFactory.newModelObject() );
    }

   /**
    * This method is called whenever the model object changes.
    * It should only be called from the {@code crudStateStore} as the result of a model object change event.
    * @param modelObject
    */
   protected onModelObjectChanged( modelObject: T ): void
   {
       let methodName = "onModelObjectChanged";
       this.debug( methodName + " " + JSON.stringify( modelObject ) );
       this.modelObject = modelObject;
   }

    /**
     * This method is called whenever the model object is deleted.
     * It should only be called from the {@code crudStateStore} as the result of a model object deleted event.
     * @param modelObject
     */
    protected onModelObjectDeleted( modelObject: T ): void
    {
        let methodName = "onModelObjectDeleted";
        this.debug( methodName + " " + JSON.stringify( modelObject ) );
        this.modelObject = this.modelObject;
    }

    /**
     * This method is called whenever the model object is created.
     * It should only be called from the {@code crudStateStore} as the result of a model object create event.
     * @param modelObject
     */
    protected onModelObjectCreated( modelObject: T ): void
    {
        let methodName = "onModelObjectDeleted";
        this.debug( methodName + " " + JSON.stringify( modelObject ) );
        this.modelObject = this.modelObject;
    }

    /**
     * This method is called when crud state store receives a crud operation change.
     * @param {CrudOperation} crudOperation
     */
    private crudOperationChangedEvent( crudOperation: CrudOperation )
    {
        let methodName = "crudOperationChangedEvent";
        this.debug( methodName + " change " + CrudOperation.getName( crudOperation ) );
        this.onCrudOperationChanged( crudOperation );
    }

    /**
    * This method is called whenever the crudOperation changes.
    * @param crudOperation
    */
   protected onCrudOperationChanged( crudOperation: CrudOperation )
   {
       this.debug( "crudOperation change " + CrudOperation.getName( crudOperation ) );
       this.crudOperation = crudOperation;
   }

    /**
     * Returns true if the current {@code crudOperation} value is NONE
     * @return {boolean}
     */
    protected isCrudNoneOperation(): boolean
    {
        return this.crudOperation == CrudOperation.NONE;
    }

    /**
     * Returns true if the current {@code crudOperation} value is CREATE
     * @return {boolean}
     */
    protected isCrudCreateOperation(): boolean
    {
        return this.crudOperation == CrudOperation.CREATE;
    }

    /**
     * Returns true if the current {@code crudOperation} value is UPDATE
     * @return {boolean}
     */
    protected isCrudUpdateOperation(): boolean
    {
        return this.crudOperation == CrudOperation.UPDATE;
    }

    /**
     * Returns true if the current {@code crudOperation} value is DELETE
     * @return {boolean}
     */
    protected isCrudDeleteOperation(): boolean
    {
        return this.crudOperation == CrudOperation.DELETE;
    }

    protected get busyIndicator():Subscription
    {
        return this._busyIndicator;
    }

    protected set busyIndicator( busyIndicator: Subscription)
    {
        this.debug( "busyIndicator setting displayProgressBar to true");
        this._busyIndicator = busyIndicator;
        this.displayProgressBar = true;
        this._busyIndicator.add( ()=>
                                 {
                                     this.debug( "busyIndicator setting displayProgressBar to false" );
                                     this.displayProgressBar = false
                                 })
    }

    /**
     * Reports the error to the console and a visible message to the user.
     * @param rawJsonError The JSON text returned from the REST call
     */
    protected reportRestError( rawJsonError ): RestException
    {
        this.log( "reportRestError: " + JSON.stringify( rawJsonError ) );
        var restException: RestException = this.crudRestErrorReporter.reportRestError( rawJsonError );
        return restException;
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     * Override this method to customize the error message
     */
    public getDuplicateKeyErrorMessage(): string
    {
        return 'Sorry, you are attempting to create a duplicate entry';
    }
}
