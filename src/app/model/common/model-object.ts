/**
 * This class is the base calls for all model objects.
 *
 * Created by mike on 12/8/2016.
 */
import { JsonObject, JsonProperty } from "json2typescript";
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { BaseClass } from '../../common/base-class';

@JsonObject
export abstract class ModelObject<T> extends BaseClass
{
    @JsonProperty( "version", Number )
    public version: number;

    @JsonProperty( "createdBy", String )
    public createdBy: string;

    @JsonProperty( "updatedBy", String )
    public updatedBy: string;

    @JsonProperty( "dateCreate", Date )
    public dateCreated: Date;

    @JsonProperty( "dateModified", Date )
    public dateModified: Date;

    public loadedTime: number;

    /**
     * Compares the two object's properties.
     * @param obj1
     * @param obj2
     * @returns {boolean}True if all properties are equal, false otherwise.
     */
    public isEqualProperties( otherModelObject: ModelObject<T> ): boolean
    {
        otherModelObject.removeJSONConversionProperties();
        return Object.keys( this ).every( function( prop )
        {
            return otherModelObject.hasOwnProperty( prop );
        });
    }

    /**
     * Remove the properties added by the JSON conversion utility.
     */
    public removeJSONConversionProperties(): void
    {
        delete this['__jsonconvert__mapping__'];
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
     * Returns the primary key modelObjectRows
     * @returns {any}
     */
    public abstract getPrimaryKeyValue(): any;

    /**
     * Returns the primary key name
     * @returns {any}
     */
    public abstract getPrimaryKeyName(): string;

    /**
     * Get all of the default columns to display in the table which will be the primitive properties of the  model object.
     * Whereas, the other crud table columns will include the columns form other model objects contained within the
     * model object by default, are empty.
     * @return {CrudTableColumns}
     */
    public getDefaultColumns(): CrudTableColumns
    {
        let crudTableColumns: CrudTableColumns = new CrudTableColumns( [] );
        crudTableColumns.addColumn( {
                                        colId: 'dateCreated',
                                        field: 'dateCreated',
                                        header: 'Created',
                                        dataType: CrudTableColumnType.DATE,
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'dateModified',
                                        field: 'dateModified',
                                        header: 'Modified',
                                        dataType: CrudTableColumnType.DATE,
                                        sortable: true
                                    } );
        return crudTableColumns;
    }

    /**
     * Get the crudTableColumns from other related model objects contained within this model object.
     * @return {CrudTableColumns}
     */
    public getAdditionalColumns(): CrudTableColumns
    {
        let crudTableColumns: CrudTableColumns = new CrudTableColumns( [] );
        return crudTableColumns;
    }

    /**
     * Determines if two model object primary keys are the equal.
     * @param modelObject
     */
    public isEqualPrimaryKey( modelObject: ModelObject<T> ): boolean
    {
        return this.getPrimaryKeyValue() === modelObject.getPrimaryKeyValue();
    }

    /**
     * Creates a clone of the model object.
     * @param {T} instance
     * @return {T}
     */
    public clone<T>(instance: T): T
    {
        const copy = new (instance.constructor as { new (): T })();
        Object.assign( copy, instance );
        return copy;
    }

    /**
     *
     * @return {T}
     */
    public cloneSelf<T>()
    {
        const copy = new (this.constructor as { new (): T })();
        Object.assign( copy, this );
        return copy;
    }
}
