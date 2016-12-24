import { BaseComponent } from "./base.component";
import { CrudOperation } from "./crud-operation";
import { ModelObjectFactory } from "../../model/model-object-factory";
import { ModelObject } from "../../model/base-modelobject";
import { ToastsManager } from "ng2-toastr";
/**
 * This class is the base class for all CRUD components
 *
 * Created by mike on 12/9/2016.
 */
export class BaseCrudComponent<T extends ModelObject<T>> extends BaseComponent
{
    constructor( protected toaster: ToastsManager,
                 protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( toaster );
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
      this.debug( "inputPropertyChange: " + property );
      switch ( property )
      {
         case 'crudOperation':
            this.crudOperationChanged( newValue );
            break;
         case 'modelObject':
            this.modelObjectChange( newValue );
            break;
      }
   }

   /**
    * This method is called whenever the model object changes.
    * @param modelObject
    */
   protected modelObjectChange( modelObject: T )
   {
      this.debug( "modelObjectChange " + modelObject );
   }

   /**
    * This method is called whenever the crudOperation changes.
    * @param crudOperation
    */
   protected crudOperationChanged( crudOperation: CrudOperation )
   {
      this.debug( "crudOperation change " + crudOperation );
   }

}
