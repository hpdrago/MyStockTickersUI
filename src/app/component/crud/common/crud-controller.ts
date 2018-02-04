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

export class CrudController<T extends ModelObject<T>> extends BaseClass
{
    private refreshButtonClickedSubject: Subject<any>;
    private addButtonClickedSubject: Subject<T>;
    private deleteButtonClickedSubject: Subject<T>;
    private editButtonClickedSubject: Subject<T>;
    private tableSelectionChangedSubject: Subject<T>;
    private tableContentChangedSubject: Subject<void>;
    private displayDialogRequestSubject: BehaviorSubject<any>;
    private cancelButtonClickedSubject: Subject<void>;
    private addButtonClickCompletedSubject: Subject<T>;
    private addAndContinueButtonClickedSubject: Subject<T>;
    private deleteButtonClickCompletedSubject: Subject<T>;
    private saveButtonClickedSubject: Subject<T>;
    private saveButtonClickCompletedSubject: Subject<T>;
    private resetButtonClickedSubject: Subject<void>;
    private navigateToModelObjectSubject: Subject<T>;
    private closeButtonClickedSubject: Subject<DialogCloseEventType>;
    /*
     * FORM Subjects
     */
    private formErrorsSubject: Subject<string[]> = new Subject<string[]>();
    private formDirtySubject: Subject<boolean> = new Subject<boolean>();
    private formTouchedSubject: Subject<boolean> = new Subject<boolean>();
    private formValidSubject: Subject<boolean> = new Subject<boolean>();
    private formResetSubject: Subject<void> = new Subject<void>();
    private formLogStateSubject: Subject<void> = new Subject<void>();
    private formPrepareToSaveSubject: Subject<void> = new Subject<void>();
    private formPrepareToDisplaySubject: Subject<void> = new Subject<void>();
    private createFormSubject: Subject<void> = new Subject<void>();
    private formModelObjectVersionUpdateSubject: Subject<T> = new Subject<T>();


    /**
     * Constructor.
     */
    constructor()
    {
        super();
        this.createSubjects();
    }

