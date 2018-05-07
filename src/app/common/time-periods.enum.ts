/**
 * This enum identifies the possible values for StockCompany Catalyst Event time periods
 */
export enum TimePeriods
{
    FIRST_HALF = 0,
    SECOND_HALF = 1,
    FIRST_QUARTER = 2,
    SECOND_QUARTER = 3,
    THIRD_QUARTER = 4,
    FOURTH_QUARTER = 5
}
export namespace TimePeriods
{
    export function getName( sentiment: any ): string
    {
        var returnValue = 'ERROR ' + sentiment;
        switch( sentiment )
        {
            case '0':
                returnValue = '1H';
                break;
            case '1':
                returnValue = '2H';
                break;
            case '2':
                returnValue = '1Q';
                break;
            case '3':
                returnValue = '2Q';
                break;
            case '4':
                returnValue = '3Q';
                break;
            case '5':
                returnValue = '4Q';
                break;
            case 0:
                returnValue = '1H';
                break;
            case 1:
                returnValue = '2H';
                break;
            case 2:
                returnValue = '1Q';
                break;
            case 3:
                returnValue = '2Q';
                break;
            case 4:
                returnValue = '3Q';
                break;
            case 5:
                returnValue = '4Q';
                break;
        }
        return returnValue;
    }
}
