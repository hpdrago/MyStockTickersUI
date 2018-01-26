import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObject } from "../../../model/entity/modelobject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { CrudFormButtonsService } from "../form/crud-form-buttons.service";
import { Subscription } from "rxjs/Subscription";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";
import { ToastsManager } from "ng2-toastr";
import { CrudStateStore } from "../common/crud-state-store";

/**
 * This is the base service for CRUD Panel operations.
 */
export class CrudPanelService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    protected displayDialogRequestSubject: BehaviorSubject<any> = new BehaviorSubject<any>( null );

    protected cancelButtonClickedSubject: Subject<void> = new Subject<void>();

    /**
     * Constructor.
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {CrudFormButtonsService<T extends ModelObject<T>>} crudFormButtonsService
     * @param {ToastsManager} toaster
     */
    constructor( protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudStateStore: CrudStateStore<T>,
                 protected crudFormButtonsService: CrudFormButtonsService<T>,
                 protected toaster?: ToastsManager, )
    {
        super( modelObjectFactory, crudStateStore, toaster );
    }

    /**
     * Creates the panel service subjects.  Called from super class.
     */
    protected createSubjects(): void
    {
        super.createSubjects();
        this.displayDialogRequestSubject = new BehaviorSubject<any>( null );
    }

    /**
     * Store default values in the behaviour subjects so that we don't get the current values next time through.
     */
    public resetSubjects(): void
    {
        let methodName = "resetSubjects";
        this.debug( methodName + ".begin" )
        super.resetSubjects();
        this.displayDialogRequestSubject.next( null );
        this.debug( methodName + ".end" )
    }

    /**
     * Subscribe to the cancel button clicked event.
     * @param {() => any} fn
     * @returns {Subscription}
     */
    public subscribeToCancelButtonClickedEvent( fn: () => any ): Subscription
    {
        this.debug( "subscribeToDisplayFormRequestEvent" );
        return this.cancelButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * Notifies all subscribers that the cancel button was clicked.
     */
    public sendCancelButtonClickedEvent()
    {
        this.debug( "sendCancelButtonClickedEvent" );
        this.cancelButtonClickedSubject.next();
    }

    /**
     * Handle the request to display the form
     */
    public subscribeToDisplayFormRequestEvent( fn: () => any ): Subscription
    {
        this.debug( "subscribeToDisplayFormRequestEvent" );
        return this.displayDialogRequestSubject.asObservable().subscribe( fn );
    }

    /**
     * Sends a request to display the CRUD form
     */
    public sendDisplayFormRequestEvent()
    {
        this.debug( "sendDisplayFormRequestEvent "  +
            this.displayDialogRequestSubject.observers.length + " observers" );
        this.displayDialogRequestSubject.next( null );
    }

}
