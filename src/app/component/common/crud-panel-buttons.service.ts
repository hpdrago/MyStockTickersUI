import { BaseCrudComponentService } from "./base-crud-component.service";
import { ModelObject } from "../../model/base-modelobject";
import { Subject, Observable } from "rxjs";

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
export abstract class CrudPanelButtonsService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    protected addButtonClickedSubject: Subject<T> = new Subject<T>();
    protected deleteButtonClickedSubject: Subject<T> = new Subject<T>();
    protected saveButtonClickedSubject: Subject<T> = new Subject<T>();
    protected resetButtonClickedSubject: Subject<void> = new Subject<void>();
    protected navigateToModelObjectSubject: Subject<T> = new Subject<T>();

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the
     * {@code CrudPanelComponent} inform the table component to scroll to a particular model object.
     * @param modelObject
     * @return {Observable<T>}
     */
    public handleNavigateToModelObject( modelObject: T ): Observable<T>
    {
        this.logger.log( "subscribed to navigateToModelObject" );
        return this.navigateToModelObjectSubject.asObservable();
    }

    /**
     * The {@CrudPanelCompoment} will notify the {@code CrudTableComponent} to navigate to a particular
     * model object.
     * @param modelObject
     */
    public sendNavigateToModelObject( modelObject: T )
    {
        this.logger.log( "sendNavigateToModelObject" );
        this.tickThenRun( () => this.navigateToModelObjectSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add
     * button is clicked on the panel.
     * @return {Observable<T>}
     */
    public handleAddButtonClicked(): Observable<T>
    {
        this.logger.log( "subscribe to addButtonClicked" );
        return this.addButtonClickedSubject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add button.
     * @param modelObject
     */
    public sendAddButtonClicked( modelObject: T )
    {
        this.logger.log( "sendAddButtonClicked" );
        this.tickThenRun( () => this.addButtonClickedSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button is clicked on the panel.
     * @return {Observable<T>}
     */
    public handleDeleteButtonClicked(): Observable<T>
    {
        this.logger.log( "subscribed to deleteButtonClicked" );
        return this.deleteButtonClickedSubject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Delete button.
     * @param modelObject
     */
    public sendDeleteButtonClicked( modelObject: T )
    {
        this.logger.log( "sendDeleteButtonClicked" );
        this.tickThenRun( () => this.deleteButtonClickedSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Save
     * button is clicked on the panel.
     * @return {Observable<void>}
     */
    public handleSaveButtonClicked(): Observable<T>
    {
        this.logger.log( "subscribed to saveButtonClicked" );
        return this.saveButtonClickedSubject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Save button.
     * @param modelObject
     */
    public sendSaveButtonClicked( modelObject: T )
    {
        this.logger.log( "sendSaveButtonClicked" );
        this.tickThenRun( () => this.saveButtonClickedSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Reset
     * button is clicked on the panel.
     * @return {Observable<void>}
     */
    public handleResetButtonClicked(): Observable<void>
    {
        this.logger.log( "subscribed to resetButtonClicked" );
        return this.resetButtonClickedSubject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Reset button.
     */
    public sendResetButtonClicked()
    {
        this.logger.log( "sendResetButtonClicked" );
        this.tickThenRun( () => this.resetButtonClickedSubject.next() );
    }
}
