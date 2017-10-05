import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObject } from "../../../model/entity/modelobject";
import { Subject } from "rxjs/Subject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";

/**
 * This class defines the CRUD table subjects that can be subscribe to and the methods that trigger the events.
 */
export class CrudTableService <T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    private tableSelectionChangedSubject: Subject<[T]> = new Subject();

    constructor( protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( modelObjectFactory );
    }

    public subscribeToTableSelectionChangeEvent( fn: ( T ) => any )
    {
        this.log( "subscribeToTableSelectionChangeEvent" );
        this.tableSelectionChangedSubject.asObservable().subscribe( fn );
    }

    public sendTableSelectionChangeEvent( modelObjects: [T] )
    {
        this.log( "sendTableSelectionChangeEvent" + JSON.stringify( modelObjects ) );
        this.tickThenRun( () => this.tableSelectionChangedSubject.next( modelObjects ) );
    }
}
