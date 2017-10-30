/**
 * This enum defines the possible reasons for the closing a dialog
 */
export enum DialogCloseEventType
{
    NONE = 0,
    CANCEL_BUTTON = 1,
    ADD_BUTTON = 2,
    SAVE_BUTTON = 3,
    OK_BUTTON = 4,
    CLOSE_BUTTON = 5
}
export namespace DialogCloseEventType
{
    export function getName( event: number ): string
    {
        var returnValue = 'ERROR ' + event;
        switch( event )
        {
            case 0:
                returnValue = 'NONE';
                break;
            case 1:
                returnValue = 'CANCEL_BUTTON';
                break;
            case 2:
                returnValue = 'ADD_BUTTON';
                break;
            case 3:
                returnValue = 'SAVE_BUTTON';
                break;
            case 4:
                returnValue = 'OK_BUTTON';
                break;
            case 5:
                returnValue = 'CLOSE_BUTTON';
                break;
        }
        return returnValue;
    }
}
