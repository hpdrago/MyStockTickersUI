/**
 * Created by mike on 3/4/2018
 */

/**
 * This enum defines the loading status values for entities.  Some entities are loading asynchronously and this enum
 * defines the status of the loading.
 */
export enum LoadingStatus
{
    NEW,
    LOADED,
    LOADING
}
export namespace LoadingStatus
{
    export function getName( loadingStatus: any ): string
    {
        let returnValue = '';
        switch( loadingStatus )
        {
            case 0:
                returnValue = 'NEW';
                break;
            case 1:
                returnValue = 'LOADED';
                break;
            case 2:
                returnValue = 'LOADING';
                break;
        }
        return returnValue;
    }
}
