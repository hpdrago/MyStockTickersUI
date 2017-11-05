/**
 * This class is the base calls for all model objects.
 *
 * Created by mike on 12/8/2016.
 */
export abstract class ModelObject<T>
{
    public version: number;
    public createdBy: number;
    public updatedBy: number;
    public dateCreated: Date;
    public dateModified: Date;

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
    public isEqualProperties( otherModelObject: ModelObject<T> ): boolean
    {
        return Object.keys( this ).every( function( prop )
        {
            return otherModelObject.hasOwnProperty( prop );
        });
    }

    /**
     * Determines if the this model object and the other model object are of the same database version.
     * @param {T} otherModelObject
     * @returns {boolean}
     */
    public isDifferentVersion( otherModelObject: ModelObject<T> ): boolean
    {
        return this.version != otherModelObject.version;
    }
}
