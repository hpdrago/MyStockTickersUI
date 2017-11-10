import { BaseComponent } from "../../common/base.component";
import { ModelObject } from "../../../model/entity/modelobject";
import { ToastsManager } from "ng2-toastr";
import { CrudOperation } from "./crud-operation";
import { Subscription } from "rxjs/Subscription";
import { OnDestroy } from "@angular/core";
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
    /**
     * The object that contains the form's data
     */
    protected modelObject: T;

    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
        if ( !this.toaster )
        {
            throw new Error( "toaster argument cannot be null" );
        }
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
             this.tickThenRun( () => this.crudOperationChanged( newValue ) );
             //this.crudOperationChanged( newValue );
             break;

         case 'modelObject':
             this.debug( "inputPropertyChange: " + property +
                 " previousValue: " + (previousValue ? JSON.stringify( previousValue ) : previousValue ) +
                 " newValue: " + (newValue ? JSON.stringify( newValue ) : newValue ));
             this.tickThenRun( () => this.modelObjectChanged( newValue ) );
             //this.modelObjectChanged( newValue );
             break;

         //default:
             //this.debug( "inputPropertyChange: " + property + " previousValue: " + previousValue + " newValue: " + newValue );
      }
   }

   /**
    * This method is called whenever the model object changes.
    * @param modelObject
    */
   protected modelObjectChanged( modelObject: T )
   {
       this.log( "modelObjectChanged " + JSON.stringify( modelObject ) );
       this.modelObject = modelObject;
   }

    /**
     * Allow sub classes to change the model object through a method that will record (log) the change.
     * @param modelObject
     */
   protected setModelObject( modelObject: T )
   {
       this.log( "setModelObject " + JSON.stringify( modelObject ));
       this.modelObject = modelObject;
   }

   /**
    * This method is called whenever the crudOperation changes.
    * @param crudOperation
    */
   protected crudOperationChanged( crudOperation: CrudOperation )
   {
      this.log( "crudOperation change " + CrudOperation.getName( crudOperation ));
      this.crudOperation = crudOperation;
   }

    /**
     * Allow subclasses to change the {@code CrudOperation} and log the change.
     * @param crudOperation
     */
    protected setCrudOperation( crudOperation: CrudOperation )
    {
        this.log( "setCrudOperation " + CrudOperation.getName( crudOperation ));
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

}
