import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObject } from "../../../model/entity/modelobject";
import { Subject } from "rxjs/Subject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { ModelObjectChangeService } from "../../../service/crud/model-object-change.service";
import { CrudOperation } from "../common/crud-operation";

/**
 * This class defines the CRUD table subjects that can be subscribe to and the methods that trigger the events.
 */
export class CrudTableService <T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    private tableSelectionChangedSubject: Subject<T> = new Subject();
    private tableContentChangedSubject: Subject<void> = new Subject<void>();
    private tableRowAddedSubject: Subject<T> = new Subject();
    private tableRowUpdatedSubject: Subject<T> = new Subject();
    private tableRowDeletedSubject: Subject<T> = new Subject();

    constructor( protected modelObjectFactory: ModelObjectFactory<T>,
                 protected modelObjectChangeService: ModelObjectChangeService<T> )
    {
        super( modelObjectFactory );
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

    /**
     * Subscribe to get notified when the user has selected a table row
     * @param {(T) => any} fn
     */
    public subscribeToTableRowAddedChangeEvent( fn: ( T ) => any )
    {
        this.debug( "subscribeToTableRowAddedChangeEvent" );
        this.tableRowAddedSubject.asObservable().subscribe( fn );
    }

    /**
     * This method will notify all subscribers that the user has selected a row in the table
     * @param {T} modelObject
     */
    public sendTableRowAddedChangeEvent( modelObject: T )
    {
        this.debug( "sendTableRowAddedChangeEvent " + JSON.stringify( modelObject ) );
        this.tickThenRun( () => this.tableRowAddedSubject.next( modelObject ) );
        this.modelObjectChangeService.sendModelObjectChangeEvent( this, CrudOperation.CREATE, modelObject );
    }

    /**
     * Subscribe to get notified when the user has selected a table row
     * @param {(T) => any} fn
     */
    public subscribeToTableRowDeletedChangeEvent( fn: ( T ) => any )
    {
        this.debug( "subscribeToTableRowDeletedChangeEvent" );
        this.tableRowDeletedSubject.asObservable().subscribe( fn );
    }

    /**
     * Subscribe to get notified when the user has selected a table row
     * @param {(T) => any} fn
     */
    public subscribeToTableRowUpdatedChangeEvent( fn: ( T ) => any )
    {
        this.debug( "subscribeToTableRowUpdatedChangeEvent" );
        this.tableRowUpdatedSubject.asObservable().subscribe( fn );
    }

    /**
     * This method will notify all subscribers that the user has selected a row in the table
     * @param {T} modelObject
     */
    public sendTableRowDeletedChangeEvent( modelObject: T )
    {
        this.debug( "sendTableRowDeletedChangeEvent " + JSON.stringify( modelObject ) );
        this.tickThenRun( () => this.tableRowDeletedSubject.next( modelObject ) );
        this.modelObjectChangeService.sendModelObjectChangeEvent( this, CrudOperation.DELETE, modelObject );
    }

    /**
     * This method will notify all subscribers that the user has selected a row in the table
     * @param {T} modelObject
     */
    public sendTableRowUpdatedChangeEvent( modelObject: T )
    {
        this.debug( "sendTableRowUpdatedChangeEvent " + JSON.stringify( modelObject ) );
        this.tickThenRun( () => this.tableRowUpdatedSubject.next( modelObject ) );
        this.modelObjectChangeService.sendModelObjectChangeEvent( this, CrudOperation.UPDATE, modelObject );
    }
}
