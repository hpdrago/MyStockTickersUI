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
     * Determines if two model object primary keys are the equal.
     * @param modelObject
     */
    public abstract isEqualPrimaryKey( modelObject: T ): boolean;

    /**
     * Compares the two object's properties.
     * @param obj1
     * @param obj2
     * @returns {boolean}True if all properties are equal, false otherwise.
     */
    public isEqualProperties( otherModelObject: T ): boolean
    {
        return Object.keys( this ).every( function( prop )
        {
            return otherModelObject.hasOwnProperty( prop );
        });
    }

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