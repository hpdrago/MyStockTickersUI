import { Observable } from "rxjs";
import { CrudOperation } from "./crud-operation";
import { ModelObject } from "../../../model/entity/modelobject";
import { BaseClass } from "../../../common/base-class";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { Subscription } from "rxjs/Subscription";
import { isNullOrUndefined } from "util";
import { Subject } from "rxjs/Subject";
import { ToastsManager } from "ng2-toastr";
import { BaseService } from "../../../service/base-service";
import { CrudStateStore } from "./crud-state-store";

/**
 * This class services as a base abstract class for CRUD based component services to provide common methods
 * and properties.
 *
 * Created by mike on 12/17/2016.
 */
export abstract class BaseCrudComponentService<T extends ModelObject<T>> extends BaseService
{
    private componentInitializedSubject: BehaviorSubject<boolean>;

    /**
     * Constructor.
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {ToastsManager} toaster
     */
    constructor( protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudStateStore: CrudStateStore<T>,
                 protected toaster?: ToastsManager )
    {
        super( toaster );
        this.createSubjects();
    }

    /**
     * Creates the subjects.
     */
    protected createSubjects()
    {
        let methodName = "createSubjects";
        this.debug( methodName + ".begin" )
        this.componentInitializedSubject = new BehaviorSubject<boolean>( false );
        this.debug( methodName + ".end" )
    }

    /**
     * Resets the behaviour subjects to their initial values so that the previous values will no longer be returned.
     */
    public resetSubjects(): void
    {
        let methodName = "resetSubjects";
        this.debug( methodName + ".begin" )
        this.componentInitializedSubject.next( false );
        this.debug( methodName + ".end" )
    }

    /**
     * This method is used to register for events when the {@code ModelObject} instance has changed
     * @return Subscription
     */
    public subscribeToModelObjectChangedEvent( fn: ( ModelObject ) => any ): Subscription
    {
        this.debug( "subscribeToModelObjectChangedEvent" );
        return this.crudStateStore.subscribeToModelObjectChangedEvent( fn );
    }

    /**
     * This method is used by an observer to be notified as result of a change to the crud operation.
     * @return Subscription instance
     */
    public subscribeToCrudOperationChangeEvent( fn: ( CrudOperation ) => any ): Subscription
    {
        this.debug( "subscribeToCrudOperationChangeEvent" );
        return this.crudStateStore.subscribeToModelObjectChangedEvent( fn );
    }

    /**
     * This method is used by a notifier of a model object change.  Any observers to model object changes
     * will be notified.
     * @param sender
     * @param modelObject
     */
    public sendModelObjectChangedEvent( sender: any, modelObject: T )
    {
        this.debug( "sendModelObjectChangedEvent " + JSON.stringify( modelObject ));
        this.crudStateStore.sendModelObjectChangedEvent( sender, modelObject );
    }

    /**
     * This method is used by a notifier of a crud operation change.  Any observers of crud operation changes
     * will be notified.
     * @param crudOperation
     */
    public sendCrudOperationChangedEvent( crudOperation: CrudOperation )
    {
        this.debug( "sendCrudOperationChangedEvent " + CrudOperation.getName( crudOperation ));
        this.crudStateStore.sendCrudOperationChangedEvent( crudOperation );
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
