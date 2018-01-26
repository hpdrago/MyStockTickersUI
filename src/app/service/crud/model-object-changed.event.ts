/**
 * Created by mike on 11/12/2017
 */
import { ModelObject } from "../../model/entity/modelobject";

/**
 * This class contains the information to send an event with the {@code ModelObjectChangeService}
 */
export class ModelObjectChangedEvent<T extends ModelObject<T>>
{
    public sender: any;
    public modelObject: T;

    /**
     * Constructor.
     * @param sender
     * @param {T} modelObject
     */
    constructor( sender: any, modelObject: T )
    {
        this.sender = sender;
        this.modelObject = modelObject;
    }
}
