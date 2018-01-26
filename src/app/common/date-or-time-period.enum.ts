/**
 * This enum identifies the possible values for Stock Catalyst Events
 */
export enum DateOrTimePeriod
{
    DATE = 0,
    TIMER_PERIOD = 1
}
export namespace DateOrTimePeriod
{
    export function getName( sentiment: any ): string
    {
        var returnValue = 'ERROR ' + sentiment;
        switch( sentiment )
        {
            case '0':
                returnValue = 'DATE';
                break;
            case '1':
                returnValue = 'TIME_PERIOD';
                break;
            case 0:
                returnValue = 'DATE';
                break;
            case 1:
                returnValue = 'TIME_PERIOD';
                break;
        }
        return returnValue;
    }
}
