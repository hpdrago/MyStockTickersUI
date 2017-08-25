import { ModelObject } from "../../model/class/base-modelobject";
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
    public subscribeToAddButtonClickedEvent(): Observable<void>
    {
        this.log( "subscribeToAddButtonClickedEvent" );
        return this.addButtonClickedSubject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add button.
     */
    public sendAddButtonClickedEvent()
    {
        this.log( "sendAddButtonClickedEvent" );
        this.tickThenRun( () => this.addButtonClickedSubject.next() );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button is clicked on the panel.
     * @return {Observable<void>}
     */
    public subscribeToDeleteButtonClickedEvent(): Observable<T>
    {
        this.log( "subscribeToDeleteButtonClickedEvent" );
        return this.deleteButtonClickedSubject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Delete button.
     */
    public sendDeleteButtonClickedEvent( modelObject: T )
    {
        this.log( "sendDeleteButtonClickedEvent" );
        this.tickThenRun( () => this.deleteButtonClickedSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Edit
     * button is clicked on the panel.
     * @return {Observable<void>}
     */
    public subscribteToEditButtonClickedEvent(): Observable<T>
    {
        this.log( "subscribteToEditButtonClickedEvent" );
        return this.editButtonClickedSubject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Edit button.
     */
    public sendEditButtonClickedEvent( modelObject: T )
    {
        this.log( "sendEditButtonClickedEvent" );
        this.tickThenRun( () => this.editButtonClickedSubject.next( modelObject ) );
    }
}
