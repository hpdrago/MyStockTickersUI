/**
 * This class is the base class for all ModelObject factories.
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
            var tsObject = this.newModelObjectFromObject( jsObject ) ;
            tsObjects.push( tsObject );
        }
        return tsObjects;
    }

    /**
     * Converts a JSON string into a TypeScript object
     * @param object
     * @return {T}
     */
    public newModelObjectFromJSON( jsonString: string ): T
    {
        var modelObject: T = JSON.parse( jsonString );
        return modelObject;
    }

    /**
     * Converts a JS object into a TypeScript object
     * @param object
     * @return {T}
     */
    public newModelObjectFromObject( object: T ): T
    {
        //console.log( "newModelObjectFromObject " + JSON.stringify( object ) );
        var modelObject = this.newModelObject();
        for ( var property in object )
        {
            modelObject[property] = object[property];
        }
        //console.log( "newModelObjectFromObject " + JSON.stringify( modelObject ) );
        return modelObject;
    }

    /**
     * Subclasses override this method to create a new object with default values.
     */
    public abstract newModelObject(): T;
}
