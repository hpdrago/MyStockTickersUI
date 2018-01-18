import { BaseComponent } from "../../common/base.component";
import { ModelObject } from "../../../model/entity/modelobject";
import { ToastsManager } from "ng2-toastr";
import { CrudOperation } from "./crud-operation";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { isNullOrUndefined } from "util";
import { RestException } from "../../../common/rest-exception";
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { TradeItAPIResult } from "../../../service/tradeit/apiresults/tradeit-api-result";
import { TradeItException } from "../../../service/tradeit/tradeit-execption";
import { CrudServiceContainer } from "./crud-service-container";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
/**
 * This class is the base class for all CRUD components
 *
 * Created by mike on 12/9/2016.
 */
export class BaseCrudComponent<T extends ModelObject<T>> extends BaseComponent
{
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

    constructor( protected toaster: ToastsManager,
                 protected modelObjectFactory?: ModelObjectFactory<T> )
    {
        super( toaster );
        if ( !this.toaster )
        {
            throw new Error( "toaster argument cannot be null" );
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
             this.tickThenRun( () => this.onCrudOperationChanged( newValue ) );
             //this.onCrudOperationChanged( newValue );
             break;

         case 'modelObject':
             this.debug( "inputPropertyChange: " + property +
                 " previousValue: " + (previousValue ? JSON.stringify( previousValue ) : previousValue ) +
                 " newValue: " + (newValue ? JSON.stringify( newValue ) : newValue ));
             this.tickThenRun( () => this.onModelObjectChanged( newValue ) );
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
        this.setCrudOperation( CrudOperation.NONE );
        this.setModelObject( this.modelObjectFactory.newModelObject() );
    }

   /**
    * This method is called whenever the model object changes.
    * @param modelObject
    */
   protected onModelObjectChanged( modelObject: T )
   {
       //this.debug( "onModelObjectChanged " + JSON.stringify( modelObject ) );
       let methodName = "onModelObjectChanged";
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
       if ( this.crudOperation != this.crudOperation )
       {
           this.debug( "crudOperation change " + CrudOperation.getName( crudOperation ) );
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
        var restException: RestException;
        this.log( "reportRestError: " + JSON.stringify( rawJsonError ) );
        if ( rawJsonError.status )
        {
            restException = new RestException( rawJsonError );
            var message = restException.message;
            var status = restException.status;
            var error = restException.error;
            var exception = restException.exception;
            this.debug( "message: " + message );
            this.debug( "status: " + status );
            this.debug( "error: " + error );
            this.debug( "exception: " + exception );
            if ( restException.isDuplicateKeyExists() )
            {
                message = this.getDuplicateKeyErrorMessage();
            }
            else if ( exception == null )
            {
                var statusText = restException.statusText;
                message = `Error ${status} - ${statusText}`;
            }
            else
            {
                message = `Error ${status} - ${error} - ${exception} - ${message}`;
            }
            this.showError( message );
        }
        else
        {
            this.log( "reportRestError: rawJsonError data does not have a status value" );
            this.showError( rawJsonError );
        }
        return restException;
    }

}
