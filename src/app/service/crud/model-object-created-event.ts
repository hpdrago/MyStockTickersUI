import { ModelObjectChangedEvent } from "./model-object-changed.event";
import { ModelObject } from "../../model/entity/modelobject";

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
