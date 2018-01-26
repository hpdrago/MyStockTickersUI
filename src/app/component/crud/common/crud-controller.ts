/**
 * This class manages the CRUD state which includes the CrudOperation and the ModelObject.
 * These values are stored in single location and RxJs Observables are used to notify components of any state change.
 */
import { ModelObject } from '../../../model/entity/modelobject';
import { BaseClass } from '../../../common/base-class';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { DialogCloseEventType } from './close-button-event';
import { CrudStateStore } from './crud-state-store';
import { CrudOperation } from './crud-operation';
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';
import { CrudActionHandler } from './crud-action-handler';

/**
 * This is the controller class for a set of CRUD based components.
 * It contains all of the events that enable tables, dialogs, forms, panels, and buttons to send and receive messages
 * from each other.
 */
export class CrudController<T extends ModelObject<T>> extends BaseClass
{
    /*
     * TABLE Subjects
     */
    private tableRefreshButtonClickedSubject: Subject<any>;
    private tableAddButtonClickedSubject: Subject<T>;
    private tableDeleteButtonClickedSubject: Subject<T>;
    private tableSelectionChangedSubject: Subject<T>;
    private tableContentChangedSubject: Subject<void>;
    private tableEditButtonClickedSubject: Subject<void>;
    private tableNavigateToModelObjectSubject: Subject<T>;

    /*
     * PANEL Subjects
     */
    //private displayDialogRequestSubject: BehaviorSubject<any>;
    private panelCancelButtonClickedSubject: Subject<void>;
    //private panelResetButtonClickedSubject: Subject<void>;
    //private panelSaveButtonClickedSubject: Subject<T>;
    //private panelAddButtonClickCompletedSubject: Subject<T>;
    //private panelAddAndContinueButtonClickedSubject: Subject<T>;
    //private panelSaveButtonClickCompletedSubject: Subject<T>;

    /*
     * DIALOG Subjects.
     */
    private dialogCloseButtonClickedSubject: Subject<DialogCloseEventType>;

    /*
     * FORM Subjects
     */
    private formErrorsSubject: Subject<string[]>;
    private formDirtySubject: Subject<boolean>;
    private formTouchedSubject: Subject<boolean>;
    private formValidSubject: Subject<boolean>;
    private formResetSubject: Subject<void>;
    private formLogStateSubject: Subject<void>;
    private formPrepareToSaveSubject: Subject<void> = new Subject<void>();
    //private formPrepareToDisplaySubject: Subject<void> = new Subject<void>();
    private formModelObjectVersionUpdateSubject: Subject<T>;
    private formReadyToDisplay: Subject<void>;

    /*
     * Model Object Subjects
     */
    /**
     * This subject indicates that a model object has been successfully deleted from the database.
     */
    private modelObjectDeletedSubject: Subject<T>;
    /**
     * This subject indicates that a model object has been successfully saved to the database.
     */
    private modelObjectSavedSubject: Subject<T>;
    /**
     * This subject indicates that a model object has been succesfully added to the database.
     */
    private modelObjectAddedSubject: Subject<T>;

    /**
     * Constructor.
     */
    constructor( protected crudStateStore: CrudStateStore<T>,
                 protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudActionHandler: CrudActionHandler<T> )
    {
        super();
        this.createSubjects();
    }