    /**
     * Create the subjects.
     */
    protected createSubjects(): void
    {
        this.refreshButtonClickedSubject = new Subject();
        this.addButtonClickedSubject = new Subject();
        this.deleteButtonClickedSubject = new Subject();
        this.editButtonClickedSubject = new Subject();
        this.tableSelectionChangedSubject = new Subject<T>();
        this.tableContentChangedSubject = new Subject<void>();
        this.displayDialogRequestSubject = new BehaviorSubject<any>( null );
        this.cancelButtonClickedSubject = new Subject<void>();
        this.addButtonClickedSubject = new Subject<T>();
        this.addButtonClickCompletedSubject = new Subject<T>();
        this.addAndContinueButtonClickedSubject = new Subject<T>();
        this.deleteButtonClickedSubject = new Subject<T>();
        this.deleteButtonClickCompletedSubject = new Subject<T>();
        this.saveButtonClickedSubject = new Subject<T>();
        this.saveButtonClickCompletedSubject = new Subject<T>();
        this.resetButtonClickedSubject = new Subject<void>();
        this.navigateToModelObjectSubject = new Subject<T>();
        this.closeButtonClickedSubject = new Subject<DialogCloseEventType>();
        this.formErrorsSubject = new Subject<string[]>();
        this.formDirtySubject = new Subject<boolean>();
        this.formTouchedSubject = new Subject<boolean>();
        this.formValidSubject = new Subject<boolean>();
        this.formResetSubject = new Subject<void>();
        this.formLogStateSubject = new Subject<void>();
        this.formPrepareToSaveSubject = new Subject<void>();
        this.formPrepareToDisplaySubject = new Subject<void>();
        this.createFormSubject = new Subject<void>();
        this.formModelObjectVersionUpdateSubject = new Subject<T>();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Refresh
     * button is clicked on the panel.
     */
    public subscribeToRefreshButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribeToRefreshButtonClickedEvent' );
        return this.refreshButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Refresh button.
     */
    public sendRefreshButtonClickedEvent()
    {
        this.debug( 'sendRefreshButtonClickedEvent ' );
        this.refreshButtonClickedSubject.next();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Edit
     * button is clicked on the panel.
     * @return Subscription
     */
    public subscribeToEditButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribeToEditButtonClickedEvent' );
        return this.editButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Edit button.
     */
    public sendEditButtonClickedEvent( modelObject: T )
    {
        this.debug( 'sendEditButtonClickedEvent' );
        this.editButtonClickedSubject.next( modelObject );
    }

    /**
     * Subscribe to get notified when the user has selected a table row
     * @param {(T) => any} fn
     */
    public subscribeToTableSelectionChangeEvent( fn: ( T ) => any )
    {
        this.debug( 'subscribeToTableSelectionChangeEvent' );
        this.tableSelectionChangedSubject.asObservable().subscribe( fn );
    }

    /**
     * This method will notify all subscribers that the user has selected a row in the table
     * @param {T} modelObject
     */
    public sendTableSelectionChangeEvent( modelObject: T )
    {
        this.debug( 'sendTableSelectionChangeEvent ' + JSON.stringify( modelObject ) );
        this.tableSelectionChangedSubject.next( modelObject );
    }

    /**
     * Subscribe to get notified when the user has selected a table row
     * @param {(T) => any} fn
     */
    public subscribeToTableContentChangeEvent( fn: () => any )
    {
        this.debug( 'subscribeToTableContentChangeEvent' );
        this.tableContentChangedSubject.asObservable().subscribe( fn );
    }

    /**
     * This method will notify all subscribers that the user has selected a row in the table
     * @param {T} modelObject
     */
    public sendTableContentChangeEvent()
    {
        this.debug( 'sendTableContentChangeEvent' );
        this.tableContentChangedSubject.next();
    }

    /**
     * Subscribe to the cancel button clicked event.
     * @param {() => any} fn
     * @returns {Subscription}
     */
    public subscribeToCancelButtonClickedEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToDisplayFormRequestEvent' );
        return this.cancelButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * Notifies all subscribers that the cancel button was clicked.
     */
    public sendCancelButtonClickedEvent()
    {
        this.debug( 'sendCancelButtonClickedEvent' );
        this.cancelButtonClickedSubject.next();
    }

    /**
     * Handle the request to display the form
     */
    public subscribeToDisplayFormRequestEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToDisplayFormRequestEvent' );
        return this.displayDialogRequestSubject.asObservable().subscribe( fn );
    }

    /**
     * Sends a request to display the CRUD form
     */
    public sendDisplayFormRequestEvent()
    {
        this.debug( 'sendDisplayFormRequestEvent '  +
            this.displayDialogRequestSubject.observers.length + ' observers' );
        this.displayDialogRequestSubject.next( null );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the
     * {@code CrudPanelComponent} inform the table component to scroll to a particular model object.
     * @param modelObject
     * @return {Subscription}
     */
    public subscribeToNavigateToModelObjectEvent( modelObject: T ): Subscription
    {
        this.debug( 'subscribed to navigateToModelObject' );
        var observable: Observable<T> = this.navigateToModelObjectSubject.asObservable();
        return observable.subscribe();
    }

    /**
     * The {@CrudPanelCompoment} will notify the {@code CrudTableComponent} to navigate to a particular
     * model object.
     * @param modelObject
     */
    public sendNavigateToModelObjectEvent( modelObject: T )
    {
        this.debug( 'sendNavigateToModelObjectEvent' );
        this.navigateToModelObjectSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add and continue
     * button is clicked on the panel.
     */
    public subscribeToContinuousAddButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribed to addAndContinueButtonClicked' );
        return this.addAndContinueButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add and continue button.
     * @param modelObject
     */
    public sendContinuousAddButtonClickedEvent( modelObject: T )
    {
        this.debug( 'sendContinuousAddButtonClickedEvent' );
        this.addAndContinueButtonClickedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add
     * button is clicked on the panel.
     */
    public subscribeToAddButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribed to addButtonClicked' );
        return this.addButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add button.
     * @param modelObject
     */
    public sendAddButtonClickedEvent( modelObject: T )
    {
        this.debug( 'sendAddButtonClickedEvent' );
        this.addButtonClickedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add
     * button work completed successfully.
     */
    public subscribeToAddButtonClickCompletedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribed to addButtonClickCompletedEvent' );
        return this.addButtonClickCompletedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add button.
     * @param modelObject
     */
    public sendAddButtonClickCompletedEvent( modelObject: T )
    {
        this.debug( 'sendAddButtonClickCompletedEvent' );
        this.addButtonClickCompletedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button work was completed successfully.
     * @return {Subscription}
     */
    public subscribeToDeleteButtonClickCompletedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribed to deleteButtonClickCompletedEvent' );
        return this.deleteButtonClickCompletedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the delete button work completed successfully.
     * @param modelObject
     */
    public sendDeleteButtonClickCompletedEvent( modelObject: T )
    {
        this.debug( 'sendDeleteButtonClickCompletedEvent to ' + this.deleteButtonClickCompletedSubject.observers.length + ' observers' );
        this.deleteButtonClickCompletedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button is clicked on the panel.
     * @return {Subscription}
     */
    public subscribeToDeleteButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribed to deleteButtonClickedEvent' );
        return this.deleteButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Delete button.
     * @param modelObject
     */
    public sendDeleteButtonClickedEvent( modelObject: T )
    {
        this.debug( 'sendDeleteButtonClickedEvent to ' + this.deleteButtonClickedSubject.observers.length + ' observers' );
        this.deleteButtonClickedSubject.next( modelObject );
    }
    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Save
     * button is clicked on the panel.
     * @return Subscription
     */
    public subscribeToSaveButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribed to saveButtonClicked' );
        return this.saveButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormComponent will call this method when the user clicks the Save button.
     * @param modelObject
     */
    public sendSaveButtonClickedEvent( modelObject: T )
    {
        this.debug( 'sendSaveButtonClickedEvent' );
        this.saveButtonClickedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Save
     * button is clicked handling was completed successfully.
     * @return Subscription
     */
    public subscribeToSaveButtonClickCompletedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribed to saveButtonClickCompleted' );
        return this.saveButtonClickCompletedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormComponent will call this method when the user clicks the Save button and the save button work
     * was completed successfully.
     * @param modelObject
     */
    public sendSaveButtonClickCompletedEvent( modelObject: T )
    {
        this.debug( 'sendSaveButtonClickCompletedEvent' );
        this.saveButtonClickCompletedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Reset
     * button is clicked on the panel.
     * @return {Subscription}
     */
    public subscribeToResetButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( 'subscribed to resetButtonClicked' );
        return this.resetButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Reset button.
     */
    public sendResetButtonClickedEvent()
    {
        this.debug( 'sendResetButtonClickedEvent' );
        this.resetButtonClickedSubject.next();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the close
     * button is clicked on the panel.
     * @return Subscription
     */
    public subscribeToCloseButtonClickedEvent( fn: ( event: DialogCloseEventType ) => any ): Subscription
    {
        var subscription: Subscription = this.closeButtonClickedSubject.asObservable().subscribe( fn );
        this.debug( 'subscribeToCloseButtonClickedEvent subscribers: ' + this.closeButtonClickedSubject.observers.length );
        return subscription;
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the close button.
     */
    public sendCloseButtonClickedEvent( event: DialogCloseEventType )
    {
        this.debug( 'sendCloseButtonClickedEvent ' + DialogCloseEventType.getName( event ) + ' subscribers: '
            + this.closeButtonClickedSubject.observers.length );
        this.closeButtonClickedSubject.next( event );
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
    public subscribeToFormPrepareToSaveEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToFormPrepareToSaveEvent' );
        return this.formPrepareToSaveSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormComponent} will call this method to register to be notified right before the dialog containing
     * the form will be displayed.  This allows the form to perform any initialization before it is displayed.
     * This method is called after the model object and the crud operation have been set on the form.
     */
    public subscribeToFormPrepareToDisplayEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToFormPrepareToDisplayEvent' );
        return this.formPrepareToDisplaySubject.asObservable().subscribe( fn );
    }

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

    /**
     * The {@code CrudFormComponent} will call this method to register to be notified when the form should perform
     * the form initialization logic.
     * @param {() => any} fn
     */
    public subscribeToCreateFormEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToFormPerformInitializationEvent' );
        return this.createFormSubject.asObservable().subscribe( fn );
    }

    /*******************************************************************************************************************
     * N O T I F I E R   M E T H O D S
     ******************************************************************************************************************/

    /**
     * The {@code CrudFormComponent} will call this method to notify the subscribers of the form errors if any.
     */
    public sendFormErrors( errors: string[] )
    {
        //this.debug( 'sendFormModelObjectVersionUpdateEvent: ' );
        this.formErrorsSubject.next( errors );
    }

    /**
     * The form container [@code CrudFormFormComponent) will call this method when to notify the form to resetForm.
     */
    public sendFormResetEvent()
    {
        this.debug( 'sendFormResetEvent' );
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
    public sendFormPrepareToSaveEvent()
    {
        this.debug( 'sendFormPrepareToSaveEvent ' + this.getToObserversMessage( this.formPrepareToDisplaySubject ));
        this.formPrepareToSaveSubject.next();
    }

    /**
     * The {@code CrudDialog} will call this method to notify the form right before the dialog containing the form
     * will be displayed.
     */
    public sendFormPrepareToDisplayEvent()
    {
        this.debug( 'sendFormPrepareToDisplayEvent ' + this.getToObserversMessage( this.formPrepareToDisplaySubject ) );
        this.formPrepareToDisplaySubject.next();
    }

    /**
     * The {@code CrudFormButtonsComponent} will call this method to notify the form when the user has requested to
     * save the current model object.
     * @param modelObject The new model object version
     */
    public sendFormModelObjectVersionUpdateEvent( modelObject: T )
    {
        this.debug( 'sendFormModelObjectVersionUpdateEvent: ' + JSON.stringify( modelObject ) );
        this.formModelObjectVersionUpdateSubject.next( modelObject );
    }

    /**
     * The {@code CrudFormDialogComponent} will call this method to notify the form that it needs to initialize the
     * form as it is about to be displayed.
     */
    public sendCreateFormEvent()
    {
        this.debug( 'sendFormModelObjectVersionUpdateEvent: ' );
        this.createFormSubject.next();
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

}
