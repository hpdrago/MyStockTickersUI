import { ModelObjectChangedEvent } from "./model-object-changed.event";
import { ModelObject } from "../../model/common/model-object";

/**
 * This event is created when a model object is created.
 */
export class ModelObjectCreatedEvent<T extends ModelObject<T>> extends ModelObjectChangedEvent<T>
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
