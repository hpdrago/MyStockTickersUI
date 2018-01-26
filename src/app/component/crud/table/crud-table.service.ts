import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObject } from "../../../model/entity/modelobject";
import { Subject } from "rxjs/Subject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { CrudStateStore } from "../common/crud-state-store";

/**
 * This class defines the CRUD table subjects that can be subscribe to and the methods that trigger the events.
 */
export class CrudTableService <T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    private tableSelectionChangedSubject: Subject<T>;
    private tableContentChangedSubject: Subject<void>;

    /**
     * Constructor.
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {ModelObjectChangeService<T extends ModelObject<T>>} modelObjectChangeService
     */
    constructor( protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudStateStore: CrudStateStore<T> )
    {
        super( modelObjectFactory, crudStateStore );
    }

    /**
     * Creates the table service subjects.
     */
    protected createSubjects(): void
    {
        super.createSubjects();
        this.tableSelectionChangedSubject = new Subject<T>();
        this.tableContentChangedSubject = new Subject<void>();
    }

    /**
     * Subscribe to get notified when the user has selected a table row
     * @param {(T) => any} fn
     */
    public subscribeToTableSelectionChangeEvent( fn: ( T ) => any )
    {
        this.debug( "subscribeToTableSelectionChangeEvent" );
        this.tableSelectionChangedSubject.asObservable().subscribe( fn );
    }

    /**
     * This method will notify all subscribers that the user has selected a row in the table
     * @param {T} modelObject
     */
    public sendTableSelectionChangeEvent( modelObject: T )
    {
        this.debug( "sendTableSelectionChangeEvent " + JSON.stringify( modelObject ) );
        this.tickThenRun( () => this.tableSelectionChangedSubject.next( modelObject ) );
    }

    /**
     * Subscribe to get notified when the user has selected a table row
     * @param {(T) => any} fn
     */
    public subscribeToTableContentChangeEvent( fn: () => any )
    {
        this.debug( "subscribeToTableContentChangeEvent" );
        this.tableContentChangedSubject.asObservable().subscribe( fn );
    }

    /**
     * This method will notify all subscribers that the user has selected a row in the table
     * @param {T} modelObject
     */
    public sendTableContentChangeEvent()
    {
        this.debug( "sendTableContentChangeEvent" );
        this.tickThenRun( () => this.tableContentChangedSubject.next() );
    }

}
