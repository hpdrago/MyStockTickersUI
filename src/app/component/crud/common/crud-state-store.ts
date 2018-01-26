import { ModelObject } from "../../../model/entity/modelobject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CrudOperation } from "./crud-operation";
import { Subscription } from "rxjs/Subscription";
import { BaseClass } from "../../../common/base-class";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ModelObjectChangedEvent } from "../../../service/crud/model-object-changed.event";
import { ModelObjectDeletedEvent } from "../../../service/crud/model-object-deleted-event";
import { ModelObjectCreatedEvent } from "../../../service/crud/model-object-created-event";

/**
 * This class manages the CRUD state which includes the CrudOperation and the ModelObject.
 * These values are stored in single location and RxJs Observables are used to notify components of any state change.
 */
export class CrudStateStore<T extends ModelObject<T>> extends BaseClass
{
    private modelObjectChangedSubject: BehaviorSubject<ModelObjectChangedEvent<T>> = new BehaviorSubject<ModelObjectChangedEvent<T>>( null );
    private modelObjectDeletedSubject: BehaviorSubject<ModelObjectDeletedEvent<T>> = new BehaviorSubject<ModelObjectDeletedEvent<T>>( null );
    private modelObjectCreatedSubject: BehaviorSubject<ModelObjectCreatedEvent<T>> = new BehaviorSubject<ModelObjectCreatedEvent<T>>( null );
    private crudOperationChangedSubject: BehaviorSubject<CrudOperation> = new BehaviorSubject<CrudOperation>( CrudOperation.NONE );

    /**
     * Sets the subjects to the default values.
     */
    public resetSubjects(): void
    {
        this.debug( "resetSubjects" );
        this.modelObjectChangedSubject.next( null );
        this.crudOperationChangedSubject.next( CrudOperation.NONE );
        this.modelObjectDeletedSubject.next( null );
        this.modelObjectCreatedSubject.next( null );
    }

    /**
     * This method is used to register for events when the {@code ModelObject} instance has changed
     * @return Subscription
     */
    public subscribeToModelObjectChangedEvent( fn: ( modelObject: ModelObjectChangedEvent<T> ) => any ): Subscription
    {
        let methodName = "subscribeToModelObjectChangedEvent";
        this.debug( methodName + ".begin" );
        var observable: Observable<ModelObjectChangedEvent<T>> = this.modelObjectChangedSubject.asObservable();
        var subscription: Subscription = observable.subscribe( fn );
        this.debug( methodName + ".end " + this.modelObjectChangedSubject.observers.length + " observers" );
        return subscription;
    }

    /**
     * This method is used to register for events when the {@code ModelObject} instance has changed
     * @return Subscription
     */
    public subscribeToModelObjectDeletedEvent( fn: ( modelObjectDeletedEvent: ModelObjectDeletedEvent<T> ) => any ): Subscription
    {
        let methodName = "subscribeToModelObjectDeletedEvent";
        this.debug( methodName + ".begin" );
        var observable: Observable<ModelObjectDeletedEvent<T>> = this.modelObjectDeletedSubject.asObservable();
        var subscription: Subscription = observable.subscribe( fn );
        this.debug( methodName + ".end" + this.modelObjectDeletedSubject.observers.length + " observers" );
        return subscription;
    }

    /**
     * This method is used to register for events when the {@code ModelObject} instance has been created.
     * @return Subscription
     */
    public subscribeToModelObjectCreatedEvent( fn: ( changeEvent: ModelObjectCreatedEvent<T> ) => any ): Subscription
    {
        let methodName = "subscribeToModelObjectCreatedEvent";
        this.debug( methodName + ".begin" );
        var observable: Observable<ModelObjectCreatedEvent<T>> = this.modelObjectCreatedSubject.asObservable();
        var subscription: Subscription = observable.subscribe( fn );
        this.debug( methodName + ".end" + this.modelObjectCreatedSubject.observers.length + " observers" );
        return subscription;
    }

    /**
     * This method is used by an observer to be notified as result of a change to the crud operation.
     * @return Subscription instance
     */
    public subscribeToCrudOperationChangeEvent( fn: ( CrudOperation ) => any ): Subscription
    {
        let methodName = "subscribeToCrudOperationChangeEvent";
        this.debug( methodName );
        var observable: Observable<CrudOperation> = this.crudOperationChangedSubject.asObservable();
        var subscription: Subscription = observable.subscribe( fn );
        this.debug( methodName + this.getToObserversMessage( this.crudOperationChangedSubject ));
        return subscription;
    }

    /**
     * This method is used by a notifier of a model object change.  Any observers to model object changes
     * will be notified.
     * @param sender
     * @param modelObject
     */
    public sendModelObjectChangedEvent( sender: any, modelObject: T )
    {
        let methodName = "sendModelObjectChangedEvent";
        let modelObjectChangedEvent = new ModelObjectChangedEvent( sender, modelObject );
        this.sendModelObjectEvent( sender, methodName, this.modelObjectChangedSubject, modelObjectChangedEvent );
    }

    /**
     * This method is used by a notifier of a model object has been deleted.  Any observers to model object deletion event
     * will be notified.
     * @param sender
     * @param modelObject
     */
    public sendModelObjectDeletedEvent( sender: any, modelObject: T )
    {
        let modelObjectDeletedEvent = new ModelObjectDeletedEvent( sender, modelObject );
        this.sendModelObjectEvent( sender,"sendModelObjectDeletedEvent", this.modelObjectDeletedSubject, modelObjectDeletedEvent );
    }

    /**
     * This method is used by a notifier of a model object has been deleted.  Any observers to model object deletion event
     * will be notified.
     * @param sender
     * @param modelObject
     */
    public sendModelObjectCreatedEvent( sender: any, modelObject: T )
    {
        let modelObjectCreatedEvent = new ModelObjectCreatedEvent( sender, modelObject );
        this.sendModelObjectEvent( sender,"sendModelObjectCreated", this.modelObjectCreatedSubject, modelObjectCreatedEvent );
    }

    /**
     * Private method to log and send model object event.
     * @param sender the instance of the object making the call.  This is used to help identify an object receiving
     * its own event.
     * @param {string} callingMethod The name of the method making the call for logging purposes.
     * @param {BehaviorSubject<T extends ModelObject<T>>} subject
     * @param {T} modelObject
     */
    private sendModelObjectEvent( sender: any,
                                  callingMethod: string,
                                  subject: BehaviorSubject<any>,
                                  changeEvent: any )
    {
        this.debug( callingMethod + " modelObject: " + JSON.stringify( changeEvent.modelObject ) );
        this.debug( callingMethod + " " + this.getToObserversMessage( subject ));
        changeEvent.sender = sender;
        subject.next( changeEvent );
        this.debug( callingMethod + ".end" );
    }

    /**
     * This method is used by a notifier of a crud operation change.  Any observers of crud operation changes
     * will be notified.
     * @param crudOperation
     */
    public sendCrudOperationChangedEvent( crudOperation: CrudOperation )
    {
        let methodName = "sendCrudOperationChangedEvent";
        this.debug( methodName + " " + CrudOperation.getName( crudOperation ));
        this.debug( methodName + " " + this.getToObserversMessage( this.modelObjectChangedSubject ));
        this.crudOperationChangedSubject.next( crudOperation );
    }

    /**
     * Simply creates to # observers messaged based on the number of observers on the subject.
     * @param {Subject<any>} subject
     * @return {string}
     */
    protected getToObserversMessage( subject: Subject<any> ): string
    {
        return " sending to " + subject.observers.length + " observers";
    }
}
