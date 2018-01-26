import { ModelObject } from '../../../model/common/model-object';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';
import { ToastsManager } from 'ng2-toastr';
import { BaseService } from '../../../service/base-service';
import { RestErrorReporter } from '../../../service/rest-error-reporter';
import { Observable } from 'rxjs/Observable';


/**
 * This is the base class for all action handlers. The action handlers are called from the controller to perform
 * the actual work triggered by a user action on the components.
 *
 * The methods in this class will make the necessary CRUD REST service calls and report any errors. Subclass can implement
 * other actions beyond rest calls as is required to separate the controller events from the actions.
 *
 */
export abstract class CrudActionHandler<T extends ModelObject<T>> extends BaseService
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {CrudRestService<T extends ModelObject<T>>} crudRestService
     */
    protected constructor( protected toaster: ToastsManager,
                           protected restErrorReporter: RestErrorReporter,
                           protected crudRestService: CrudRestService<T> )
    {
        super();
    }

    /**
     * Delete the model object from the database.
     * @param {T} modelObject
     * @return {Observable} Get notified if the delete succeeded for failed.
     */
    public deleteModelObject( modelObject: T ): Observable<void>
    {
        let methodName = 'deleteModelObject';
        this.debug( methodName + ' ' + JSON.stringify( modelObject ) );
        return this.crudRestService
                   .deleteModelObject( modelObject )
                   .map( () =>
                   {
                       this.debug( methodName + ' delete successful ' + JSON.stringify( modelObject ));
                       this.showDeleteSuccessful( modelObject );
                   },
                   error =>
                   {
                       this.debug( methodName + ' delete failed' );
                       let exception = this.restErrorReporter.reportRestError( error );
                       Observable.throw( exception );
                   });
    }

    /**
     * Creates a new model object entry in the database via a REST CRUD call.
     * notifyAddButtonWorkSuccessful method is called.
     */
    public addModelObject( modelObject: T ): Observable<T>
    {
        var methodName = 'addModelObject';
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        return this.crudRestService
                   .createModelObject( modelObject )
                   .map( ( newModelObject: T ) =>
                   {
                       this.debug( methodName + ' add successful.  modelObject: ' + JSON.stringify( newModelObject ) );
                       this.showAddSuccessful( newModelObject );
                       this.onModelObjectAdd( newModelObject );
                       return newModelObject;
                   },
                   error =>
                   {
                       this.debug( methodName + ' create failed: ' + error );
                       var exception = this.restErrorReporter.reportRestError( error );
                       this.debug( methodName + ' exception: ' + JSON.stringify( exception ));
                       Observable.throw( exception );
                         //throw new Error( exception.message );
                   });
    }

    /**
     * This method is called by {@code addModelObject} after a successful adding of an entity to the database.
     * Subclasses can override this method to perform additional client side related work after this event.
     * @param {T} newModelObject
     * @return {T}
     */
    protected onModelObjectAdd( newModelObject: T )
    {
    }

    /**
     * Saves the model object to the database.
     * @param {T} modelObject
     * @return {Observable<T extends ModelObject<T>>}
     */
    public saveModelObject( modelObject: T ): Observable<T>
    {
        var methodName = 'saveModelObject';
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        return this.crudRestService
                   .updateModelObject( modelObject )
                   .map( ( updatedModelObject: T ) =>
                   {
                       this.debug( methodName + ' saved successful.  modelObject; ' + JSON.stringify( updatedModelObject ) );
                       this.onSaveModelObject( updatedModelObject );
                       this.showSaveSuccessful( updatedModelObject );
                       return updatedModelObject;
                   },
                   error =>
                   {
                       this.debug( methodName + ' save failed: ' + error );
                       var exception = this.restErrorReporter.reportRestError( error );
                       this.debug( methodName + ' exception: ' + JSON.stringify( exception ));
                       Observable.throw( exception );
                   });
    }

    /**
     * This method is called by {@code saveModelObject} upon a successful save to the database.
     * @param {T} modelObject
     */
    protected onSaveModelObject( modelObject: T )
    {
    }

    /*
public modelObjectVersionCheck( modelObject: T ): Observable<T>
{
    var methodName = 'modelObjectVersionCheck';
    return this.crudRestService
               .getModelObject( modelObject )
               .map( modelObject )
    {

    }
}
*/

    protected showSaveSuccessful( updatedModelObject: T )
    {
        this.showInfo( this.getSaveSuccessfulMessage( updatedModelObject ) );
    }

    protected showAddSuccessful( newModelObject: T )
    {
        this.showInfo( this.getAddSuccessfulMessage( newModelObject ) );
    }

    protected showDeleteSuccessful( modelObject: T )
    {
        this.showInfo( this.getDeleteSuccessfulMessage( modelObject ) );
    }

/**
 * Defines the message to show when a delete was successful.  Override this method to change the message.
 * @returns {string}
 */
    protected getDeleteSuccessfulMessage( modelObject: any )
    {
        if ( modelObject.tickerSymbol )
        {
            return modelObject.tickerSymbol + ' Deleted Successfully!'
        }
        else
        {
            return 'Delete Successful!';
        }
    }

    /**
     * Defines the message to show when a create was successful.  Override this method to change the message.
     * @returns {string}
     */
    protected getAddSuccessfulMessage( modelObject: any )
    {
        if ( modelObject.tickerSymbol )
        {
            return modelObject.tickerSymbol + ' Created Successfully!'
        }
        else
        {
            return 'Add Successful!';
        }
    }

    /**
     * Defines the message to show when a save was successful.  Override this method to change the message.
     * @returns {string}
     */
    protected getSaveSuccessfulMessage( modelObject: any )
    {
        if ( modelObject.tickerSymbol )
        {
            return modelObject.tickerSymbol + ' Saved Successfully!'
        }
        else
        {
            return 'Save Successful!';
        }
    }
}
