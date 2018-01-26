import { ModelObjectChangedEvent } from "./model-object-changed.event";
import { ModelObject } from "../../model/entity/modelobject";

/**
 * This event is sent when a model object is deleted.
 */
export class ModelObjectDeletedEvent<T extends ModelObject<T>> extends ModelObjectChangedEvent<T>
{
    /**
     * Constructor
     * @param sender
     * @param {T} modelObject
     */
    constructor( sender: any, modelObject: T )
    {
        super( sender, modelObject );
    }
}
