/**
 * This enum identifies the values for the Stock Notes action taken
 */
export enum StockNotesActionTaken
{
    NONE = 0,
    BUY = 1,
    BUY_LATER = 2,
    SELL = 3
}
export namespace StockNotesActionTaken
{
    export function getName( action: any ): string
    {
        let returnValue = 'ERROR ' + action;
        switch( action )
        {
            case 0:
                returnValue = 'NONE';
                break;
            case 1:
                returnValue = 'BUY';
                break;
            case 2:
                returnValue = 'BUY LATER';
                break;
            case 3:
                returnValue = 'SELL';
                break;
            case '0':
                returnValue = 'NONE';
                break;
            case '1':
                returnValue = 'BUY';
                break;
            case '2':
                returnValue = 'BUY LATER';
                break;
            case '3':
                returnValue = 'SELL';
                break;
        }
        return returnValue;
    }
}
