import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObject } from "../../../model/entity/modelobject";
import { Subject, Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { Subscription } from "rxjs/Subscription";

/**
 * This class defines the publish/subscribe (observer pattern) methods from communication
 * between a {@code CrudTableComponent} and a {@code CrudFormComponent}
 *
 * The following subjects are provided:
 *  - ModelObjectChanged
 *  - CrudOperationChanged
 *  - CrudOperationError
 *  - DisplayDialog
 *  - CloseButtonClicked
 *  - AddButtonClicked
 *  - DeleteButtonClicked
 *  - SaveButtonClicked
 *  - ResetButtonClicked
 *
 * Created by mike on 12/17/2016.
 */
export class CrudFormButtonsService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    private addButtonClickedSubject: Subject<T>;
    private addButtonClickCompletedSubject: Subject<T>;
    private addAndContinueButtonClickedSubject: Subject<T>;
    private deleteButtonClickedSubject: Subject<T>;
    private deleteButtonClickCompletedSubject: Subject<T>;
    private saveButtonClickedSubject: Subject<T>;
    private saveButtonClickCompletedSubject: Subject<T>;
    private resetButtonClickedSubject: Subject<void>;
    private navigateToModelObjectSubject: Subject<T>;

    constructor( protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( modelObjectFactory );
        this.addButtonClickedSubject = new Subject<T>();
        this.addButtonClickCompletedSubject = new Subject<T>();
        this.addAndContinueButtonClickedSubject = new Subject<T>();
        this.deleteButtonClickedSubject = new Subject<T>();
        this.deleteButtonClickCompletedSubject = new Subject<T>();
        this.saveButtonClickedSubject = new Subject<T>();
        this.saveButtonClickCompletedSubject = new Subject<T>();
        this.resetButtonClickedSubject = new Subject<void>();
        this.navigateToModelObjectSubject = new Subject<T>();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the
     * {@code CrudPanelComponent} inform the table component to scroll to a particular model object.
     * @param modelObject
     * @return {Subscription}
     */
    public subscribeToNavigateToModelObjectEvent( modelObject: T ): Subscription
    {
        this.debug( "subscribed to navigateToModelObject" );
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
        this.debug( "sendNavigateToModelObjectEvent" );
        this.navigateToModelObjectSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add and continue
     * button is clicked on the panel.
     */
    public subscribeToContinuousAddButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribed to addAndContinueButtonClicked" );
        return this.addAndContinueButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add and continue button.
     * @param modelObject
     */
    public sendContinuousAddButtonClickedEvent( modelObject: T )
    {
        this.debug( "sendContinuousAddButtonClickedEvent" );
        this.addAndContinueButtonClickedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add
     * button is clicked on the panel.
     */
    public subscribeToAddButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribed to addButtonClicked" );
        return this.addButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add button.
     * @param modelObject
     */
    public sendAddButtonClickedEvent( modelObject: T )
    {
        this.debug( "sendAddButtonClickedEvent" );
        this.addButtonClickedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add
     * button work completed successfully.
     */
    public subscribeToAddButtonClickCompletedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribed to addButtonClickCompletedEvent" );
        return this.addButtonClickCompletedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add button.
     * @param modelObject
     */
    public sendAddButtonClickCompletedEvent( modelObject: T )
    {
        this.debug( "sendAddButtonClickCompletedEvent" );
        this.addButtonClickCompletedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button work was completed successfully.
     * @return {Subscription}
     */
    public subscribeToDeleteButtonClickCompletedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribed to deleteButtonClickCompletedEvent" );
        return this.deleteButtonClickCompletedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the delete button work completed successfully.
     * @param modelObject
     */
    public sendDeleteButtonClickCompletedEvent( modelObject: T )
    {
        this.debug( "sendDeleteButtonClickCompletedEvent to " + this.deleteButtonClickCompletedSubject.observers.length + " observers" );
        this.deleteButtonClickCompletedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button is clicked on the panel.
     * @return {Subscription}
     */
    public subscribeToDeleteButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribed to deleteButtonClickedEvent" );
        return this.deleteButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Delete button.
     * @param modelObject
     */
    public sendDeleteButtonClickedEvent( modelObject: T )
    {
        this.debug( "sendDeleteButtonClickedEvent to " + this.deleteButtonClickedSubject.observers.length + " observers" );
        this.deleteButtonClickedSubject.next( modelObject );
    }
    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Save
     * button is clicked on the panel.
     * @return Subscription
     */
    public subscribeToSaveButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribed to saveButtonClicked" );
        return this.saveButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormComponent will call this method when the user clicks the Save button.
     * @param modelObject
     */
    public sendSaveButtonClickedEvent( modelObject: T )
    {
        this.debug( "sendSaveButtonClickedEvent" );
        this.saveButtonClickedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Save
     * button is clicked handling was completed successfully.
     * @return Subscription
     */
    public subscribeToSaveButtonClickCompletedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribed to saveButtonClickCompleted" );
        return this.saveButtonClickCompletedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormComponent will call this method when the user clicks the Save button and the save button work
     * was completed successfully.
     * @param modelObject
     */
    public sendSaveButtonClickCompletedEvent( modelObject: T )
    {
        this.debug( "sendSaveButtonClickCompletedEvent" );
        this.saveButtonClickCompletedSubject.next( modelObject );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Reset
     * button is clicked on the panel.
     * @return {Subscription}
     */
    public subscribeToResetButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribed to resetButtonClicked" );
        return this.resetButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Reset button.
     */
    public sendResetButtonClickedEvent()
    {
        this.debug( "sendResetButtonClickedEvent" );
        this.resetButtonClickedSubject.next();
    }
}
