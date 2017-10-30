/**
 * This class is the base class for all ModelObject factories.
 * It provides the methods to convert objects to and from JSON.
 *
 * Created by mike on 12/13/2016.
 */
export abstract class ModelObjectFactory<T>
{
    /**
     * Converts an array of Javascript object into an array of ModelObjects of type <T>
     * @param jsArray
     * @return {Array<T>}
     */
    public newModelObjectArray( jsonArray: Array<T> ): Array<T>
    {
        var tsObjects: Array<T> = [];
        for ( var jsObject of jsonArray )
        {
            var tsObject = this.newModelObjectFromJSON( jsObject ) ;
            tsObjects.push( tsObject );
        }
        return tsObjects;
    }

    /**
     * Converts a JS object into a TypeScript object
     * @param srcModelObject
     * @return {T}
     */
    public newModelObjectFromJSON( srcModelObject: T ): T
    {
        //console.log( "newModelObjectFromJSON " + JSON.stringify( object ) );
        var destModelObject = this.newModelObject();
        for ( var property in srcModelObject )
        {
            this.setModelObjectProperty( property, srcModelObject, destModelObject );
        }
        //console.log( "newModelObjectFromJSON " + JSON.stringify( modelObject ) );
        return destModelObject;
    }

    /**
     * This method is called for each property of an object to provide sub class factories to perform any conversion
     * operations from one type to another.
     * @param property
     * @param {T} srcModelObject
     * @param {T} destModelObject
     */
    protected setModelObjectProperty( property: string, srcModelObject: T, destModelObject: T )
    {
        destModelObject[property] = srcModelObject[property];
    }

    /**
     * Subclasses override this method to create a new object with default values.
     */
    public abstract newModelObject(): T;

    /**
     * Creates a clone of src
     * @param {T} src
     * @return {T}
     */
    public clone( src: T ): T
    {
        var dest: T = this.newModelObject();
        this.copyProperties( src,  dest );
        return dest;
    }

    /**
     * Copies the JSON properties from {@code src} to {@code dest}
     * @param src
     * @param dest
     */
    public copyProperties( src: T,  dest: T )
    {
        for ( var property in src )
        {
            dest[property] = src[property];
        }
    }

}
