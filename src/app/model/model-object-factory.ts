/**
 * Created by mike on 12/13/2016.
 */
export interface ModelObjectFactory<T>
{
    newModelObjectFromEvent( event ): T;
    newModelObject(): T;
}
