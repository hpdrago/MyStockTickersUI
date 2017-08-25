import { Subject, Observable } from "rxjs";
import { CrudOperation } from "./crud-operation";
import { ModelObject } from "../../model/class/modelobject";
import { BaseClass } from "../../common/base-class";
/**
 * This class services as a base abstract class for CRUD based component services to provide common methods
 * and properties.
 *
 * Created by mike on 12/17/2016.
 */
export class BaseCrudComponentService<T extends ModelObject<T>> extends BaseClass
{
    protected modelObjectChangedSubject: Subject<T> = new Subject<T>();
    protected crudOperationChangedSubject: Subject<CrudOperation> = new Subject<CrudOperation>();
    protected crudOperationErrorSubject: Subject<string> = new Subject<string>();

    constructor()
    {
        super();
    }

    /**
     * This method is used to register for events when the errors occur during CRUD operations.
     * This parent panel that contains CRUD components, should register for these events and
     * property report the error to the user.
     */
    public subscribeToCrudOperationError(): Observable<string>
    {
        this.debug( "subscribeToCrudOperationError" );
        return this.crudOperationErrorSubject.asObservable();
    }

    /**
     * This method is used to register for events when the {@code ModelObject} instance has changed
     */
    public subscribeToModelObjectChangedEvent(): Observable<T>
    {
        this.debug( "subscribeToModelObjectChangedEvent" );
        return this.modelObjectChangedSubject.asObservable();
    }

    /**
     * This method is used by an observer to be notified as result of a change to the crud operation.
     * @return {Observable<CrudOperation>}
     */
    public subscribeToCrudOperationChangeEvent(): Observable<CrudOperation>
    {
        this.debug( "subscribeToCrudOperationChangeEvent" );
        return this.crudOperationChangedSubject.asObservable();
    }

    /**
     * This method is use by sub components to report an error to the containing panel.
     * @param errorMessage
     */
    public sendCrudOperationErrorEvent( errorMessage: string )
    {
        this.debug( "sendCrudOperationErrorEvent " + errorMessage );
        this.tickThenRun( () => this.crudOperationErrorSubject.next( errorMessage ) );
    }

    /**
     * This method is used by a notifier of a model object change.  Any observers to model object changes
     * will be notified.
     * @param modelObject
     */
    public sendModelObjectChangedEvent( modelObject: T )
    {
        this.debug( "sendModelObjectChangedEvent " + JSON.stringify( modelObject ) );
        this.tickThenRun( () => this.modelObjectChangedSubject.next( modelObject ) );
    }

    /**
     * This method is used by a notifier of a crud operation change.  Any observers of crud operation changes
     * will be notified.
     * @param crudOperation
     */
    public sendCrudOperationChangedEvent( crudOperation: CrudOperation )
    {
        this.debug( "sendCrudOperationChangedEvent " + crudOperation );
        this.tickThenRun( () => this.crudOperationChangedSubject.next( crudOperation ) );
    }

    protected tickThenRun( fn: () => any )
    {
        //setTimeout( fn, 0 );
        fn();
    }
}
