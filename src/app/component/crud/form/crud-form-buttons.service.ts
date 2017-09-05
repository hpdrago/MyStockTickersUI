import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObject } from "../../../model/entity/modelobject";
import { Subject, Observable } from "rxjs";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";

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
    private addButtonClickedSubject: BehaviorSubject<T>;
    private deleteButtonClickedSubject: BehaviorSubject<T>;
    private saveButtonClickedSubject: BehaviorSubject<T>;
    private resetButtonClickedSubject: Subject<void>;
    private navigateToModelObjectSubject: BehaviorSubject<T>;

    constructor( protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( modelObjectFactory );
        this.addButtonClickedSubject = new BehaviorSubject<T>( null );
        this.deleteButtonClickedSubject = new BehaviorSubject<T>( null );
        this.saveButtonClickedSubject = new BehaviorSubject<T>( null );
        this.resetButtonClickedSubject = new Subject<void>();
        this.navigateToModelObjectSubject = new BehaviorSubject<T>( null );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the
     * {@code CrudPanelComponent} inform the table component to scroll to a particular model object.
     * @param modelObject
     * @return {Observable<T>}
     */
    public subscribeToNavigateToModelObjectEvent( modelObject: T ): Observable<T>
    {
        this.log( "subscribed to navigateToModelObject" );
        return this.navigateToModelObjectSubject.asObservable();
    }

    /**
     * The {@CrudPanelCompoment} will notify the {@code CrudTableComponent} to navigate to a particular
     * model object.
     * @param modelObject
     */
    public sendNavigateToModelObjectEvent( modelObject: T )
    {
        this.log( "sendNavigateToModelObjectEvent" );
        this.tickThenRun( () => this.navigateToModelObjectSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add
     * button is clicked on the panel.
     */
    public subscribeToAddButtonClickedEvent( fn: ( T ) => any )
    {
        this.log( "subscribed to addButtonClicked" );
        this.addButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add button.
     * @param modelObject
     */
    public sendAddButtonClickedEvent( modelObject: T )
    {
        this.log( "sendAddButtonClickedEvent" );
        this.tickThenRun( () => this.addButtonClickedSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button is clicked on the panel.
     * @return {Observable<T>}
     */
    public subscribeToHandleDeleteButtonClickedEvent( fn: ( T ) => any )
    {
        this.log( "subscribed to deleteButtonClicked" );
        this.deleteButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Delete button.
     * @param modelObject
     */
    public sendDeleteButtonClickedEvent( modelObject: T )
    {
        this.log( "sendDeleteButtonClickedEvent" );
        this.tickThenRun( () => this.deleteButtonClickedSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Save
     * button is clicked on the panel.
     */
    public subscribeToSaveButtonClickedEvent( fn: ( T ) => any )
    {
        this.log( "subscribed to saveButtonClicked" );
        this.saveButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Save button.
     * @param modelObject
     */
    public sendSaveButtonClickedEvent( modelObject: T )
    {
        this.log( "sendSaveButtonClickedEvent" );
        this.tickThenRun( () => this.saveButtonClickedSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Reset
     * button is clicked on the panel.
     * @return {Observable<void>}
     */
    public registerToResetButtonClickedEvent( fn: () => any )
    {
        this.log( "subscribed to resetButtonClicked" );
        this.resetButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Reset button.
     */
    public sendResetButtonClickedEvent()
    {
        this.log( "sendResetButtonClickedEvent" );
        this.tickThenRun( () => this.resetButtonClickedSubject.next() );
    }
}
