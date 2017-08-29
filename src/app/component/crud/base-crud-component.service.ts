import { Subject, Observable } from "rxjs";
import { CrudOperation } from "./crud-operation";
import { ModelObject } from "../../model/class/modelobject";
import { BaseClass } from "../../common/base-class";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ModelObjectFactory } from "../../model/factory/model-object.factory";
/**
 * This class services as a base abstract class for CRUD based component services to provide common methods
 * and properties.
 *
 * Created by mike on 12/17/2016.
 */
export class BaseCrudComponentService<T extends ModelObject<T>> extends BaseClass
{
    private modelObjectChangedSubject: BehaviorSubject<T>;
    private crudOperationChangedSubject: BehaviorSubject<CrudOperation>;
    private crudOperationErrorSubject: BehaviorSubject<string>;
    private componentInitializedSubject: Subject<void>;

    constructor( protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super();
        this.modelObjectChangedSubject = new BehaviorSubject<T>( this.modelObjectFactory.newModelObject() );
        this.crudOperationChangedSubject = new BehaviorSubject<CrudOperation>( CrudOperation.NONE );
        this.crudOperationErrorSubject = new BehaviorSubject<string>( "" );
        this.componentInitializedSubject = new Subject<void>();
    }

    /**
     * This method is used to register for events when the errors occur during CRUD operations.
     * This parent panel that contains CRUD components, should register for these events and
     * property report the error to the user.
     */
    public subscribeToCrudOperationError( fn: ( string ) => any )
    {
        this.debug( "subscribeToCrudOperationError" );
        this.crudOperationErrorSubject.asObservable().subscribe( fn );
    }

    /**
     * This method is used to register for events when the {@code ModelObject} instance has changed
     */
    public subscribeToModelObjectChangedEvent( fn: ( ModelObject ) => any ): Observable<T>
    {
        var observable: Observable<T> = this.modelObjectChangedSubject.asObservable();
        observable.subscribe( fn );
        this.debug( "subscribeToModelObjectChangedEvent " + this.modelObjectChangedSubject.observers.length + " observers" );
        return observable;
    }

    /**
     * This method is used by an observer to be notified as result of a change to the crud operation.
     */
    public subscribeToCrudOperationChangeEvent( fn: ( CrudOperation ) => any )
    {
        this.debug( "subscribeToCrudOperationChangeEvent" );
        this.crudOperationChangedSubject.asObservable().subscribe( fn );
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
        this.debug( "sendModelObjectChangedEvent " + JSON.stringify( modelObject ) + " to " +
            this.modelObjectChangedSubject.observers.length + " ob" );
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

    /**
     * The method will be called to notify any listeners that the component initialization has completed.
     */
    public sendComponentInitializedEvent()
    {
        this.logger.debug( "sendComponentInitialized" );
        this.tickThenRun( () => this.componentInitializedSubject.next() );
    }

    /**
     * The {@code CrudDialog or CrudPanel} will call this method and register to the Observable
     * to be notified when the form has completed it's initialization.
     *
     */
    public subscribeToComponentInitializedEvent( fn: () => any )
    {
        this.logger.debug( "subscribeToComponentInitializedEvent" );
        this.componentInitializedSubject.asObservable().subscribe( fn );
    }

    protected tickThenRun( fn: () => any )
    {
        //setTimeout( fn, 0 );
        fn();
    }
}
