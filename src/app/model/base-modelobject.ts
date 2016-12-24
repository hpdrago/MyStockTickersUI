/**
 * This class is the base calls for all model objects.
 *
 * Created by mike on 12/8/2016.
 */
export abstract class ModelObject<T>
{
    public abstract clone(): T;
}