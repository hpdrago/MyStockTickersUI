/**
 * This class is the base calls for all model objects.
 *
 * Created by mike on 12/8/2016.
 */
export abstract class ModelObject<T>
{
    public createdBy: number;
    public updatedBy: number;

    /**
     * Duplicates a ModelObject
     */
    public abstract clone(): T;

    /**
     * Determines if two model objects are the equal.
     * @param modelObject
     */
    public abstract equals( modelObject: T );

    /**
     * Copies the JSON properties from {@code src} to {@code dest}
     * @param src
     * @param dest
     */
    protected copyProperties( src: T,  dest: T )
    {
        for ( var property in src )
        {
            dest[property] = src[property];
        }
    }
}