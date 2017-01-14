import { ModelObject } from "../../model/base-modelobject";
import { BaseCrudComponentService } from "./base-crud-component.service";
import { Subject, Observable } from "rxjs";

/**
 * This class handles the default behaviour for the buttons used in a CRUD enabled table.
 *
 * inputs: ['crudDialogService', 'crudTableButtonsService']
 *
 * Created by mike on 1/2/2017.
 */
export class CrudTableButtonsService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    protected addButtonClickedSubject: Subject<void> = new Subject<void>();
    protected deleteButtonClickedSubject: Subject<T> = new Subject<T>();
    protected editButtonClickedSubject: Subject<T> = new Subject<T>();

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add
     * button is clicked on the panel.
     * @return {Observable<void>}
     */
    public handleAddButtonClicked(): Observable<void>
    {
        this.logger.log( "handleAddButtonClicked" );
        return this.addButtonClickedSubject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add button.
     */
    public sendAddButtonClicked()
    {
        this.logger.log( "sendAddButtonClicked" );
        this.tickThenRun( () => this.addButtonClickedSubject.next() );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button is clicked on the panel.
     * @return {Observable<void>}
     */
    public handleDeleteButtonClicked(): Observable<T>
    {
        this.logger.log( "handleDeleteButtonClicked" );
        return this.deleteButtonClickedSubject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Delete button.
     */
    public sendDeleteButtonClicked( modelObject: T )
    {
        this.logger.log( "sendDeleteButtonClicked" );
        this.tickThenRun( () => this.deleteButtonClickedSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Edit
     * button is clicked on the panel.
     * @return {Observable<void>}
     */
    public handleEditButtonClicked(): Observable<T>
    {
        this.logger.log( "handleEditButtonClicked" );
        return this.editButtonClickedSubject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Edit button.
     */
    public sendEditButtonClicked( modelObject: T )
    {
        this.logger.log( "sendEditButtonClicked" );
        this.tickThenRun( () => this.editButtonClickedSubject.next( modelObject ) );
    }
}
