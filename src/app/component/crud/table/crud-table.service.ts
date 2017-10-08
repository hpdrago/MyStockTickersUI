import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObject } from "../../../model/entity/modelobject";
import { Subject } from "rxjs/Subject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";

/**
 * This class defines the CRUD table subjects that can be subscribe to and the methods that trigger the events.
 */
export class CrudTableService <T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    private tableSelectionChangedSubject: Subject<T> = new Subject();

    constructor( protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( modelObjectFactory );
    }

    /**
     * Subscribe to get notified when the user has selected a table row
     * @param {(T) => any} fn
     */
    public subscribeToTableSelectionChangeEvent( fn: ( T ) => any )
    {
        this.log( "subscribeToTableSelectionChangeEvent" );
        this.tableSelectionChangedSubject.asObservable().subscribe( fn );
    }

    /**
     * This method will notify all subscribers that the user has selected a row in the table
     * @param {T} modelObject
     */
    public sendTableSelectionChangeEvent( modelObject: T )
    {
        this.log( "sendTableSelectionChangeEvent" + JSON.stringify( modelObject ) );
        this.tickThenRun( () => this.tableSelectionChangedSubject.next( modelObject ) );
    }
}
