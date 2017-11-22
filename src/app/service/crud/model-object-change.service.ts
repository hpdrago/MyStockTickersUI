import { Subject } from "rxjs/Subject";
import { BaseService } from "../base-service";
import { Subscription } from "rxjs/Subscription";
import { Injectable } from "@angular/core";
import { ModelObject } from "../../model/entity/modelobject";
import { CrudOperation } from "../../component/crud/common/crud-operation";
import { ModelObjectChangeEvent } from "./model-object-change.event";

/**
 * This class is the hub to receive notifications when model objects change and propagate those changes to registered
 * observers.
 *
 * Created by mike on 11/12/2017
 */
@Injectable()
export class ModelObjectChangeService<T extends ModelObject<T>> extends BaseService
{
    private modelObjectChangeSubject = new Subject<ModelObjectChangeEvent<T>>();

    /**
     * Subscribe to be notified for <T> model object changes
     * @param {(StockNote) => any} fn
     * @return {Subscription}
     */
    public subscribeToModelObjectChangeEvent( fn: ( T) => any ): Subscription
    {
        this.debug( "subscribeToModelObjectChangeEvent" );
        return this.modelObjectChangeSubject.asObservable().subscribe( fn );
    }

    /**
     * Notify all observers of <T> model objects that a model object has changed.
     * @param {any} sender
     * @param {T} modelObject
     * @param {CrudOperation} crudOperation
     */
    public sendModelObjectChangeEvent( sender: any, crudOperation: CrudOperation, modelObject: T )
    {
        this.logSendEvent( "sendModelObjectChangeEvent", crudOperation, modelObject );
        this.modelObjectChangeSubject.next( new ModelObjectChangeEvent<T>( sender, crudOperation, modelObject ));
    }

    private logSendEvent( methodName: string, crudOperation: CrudOperation, modelObject: ModelObject<any> )
    {
        this.debug( methodName + " " + CrudOperation.getName( crudOperation ) + " " + JSON.stringify( modelObject ));
    }
}
