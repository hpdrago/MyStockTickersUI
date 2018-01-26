import { ModelObject } from "../../../model/entity/modelobject";
import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

/**
 * This class handles the default behaviour for the buttons used in a CRUD enabled table.
 *
 * Created by mike on 1/2/2017.
 */
export class CrudTableButtonsService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    private refreshButtonClickedSubject: Subject<any>;
    private addButtonClickedSubject: Subject<T>;
    private deleteButtonClickedSubject: Subject<T>;
    private editButtonClickedSubject: Subject<T>;

    constructor( protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( modelObjectFactory );
    }

    /**
     * Creates the table cuttons service subjects.
     */
    protected createSubjects(): void
    {
        super.createSubjects();
        this.refreshButtonClickedSubject = new Subject();
        this.addButtonClickedSubject = new Subject();
        this.deleteButtonClickedSubject = new Subject();
        this.editButtonClickedSubject = new Subject();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Refresh
     * button is clicked on the panel.
     */
    public subscribeToRefreshButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribeToRefreshButtonClickedEvent" );
        return this.refreshButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Refresh button.
     */
    public sendRefreshButtonClickedEvent()
    {
        this.debug( "sendRefreshButtonClickedEvent " );
        this.tickThenRun( () => this.refreshButtonClickedSubject.next() );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Add
     * button is clicked on the panel.
     */
    public subscribeToAddButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribeToAddButtonClickedEvent" );
        return this.addButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Add button.
     */
    public sendAddButtonClickedEvent( modelObject: T )
    {
        this.debug( "sendAddButtonClickedEvent " );
        this.tickThenRun( () => this.addButtonClickedSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Delete
     * button is clicked on the panel.
     * @return Subscription
     */
    public subscribeToDeleteButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribeToDeleteButtonClickedEvent" );
        return this.deleteButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Delete button.
     */
    public sendDeleteButtonClickedEvent( modelObject: T )
    {
        this.debug( "sendDeleteButtonClickedEvent" );
        this.tickThenRun( () => this.deleteButtonClickedSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Edit
     * button is clicked on the panel.
     * @return Subscription
     */
    public subscribeToEditButtonClickedEvent( fn: ( T ) => any ): Subscription
    {
        this.debug( "subscribeToEditButtonClickedEvent" );
        return this.editButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Edit button.
     */
    public sendEditButtonClickedEvent( modelObject: T )
    {
        this.debug( "sendEditButtonClickedEvent" );
        this.tickThenRun( () => this.editButtonClickedSubject.next( modelObject ) );
    }
}
