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

/**
 * This class is the base class for all CRUD components
 *
 * Created by mike on 12/9/2016.
 */
export class BaseCrudComponent<T extends ModelObject<T>> extends BaseComponent
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
    private modelObjectChangeSubject: BehaviorSubject<T> = new BehaviorSubject<T>( null );
    /**
     * The object that contains the form's data
     */
    protected modelObject: T;
    /**
     * Rest error reporting class.
     */
    private crudRestErrorReporter: CrudRestErrorReporter;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     */
    constructor( protected toaster: ToastsManager,
                 protected modelObjectFactory?: ModelObjectFactory<T> )
    {
        super( toaster );
        if ( !this.toaster )
        {
            throw new Error( "toaster argument cannot be null" );
        }
        this.crudRestErrorReporter = this.createCrudRestErrorReporter();
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
        this.modelObjectChangeSubject.next( null );
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
    protected subscribeToModelObjectChangeEvent( fn: ( T ) => any ): Subscription
    {
        return this.modelObjectChangeSubject.subscribe( fn );
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
        this.setCrudOperation( CrudOperation.NONE );
        this.setModelObject( this.modelObjectFactory.newModelObject() );
    }

   /**
    * This method is called whenever the model object changes.
    * @param modelObject
    */
   protected onModelObjectChanged( modelObject: T )
   {
       let methodName = "onModelObjectChanged";
       this.debug( methodName + " " + JSON.stringify( modelObject ) );
       this.setModelObject( modelObject );
       if ( !isNullOrUndefined( this.modelObject ) )
       {
           if ( this.modelObject.isEqualProperties( this.modelObject ))
           {
               this.debug( methodName + " the model objects are the same, not propagating changes " +
                   JSON.stringify( modelObject ));
           }
           else
           {
               this.modelObjectChangeSubject.next( this.modelObject );
           }
       }
   }

    /**
     * Allow sub classes to change the model object through a method that will record (log) the change.
     * @param modelObject
     */
   public setModelObject( modelObject: T )
   {
       this.debug( "setModelObject " + JSON.stringify( modelObject ));
       this.modelObject = modelObject;
   }

   /**
    * This method is called whenever the crudOperation changes.
    * @param crudOperation
    */
   protected onCrudOperationChanged( crudOperation: CrudOperation )
   {
       this.debug( "crudOperation change " + CrudOperation.getName( crudOperation ) );
       if ( this.crudOperation != crudOperation )
       {
           this.setCrudOperation( crudOperation );
       }
   }

    /**
     * Allow subclasses to change the {@code CrudOperation} and log the change.
     * @param crudOperation
     */
    public setCrudOperation( crudOperation: CrudOperation )
    {
        this.debug( "setCrudOperation " + CrudOperation.getName( crudOperation ));
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
     * Reports the error using the {@code toaster} and extracts the error information and returns that in the
     * return result.
     * @param {string} rawJsonError
     * @returns {TradeItException}
     */
    protected reportTradeItError( rawJsonError ): TradeItException
    {
        let exception: TradeItException = TradeItException.createException( rawJsonError );
        this.log( "Messages: " + exception.getMessages() );
        this.toaster.error( exception.getMessages(), "Error" )
        return exception;
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
