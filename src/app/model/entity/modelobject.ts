/**
 * This class is the base calls for all model objects.
 *
 * Created by mike on 12/8/2016.
 */
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export abstract class ModelObject<T>
{
    @JsonProperty( "version", Number )
    public version: number;

    @JsonProperty( "createdBy", Number )
    public createdBy: number;

    @JsonProperty( "updatedBy", Number )
    public updatedBy: number;

    @JsonProperty( "dateCreate", Date )
    public dateCreated: Date;

    @JsonProperty( "dateModified", Date )
    public dateModified: Date;

    /**
     * Compares the two object's properties.
     * @param obj1
     * @param obj2
     * @returns {boolean}True if all properties are equal, false otherwise.
     */
    public isEqualProperties( otherModelObject: ModelObject<T> ): boolean
    {
        delete this['__jsonconvert__mapping__'];
        delete otherModelObject['__jsonconvert__mapping__'];
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

    /**
     * Returns the primary key value
     * @returns {any}
     */
    public abstract getPrimaryKeyValue(): any;

    /**
     * Returns the primary key name
     * @returns {any}
     */
    public abstract getPrimaryKeyName(): string;

    /**
     * Determines if two model object primary keys are the equal.
     * @param modelObject
     */
    public isEqualPrimaryKey( modelObject: ModelObject<T> ): boolean
    {
        return this.getPrimaryKeyValue() === modelObject.getPrimaryKeyValue();
    }
}