    /**
     * Create the subjects.
     */
    protected createSubjects(): void
    {
        this.tableNavigateToModelObjectSubject = new Subject<T>();
        this.tableRefreshButtonClickedSubject = new Subject();
        this.tableEditButtonClickedSubject = new Subject<void>();
        this.tableAddButtonClickedSubject = new Subject();
        this.tableDeleteButtonClickedSubject = new Subject();
        this.tableSelectionChangedSubject = new Subject<T>();
        this.tableContentChangedSubject = new Subject<void>();
        this.panelCancelButtonClickedSubject = new Subject<void>();
        this.tableAddButtonClickedSubject = new Subject<T>();
        //this.panelAddButtonClickCompletedSubject = new Subject<T>();
        //this.panelAddAndContinueButtonClickedSubject = new Subject<T>();
        //this.panelSaveButtonClickedSubject = new Subject<T>();
        //this.panelSaveButtonClickCompletedSubject = new Subject<T>();
        //this.panelResetButtonClickedSubject = new Subject<void>();
        this.dialogCloseButtonClickedSubject = new Subject<DialogCloseEventType>();
        this.formErrorsSubject = new Subject<string[]>();
        this.formDirtySubject = new Subject<boolean>();
        this.formTouchedSubject = new Subject<boolean>();
        this.formValidSubject = new Subject<boolean>();
        this.formResetSubject = new Subject<void>();
        this.formLogStateSubject = new Subject<void>();
        this.formPrepareToSaveSubject = new Subject<void>();
        //this.formPrepareToDisplaySubject = new Subject<void>();
        this.formModelObjectVersionUpdateSubject = new Subject<T>();
        this.formReadyToDisplay = new Subject<void>();
        this.modelObjectDeletedSubject = new Subject<T>();
        this.modelObjectSavedSubject = new Subject<T>();
        this.modelObjectAddedSubject = new Subject<T>();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Refresh
     * button is clicked on the panel.
     */
    public subscribeToRefreshButtonClickedEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToRefreshButtonClickedEvent' );
        return this.tableRefreshButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Refresh button.
     */
    public sendRefreshButtonClickedEvent()
    {
        this.debug( 'sendRefreshButtonClickedEvent' + this.getToObserversMessage( this.tableRefreshButtonClickedSubject ));
        this.tableRefreshButtonClickedSubject.next();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Edit
     * button is clicked on the panel.
     * @return Subscription
     */
    public subscribeToTableEditButtonClickedEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToTableEditButtonClickedEvent' );
        return this.tableEditButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Edit button.
     */
    public sendTableEditButtonClickedEvent()
    {
        let methodName = 'sendTableEditButtonClickedEvent';
        this.debug( methodName );
        this.crudStateStore.sendCrudOperationChangedEvent( CrudOperation.UPDATE );
        this.tableEditButtonClickedSubject.next();
    }

    /**
     * Subscribe to get notified when the user has selected a table row
     * @param {(T) => any} fn
     */
    public subscribeToTableSelectionChangeEvent( fn: ( modelObject: T ) => any ): Subscription
    {
        let methodName = 'subscribeToTableSelectionChangeEvent';
        let subscription = this.tableSelectionChangedSubject.asObservable().subscribe( fn );
        this.debug( methodName + this.getTotalSubscribersMessage( this.tableSelectionChangedSubject ));
        return subscription;
    }

    /**
     * This method will notify all subscribers that the user has selected a row in the table
     * @param {T} modelObject From a table selection event which is only a JSON object and not a full Typescript object
     * with methods so it needs to be converted.
     */
    public sendTableSelectionChangeEvent( modelObject: T )
    {
        this.debug( 'sendTableSelectionChangeEvent ' + JSON.stringify( modelObject ) + ' ' +
            this.getToObserversMessage( this.tableSelectionChangedSubject ) );
        this.crudStateStore.sendModelObjectChangedEvent( this, this.modelObjectFactory.newModelObjectFromJSON( modelObject ));
        this.tableSelectionChangedSubject.next( modelObject );
    }

    /**
     * Subscribe to get notified when the user has selected a table row
     * @param {(T) => any} fn
     */
    public subscribeToTableContentChangeEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToTableContentChangeEvent' );
        return this.tableContentChangedSubject.asObservable().subscribe( fn );
    }

    /**
     * This method will notify all subscribers that the user has selected a row in the table
     */
    public sendTableContentChangeEvent()
    {
        this.debug( 'sendTableContentChangeEvent ' + this.getToObserversMessage( this.tableContentChangedSubject ));
        this.tableContentChangedSubject.next();
    }

    /**
     * Subscribe to the cancel button clicked event.
     * @param {() => any} fn
     * @returns {Subscription}
     */
    public subscribeToPanelCancelButtonClickedEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToPanelCancelButtonClickedEvent' );
        return this.panelCancelButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * Notifies all subscribers that the cancel button was clicked.
     */
    public sendPanelCancelButtonClickedEvent()
    {
        this.debug( 'sendPanelcancelButtonClickedEvent ' + this.getToObserversMessage( this.panelCancelButtonClickedSubject ));
        this.panelCancelButtonClickedSubject.next();
    }

    /**
     * Subscribe to be notified when the form is ready to be displayed.
     */
    public subscribeFormReadyToDisplay( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToDisplayFormRequestEvent' );
        return this.formReadyToDisplay.asObservable().subscribe( fn );
    }

    /**
     * Send a notification that the form is ready to display.
     */
    public sendFormReadyToDisplay()
    {
        this.debug( 'FormReadyToDisplay ' + this.getToObserversMessage( this.formReadyToDisplay ));
        this.formReadyToDisplay.next( null );
    }

    /**
     * Handle the request to display the form
     */
    /*
    public subscribeToDisplayFormRequestEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToDisplayFormRequestEvent' );
        return this.displayDialogRequestSubject.asObservable().subscribe( fn );
    }
    */

    /**
     * Sends a request to display the CRUD form
     */
    /*
    public sendDisplayFormRequestEvent()
    {
        this.debug( 'sendDisplayFormRequestEvent ' + this.getToObserversMessage( this.displayDialogRequestSubject ));
        this.displayDialogRequestSubject.next( null );
    }
    */

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the
     * {@code CrudPanelComponent} inform the table component to scroll to a particular model object.
     * @param modelObject
     * @return {Subscription}
     */
    public subscribeToTableNavigateToModelObjectEvent(): Subscription
    {
        this.debug( 'subscribeToTableNavigateToModelObjectEvent' );
        var observable: Observable<T> = this.tableNavigateToModelObjectSubject.asObservable();
        return observable.subscribe();
    }

    /**
     * The {@CrudPanelCompoment} will notify the {@code CrudTableComponent} to navigate to a particular
     * model object.
     * @param modelObject
     */
    public sendTableNavigateToModelObjectEvent( modelObject: T )
    {
        this.debug( 'sendTableNavigateToModelObjectEvent ' + this.getToObserversMessage( this.tableNavigateToModelObjectSubject ));
        this.crudStateStore.sendModelObjectChangedEvent( this, modelObject );
        this.tableNavigateToModelObjectSubject.next();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add and continue
     * button is clicked on the panel.
     */
    /*
    public subscribeToPanelContinuousAddButtonClickedEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToPanelContinuousAddButtonClickedEvent' );
        return this.panelAddAndContinueButtonClickedSubject.asObservable().subscribe( fn );
    }
    */

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add and continue button.
     * @param modelObject
     */
    /*
    public sendPanelContinuousAddButtonClickedEvent( modelObject: T )
    {
        this.debug( 'sendPanelContinuousAddButtonClickedEvent ' + this.getToObserversMessage( this.panelAddAndContinueButtonClickedSubject ) );
        this.crudStateStore.sendCrudOperationChangedEvent( CrudOperation.CREATE );
        this.crudStateStore.sendModelObjectChangedEvent( this, modelObject );
        this.panelAddAndContinueButtonClickedSubject.next( modelObject );
    }
    */

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add
     * button is clicked on the panel.
     */
    public subscribeToTableAddButtonClickedEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToAddButtonClickedEvent' );
        return this.tableAddButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add button.
     * @param modelObject
     */
    public sendTableAddButtonClickedEvent()
    {
        let methodName = 'sendTableAddButtonClickedEvent';
        this.debug( methodName + ' ' + this.getToObserversMessage( this.tableAddButtonClickedSubject ));
        let modelObject: T = this.modelObjectFactory.newModelObject();
        this.crudStateStore.sendCrudOperationChangedEvent( CrudOperation.CREATE );
        this.crudStateStore.sendModelObjectChangedEvent( this, modelObject );
        this.tableAddButtonClickedSubject.next();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add
     * button work completed successfully.
     */
    /*
    public subscribeToPanelAddButtonClickCompletedEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToPanelAddButtonClickCompletedEvent' );
        return this.panelAddButtonClickCompletedSubject.asObservable().subscribe( fn );
    }
    */

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add button.
     * @param modelObject
     */
    /*
    public sendPanelAddButtonClickCompletedEvent( modelObject: T )
    {
        this.debug( 'sendPanelAddButtonClickCompletedEvent ' + this.getToObserversMessage( this.panelAddAndContinueButtonClickedSubject ));
        this.panelAddButtonClickCompletedSubject.next( modelObject );
    }
    */

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button is clicked on the panel.
     * @return {Subscription}
     */
    public subscribeToTableDeleteButtonClickedEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribedToTableDeleteButtonClickedEvent' );
        return this.tableDeleteButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Delete button.
     * @param modelObject
     */
    public sendTableDeleteButtonClickedEvent( modelObject: T )
    {
        this.debug( 'sendTableDeleteButtonClickedEvent ' + this.getToObserversMessage( this.tableDeleteButtonClickedSubject ));
        this.crudStateStore.sendCrudOperationChangedEvent( CrudOperation.DELETE );
        this.crudStateStore.sendModelObjectChangedEvent( this, modelObject );
        this.tableDeleteButtonClickedSubject.next();
    }

    /**
     * This method is called when the user saves a model object.
     * @return Subscription
     */
    /*
    public subscribeToPanelSaveButtonClickedEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToSaveButtonClickedEvent' );
        return this.panelSaveButtonClickedSubject.asObservable().subscribe( fn );
    }
    */

    /**
     * The {@code CrudFormComponent will call this method when the user clicks the Save button.
     * @param modelObject
     */
    /*
    public sendPanelSaveButtonClickedEvent( )
    {
        this.debug( 'sendPanelSaveButtonClickedEvent ' + this.getToObserversMessage( this.panelSaveButtonClickedSubject ));
        this.panelSaveButtonClickedSubject.next();
    }
    */

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Save
     * button is clicked handling was completed successfully.
     * @return Subscription
     */
    /*
    public subscribeToPanelSaveButtonClickCompletedEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribed to saveButtonClickCompleted' );
        return this.panelSaveButtonClickCompletedSubject.asObservable().subscribe( fn );
    }
    */

    /**
     * The {@code CrudFormComponent will call this method when the user clicks the Save button and the save button work
     * was completed successfully.
     * @param modelObject
     */
    /*
    public sendPanelSaveButtonClickCompletedEvent( modelObject: T )
    {
        this.debug( 'sendPanelSaveButtonClickCompletedEvent ' + this.getToObserversMessage( this.panelSaveButtonClickCompletedSubject ));
        this.crudStateStore.sendModelObjectChangedEvent( this, modelObject );
        this.panelSaveButtonClickCompletedSubject.next();
    }
    */

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Reset
     * button is clicked on the panel.
     * @return {Subscription}
     */
    /*
    public subscribeToPanelResetButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribedToPaneResetButtonClicked' );
        return this.panelResetButtonClickedSubject.asObservable().subscribe( fn );
    }
    */

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Reset button.
     */
    /*
    public sendPanelResetButtonClickedEvent()
    {
        this.debug( 'sendPanelResetButtonClickedEvent ' + this.getToObserversMessage( this.panelResetButtonClickedSubject ));
        this.panelResetButtonClickedSubject.next();
    }
    */

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the close
     * button is clicked on the panel.
     * @return Subscription
     */
    public subscribeToDialogCloseButtonClickedEvent( fn: ( event: DialogCloseEventType ) => any ): Subscription
    {
        var subscription: Subscription = this.dialogCloseButtonClickedSubject.asObservable().subscribe( fn );
        this.debug( 'subscribeToDialogCloseButtonClickedEvent subscribers: ' + this.dialogCloseButtonClickedSubject.observers.length );
        return subscription;
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the close button.
     */
    public sendDialogCloseButtonClickedEvent( event: DialogCloseEventType )
    {
        this.debug( 'sendDialogCloseButtonClickedEvent ' + DialogCloseEventType.getName( event ) +
            this.getToObserversMessage( this.dialogCloseButtonClickedSubject ));
        this.dialogCloseButtonClickedSubject.next( event );
    }

    /**
     * The {@code CrudFormForm} will call this method and register to send errors to any subscribers.
     */
    public subscribeFormErrorsEvent( fn: ( errors: string[] ) => any ): Subscription
    {
        this.debug( 'subscribeToFormErrorsEvent' );
        return this.formErrorsSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormForm} will call this method and register to the Observable
     * and perform the necessary work to resetForm the form
     */
    public subscribeToFormResetEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToFormResetEvent' );
        return this.formResetSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormForm} will call this method to register for
     * dirty status changes of the form.
     */
    public subscribeToFormDirtyEvent( fn: ( boolean ) => any ): Subscription
    {
        this.debug( 'subscribeToFormDirtyEvent' );
        return this.formDirtySubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormForm} will call this method to be notified on changes to the
     * touched status.
     */
    public subscribeToFormTouchedEvent( fn: ( boolean ) => any ): Subscription
    {
        this.debug( 'subscribeToFormTouchedEvent' );
        return this.formTouchedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormForm} will call this method to be notified when there are changes to the
     * form's valid status.
     */
    public subscribeToFormValidEvent( fn: ( boolean ) => any ): Subscription
    {
        this.debug( 'subscribeToFormValidEvent' );
        return this.formValidSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudForm} will call this method and register to the Observable
     * and perform the necessary work to display the form state
     */
    public subscribeToFormLogStateRequest( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToFormLogState' );
        return this.formLogStateSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormComponent} will call this method to register to be notified that the user has clicked on
     * the save or add button.  This allows the form to perform any final processing on the modelObject before its saved.
     */
    /*
    public subscribeToFormPrepareToSaveEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToFormPrepareToSaveEvent' );
        return this.formPrepareToSaveSubject.asObservable().subscribe( fn );
    }
    */

    /**
     * The {@code CrudFormComponent} will call this method to register to be notified right before the dialog containing
     * the form will be displayed.  This allows the form to perform any initialization before it is displayed.
     * This method is called after the model object and the crud operation have been set on the form.
     */
    /*
    public subscribeToFormPrepareToDisplayEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToFormPrepareToDisplayEvent' );
        return this.formPrepareToDisplaySubject.asObservable().subscribe( fn );
    }
    */

    /**
     * The {@code CrudFormComponent} will call this method to register to be notified that while the form was initializing,
     * the model object that the form was initially showing was a prior version and a new version of the model object is
     * provided for the form to update its components.
     * @param {(modelObject: T) => any} fn
     */
    public subscribeToFormModelObjectVersionUpdateEvent( fn: ( modelObject: T ) => any ): Subscription
    {
        this.debug( 'subscribeToFormModelObjectVersionUpdateEvent' );
        return this.formModelObjectVersionUpdateSubject.asObservable().subscribe( fn );
    }

    /*******************************************************************************************************************
     * N O T I F I E R   M E T H O D S
     ******************************************************************************************************************/

    /**
     * The {@code CrudFormComponent} will call this method to notify the subscribers of the form errors if any.
     */
    public sendFormErrors( errors: string[] )
    {
        this.debug( 'sendFormErrors ' + this.getToObserversMessage( this.formResetSubject ));
        this.formErrorsSubject.next( errors );
    }

    /**
     * The form container [@code CrudFormFormComponent) will call this method when to notify the form to resetForm.
     */
    public sendFormResetEvent()
    {
        this.debug( 'sendFormResetEvent ' + this.getToObserversMessage( this.formResetSubject ) );
        this.formResetSubject.next();
    }

    /**
     * The {@code CrudFormComponent} will call this method to notify the panel that the form's dirty status
     * has changed.
     *
     * @param dirty
     */
    public sendFormDirtyEvent( dirty: boolean )
    {
        //this.debug( 'sendFormDirtyEvent ' + dirty );
        this.formDirtySubject.next( dirty );
    }

    /**
     * The {@code CrudFormComponent} will call this method to notify the panel when the touched status has changed.
     *
     * @param touched
     */
    public sendFormTouchedEvent( touched: boolean )
    {
        //this.debug( 'sendFormTouchedEvent ' + touched );
        this.formTouchedSubject.next( touched );
    }

    /**
     * The {@code CrudFormComponent} will call this method to notify the panel when the valid status has changed.
     * @param valid
     */
    public sendFormValidEvent( valid: boolean )
    {
        //this.debug( 'sendFormValidEvent ' + valid );
        this.formValidSubject.next( valid );
    }

    /**
     * The {@code CrudFormComponent} will call this method to notify the form when the valid status has changed.
     */
    public sendFormLogStateRequest()
    {
        //this.debug( 'sendFormLogStateRequest' + valid );
        this.formLogStateSubject.next();
    }

    /**
     * The {@code CrudFormButtonsComponent} will call this method to notify the form when the user has requested to
     * save the current model object.
     */
    /*
    public sendFormPrepareToSaveEvent()
    {
        this.debug( 'sendFormPrepareToSaveEvent ' + this.getToObserversMessage( this.formPrepareToDisplaySubject ));
        this.formPrepareToSaveSubject.next();
    }
    */

    /**
     * The {@code CrudDialog} will call this method to notify the form right before the dialog containing the form
     * will be displayed.
     */
    /*
    public sendFormPrepareToDisplayEvent()
    {
        this.debug( 'sendFormPrepareToDisplayEvent ' + this.getToObserversMessage( this.formPrepareToDisplaySubject ) );
        this.formPrepareToDisplaySubject.next();
    }
    */

    /**
     * The {@code CrudFormButtonsComponent} will call this method to notify the form when the user has requested to
     * save the current model object.
     * @param modelObject The new model object version
     */
    public sendFormModelObjectVersionUpdateEvent( modelObject: T )
    {
        this.debug( 'sendFormModelObjectVersionUpdateEvent: ' + JSON.stringify( modelObject ) +
            this.getToObserversMessage( this.formModelObjectVersionUpdateSubject ));
        this.formModelObjectVersionUpdateSubject.next( modelObject );
    }

    /**
     * Delete a model object from the database. Forwards request to the {@code crudActionHandler}
     * @param {T} modelObject
     * @return {Observable<void>} Observable for the result of the delete.
     */
    public deleteModelObject( modelObject: T ): Observable<void>
    {
        let methodName = "deleteModelObject";
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        return this.crudActionHandler
                   .deleteModelObject( modelObject )
                   .map( () =>
                         {
                             this.sendModelObjectDeletedEvent( modelObject );
                         });
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button work was completed successfully.
     * @return {Subscription}
     */
    public subscribeToModelObjectDeletedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribeToModelObjectDeleted' );
        return this.modelObjectDeletedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the delete button work completed successfully.
     * @param modelObject
     */
    public sendModelObjectDeletedEvent( modelObject: T )
    {
        let methodName = 'sendModelObjectDeletedEvent';
        this.debug( methodName + '.begin to ' + this.getToObserversMessage( this.modelObjectDeletedSubject ));
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        this.modelObjectDeletedSubject.next( modelObject );
        this.crudStateStore.resetSubjects();
        this.debug( methodName + '.end' );
    }

    /**
     * Add the model object to the database.
     * @param {T} modelObject
     * @return {Observable<T extends ModelObject<T>>}
     */
    public addModelObject( modelObject: T ): Observable<T>
    {
        let methodName = "addModelObject";
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        return this.crudActionHandler
                   .addModelObject( modelObject )
                   .map( ( modelObject: T ) =>
                         {
                             this.sendFormResetEvent();
                             this.sendModelObjectAddedEvent( modelObject )
                             return modelObject;
                         });
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button work was completed successfully.
     * @return {Subscription}
     */
    public subscribeToModelObjectAddedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribeToModelObjectAddedEvent' );
        return this.modelObjectAddedSubject.asObservable().subscribe( fn );
    }

    /**
     * Sends an event indicating that that {@code modelObject} was added to the database.
     * @param modelObject
     */
    public sendModelObjectAddedEvent( modelObject: T )
    {
        let methodName = 'sendModelObjectAddedEvent';
        this.debug( methodName + '.begin to ' + this.getToObserversMessage( this.modelObjectAddedSubject ));
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        this.modelObjectAddedSubject.next( modelObject );
        this.crudStateStore.resetSubjects();
        this.debug( methodName + '.end' );
    }

    /**
     * Saves the model object to the database.
     * @param {T} modelObject
     * @return {Observable<T extends ModelObject<T>>}
     */
    public saveModelObject( modelObject: T ): Observable<T>
    {
        let methodName = "saveModelObject";
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        return this.crudActionHandler
                   .saveModelObject( modelObject )
                   .map( ( modelObject: T ) =>
                         {
                             this.sendFormResetEvent();
                             this.sendModelObjectSavedEvent( modelObject )
                             //this.crudStateStore
                             //    .resetSubjects();
                             return modelObject;
                         });
    }

    /**
     * Sends an event indicating that that {@code modelObject} was saved to the database.
     * @param modelObject
     */
    public sendModelObjectSavedEvent( modelObject: T )
    {
        let methodName = 'sendModelObjectSavedEvent';
        this.debug( methodName + '.begin to ' + this.getToObserversMessage( this.modelObjectSavedSubject ));
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        this.modelObjectSavedSubject.next( modelObject );
        this.crudStateStore.resetSubjects();
        this.debug( methodName + '.end' );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button work was completed successfully.
     * @return {Subscription}
     */
    public subscribeToModelObjectSavedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribeToModelSavedEvent' );
        return this.modelObjectSavedSubject.asObservable().subscribe( fn );
    }

    /**
     * Simply creates to # observers messaged based on the number of observers on the subject.
     * @param {Subject<any>} subject
     * @return {string}
     */
    protected getToObserversMessage( subject: Subject<any> ): string
    {
        return ' sending to ' + subject.observers.length + ' observers';
    }

    /**
     * Creates a string identifying the number of observers.
     * @param {Subject<any>} subject
     * @return {string}
     */
    private getTotalSubscribersMessage( subject: Subject<any> ): string
    {
        return ' ' + subject.observers.length + ' observers';
    }
}
