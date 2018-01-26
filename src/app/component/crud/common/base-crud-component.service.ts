import { Observable } from "rxjs";
import { CrudOperation } from "./crud-operation";
import { ModelObject } from "../../../model/entity/modelobject";
import { BaseClass } from "../../../common/base-class";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { Subscription } from "rxjs/Subscription";
import { isNullOrUndefined } from "util";
import { Subject } from "rxjs/Subject";

/**
 * This class services as a base abstract class for CRUD based component services to provide common methods
 * and properties.
 *
 * Created by mike on 12/17/2016.
 */
export abstract class BaseCrudComponentService<T extends ModelObject<T>> extends BaseClass
{
    private modelObjectChangedSubject: BehaviorSubject<T>;
    private crudOperationChangedSubject: BehaviorSubject<CrudOperation>;
    private crudOperationErrorSubject: BehaviorSubject<string>;
    private componentInitializedSubject: BehaviorSubject<boolean>;

    constructor( protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super();
        this.resetSubjects();
    }

    /**
     * Resets the behaviour subjects to their initial values so that the previous values will no longer be returned.
     */
     resetSubjects(): void
    {
        let methodName = "resetSubjects";
        this.debug( methodName + ".begin" )
        this.modelObjectChangedSubject = new BehaviorSubject<T>( null );
        this.crudOperationChangedSubject = new BehaviorSubject<CrudOperation>( CrudOperation.NONE );
        this.crudOperationErrorSubject = new BehaviorSubject<string>( "" );
        this.componentInitializedSubject = new BehaviorSubject<boolean>( false );
        this.debug( methodName + ".end" )
    }

    /**
     * This method is used to register for events when the errors occur during CRUD operations.
     * This parent panel that contains CRUD components, should register for these events and
     * property report the error to the user.
     * @return Subscription
     */
    public subscribeToCrudOperationError( fn: ( string ) => any ): Subscription
    {
        this.debug( "subscribeToCrudOperationError" );
        return this.crudOperationErrorSubject.asObservable().subscribe( fn );
    }

    /**
     * This method is used to register for events when the {@code ModelObject} instance has changed
     * @return Subscription
     */
    public subscribeToModelObjectChangedEvent( fn: ( ModelObject ) => any ): Subscription
    {
        this.debug( "subscribeToModelObjectChangedEvent" );
        var observable: Observable<T> = this.modelObjectChangedSubject.asObservable();
        var subscription: Subscription = observable.subscribe( fn );
        this.debug( "subscribeToModelObjectChangedEvent " + this.modelObjectChangedSubject.observers.length + " observers" );
        return subscription;
    }

    /**
     * This method is used by an observer to be notified as result of a change to the crud operation.
     * @return Subscription instance
     */
    public subscribeToCrudOperationChangeEvent( fn: ( CrudOperation ) => any ): Subscription
    {
        this.debug( "subscribeToCrudOperationChangeEvent" );
        var observable: Observable<CrudOperation> = this.crudOperationChangedSubject.asObservable();
        var subscription: Subscription = observable.subscribe( fn );
        this.debug( "subscribeToCrudOperationChangeEvent" + this.crudOperationChangedSubject.observers.length + " observers" );
        return subscription;
    }

    /**
     * This method is use by sub components to report an error to the containing panel.
     * @param errorMessage
     */
    public sendCrudOperationErrorEvent( errorMessage: string )
    {
        this.debug( "sendCrudOperationErrorEvent " + errorMessage );
        this.crudOperationErrorSubject.next( errorMessage );
    }

    /**
     * This method is used by a notifier of a model object change.  Any observers to model object changes
     * will be notified.
     * @param modelObject
     */
    public sendModelObjectChangedEvent( modelObject: T )
    {
        this.debug( "sendModelObjectChangedEvent " + JSON.stringify( modelObject ) + " to " +
            this.modelObjectChangedSubject.observers.length + " observers" );
        if ( !isNullOrUndefined( modelObject ) )
        {
            this.modelObjectChangedSubject.next( modelObject );
        }
    }

    /**
     * This method is used by a notifier of a crud operation change.  Any observers of crud operation changes
     * will be notified.
     * @param crudOperation
     */
    public sendCrudOperationChangedEvent( crudOperation: CrudOperation )
    {
        this.debug( "sendCrudOperationChangedEvent " + CrudOperation.getName( crudOperation ));
        if ( !isNullOrUndefined( crudOperation ) )
        {
            this.crudOperationChangedSubject.next( crudOperation );
        }
    }

    /**
     * The method will be called to notify any listeners that the component initialization has completed.
     */
    public sendComponentInitializedEvent()
    {
        this.debug( "sendComponentInitialized" );
        this.componentInitializedSubject.next( true );
    }

    /**
     * The {@code CrudDialog or CrudPanel} will call this method and register to the Observable
     * to be notified when the form has completed it's initialization.
     * @return Subscription instance
     */
    public subscribeToComponentInitializedEvent( fn: ( boolean ) => any ): Subscription
    {
        this.debug( "subscribeToComponentInitializedEvent" );
        return this.componentInitializedSubject.asObservable().subscribe( fn );
    }

    protected tickThenRun( fn: () => any )
    {
        //setTimeout( fn, 0 );
        fn();
    }

    /**
     * Simply creates to # observers messaged based on the number of observers on the subject.
     * @param {Subject<any>} subject
     * @return {string}
     */
    protected getToObserversMessage( subject: Subject<any> ): string
    {
        return " to " + subject.observers.length + " observers";
    }
}
