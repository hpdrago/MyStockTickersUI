import { ModelObject } from "../../../model/common/model-object";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CrudOperation } from "./crud-operation";
import { Subscription } from "rxjs/Subscription";
import { BaseClass } from "../../../common/base-class";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { ModelObjectChangedEvent } from "../../../service/crud/model-object-changed.event";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";

/**
 * This class manages the CRUD state which includes the CrudOperation and the ModelObject.
 * These values are stored in single location and RxJs Observables are used to notify components of any state change.
 */
export abstract class CrudStateStore<T extends ModelObject<T>> extends BaseClass
{
    private modelObjectChangedSubject: BehaviorSubject<ModelObjectChangedEvent<T>>;
    private crudOperationChangedSubject: BehaviorSubject<CrudOperation>;

    constructor( protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super();
        this.createSubjects();
    }

    /**
     * Get the current CrudOperation value.
     * @return {CrudOperation}
     */
    public getCrudOperation(): CrudOperation
    {
        return this.crudOperationChangedSubject.getValue();
    }

    /**
     * Get the current model object value.
     * @return {ModelObjectChangedEvent<T extends ModelObject<T>>}
     */
    public getModelObject(): T
    {
        return this.modelObjectChangedSubject.getValue().modelObject;
    }

    /**
     * Create the subjects.
     */
    protected createSubjects(): void
    {
        let modelObject: T = this.modelObjectFactory.newModelObject();
        let modelObjectChangedEvent = new ModelObjectChangedEvent<T>( this, modelObject );
        this.modelObjectChangedSubject = new BehaviorSubject<ModelObjectChangedEvent<T>>( modelObjectChangedEvent );
        this.crudOperationChangedSubject = new BehaviorSubject<CrudOperation>( CrudOperation.NONE );
    }

    /**
     * Sets the subjects to the default values.
     */
    public resetSubjects(): void
    {
        let modelObject: T = this.modelObjectFactory.newModelObject();
        let modelObjectChangedEvent = new ModelObjectChangedEvent<T>( this, modelObject );
        this.debug( "resetSubjects" );
        this.modelObjectChangedSubject.next( modelObjectChangedEvent );
        this.crudOperationChangedSubject.next( CrudOperation.NONE );
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
        /*
        if ( sender === this.modelObjectChangedSubject.getValue().sender &&
             modelObject.isEqualProperties( this.modelObjectChangedSubject.getValue().modelObject ))
        {
            this.debug( methodName + " model object is current not sending." + JSON.stringify( modelObject ));
        }
        else
        {
         */
            if ( modelObject == null )
            {
                modelObject = this.modelObjectFactory.newModelObject();
            }
            else
            {
                modelObject.removeJSONConversionProperties();
            }
            let modelObjectChangedEvent = new ModelObjectChangedEvent( sender, modelObject );
            this.sendModelObjectEvent( methodName, this.modelObjectChangedSubject, modelObjectChangedEvent );
        //}
    }

    /**
     * Private method to log and send model object event.
     * @param sender the instance of the object making the call.  This is used to help identify an object receiving
     * its own event.
     * @param {string} callingMethod The name of the method making the call for logging purposes.
     * @param {BehaviorSubject<T extends ModelObject<T>>} subject
     * @param {T} modelObject
     */
    private sendModelObjectEvent( callingMethod: string,
                                  subject: Subject<any>,
                                  changeEvent: ModelObjectChangedEvent<any> )
    {
        this.debug( callingMethod + " sender: " + changeEvent.sender.getClassName() +
                                    " modelObject: " + JSON.stringify( changeEvent.modelObject ) );
        this.debug( callingMethod + this.getToObserversMessage( subject ));
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
        this.debug( methodName + this.getToObserversMessage( this.modelObjectChangedSubject ));
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
