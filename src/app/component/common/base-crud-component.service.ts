import { Logger } from "../../common/logger";
import { LoggerFactory } from "../../common/logger-factory";
import { Subject, Observable } from "rxjs";
import { CrudOperation } from "./crud-operation";
import { ModelObject } from "../../model/base-modelobject";
/**
 * This class services as a base abstract class for CRUD based component services to provide common methods
 * and properties.
 *
 * Created by mike on 12/17/2016.
 */
export abstract class BaseCrudComponentService<T extends ModelObject<T>>
{
    protected logger: Logger;
    protected modelObjectChangedSubject: Subject<T> = new Subject<T>();
    protected crudOperationChangedSubject: Subject<CrudOperation> = new Subject<CrudOperation>();
    protected crudOperationError: Subject<string> = new Subject<string>();

    constructor()
    {
        this.logger = LoggerFactory.getLogger( (<any>this).constructor.name );
    }

    /**
     * This method is used to register for events when the errors occur during CRUD operations.
     * This parent panel that contains CRUD components, should register for these events and
     * property report the error to the user.
     */
    public handleCrudOperationError(): Observable<string>
    {
        this.logger.log( "handleCrudOperationError" );
        return this.crudOperationError.asObservable();
    }

    /**
     * This method is used to register for events when the {@code ModelObject} instance has changed
     */
    public handleModelObjectChanged(): Observable<T>
    {
        this.logger.log( "handleModelObjectChanged" );
        return this.modelObjectChangedSubject.asObservable();
    }

    /**
     * This method is used by an observer to be notified as result of a change to the crud operation.
     * @return {Observable<CrudOperation>}
     */
    public handleCrudOperationChanged(): Observable<CrudOperation>
    {
        this.logger.log( "handleCrudOperationChanged" );
        return this.crudOperationChangedSubject.asObservable();
    }

    /**
     * This method is use by sub components to report an error to the containing panel.
     * @param errorMessage
     */
    public sendCrudOperationError( errorMessage: string )
    {
        this.logger.log( "sendCrudOperationError " + errorMessage );
        this.tickThenRun( () => this.crudOperationError.next( errorMessage ) );
    }

    /**
     * This method is used by a notifier of a model object change.  Any observers to model object changes
     * will be notified.
     * @param modelObject
     */
    public sendModelObjectChanged( modelObject: T )
    {
        this.logger.log( "sendModelObjectChanged " + JSON.stringify( modelObject ) );
        this.tickThenRun( () => this.modelObjectChangedSubject.next( modelObject ) );
    }

    /**
     * This method is used by a notifier of a crud operation change.  Any observers of crud operation changes
     * will be notified.
     * @param crudOperation
     */
    public sendCrudOperationChanged( crudOperation: CrudOperation )
    {
        this.logger.log( "sendCrudOperationChanged " + crudOperation );
        this.tickThenRun( () => this.crudOperationChangedSubject.next( crudOperation ) );
    }

    protected tickThenRun( fn: () => any )
    {
        setTimeout( fn, 0 );
    }
}
