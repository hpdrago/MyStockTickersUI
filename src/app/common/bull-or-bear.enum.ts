/**
 * This enum identifies the values for the StockCompany Notes bull or bear modelObjectRows
 */
export enum BullOrBear
{
    NEUTRAL = 0,
    BULL = 1,
    BEAR = 2
}
export namespace BullOrBear
{
    export function getName( bullOrBear: any ): string
    {
        let returnValue = 'ERROR ' + bullOrBear;
        switch( bullOrBear )
        {
            case 0:
                returnValue = 'NEUTRAL';
                break;
            case 1:
                returnValue = 'BULL';
                break;
            case 2:
                returnValue = 'BEAR';
                break;
            case '0':
                returnValue = 'NEUTRAL';
                break;
            case '1':
                returnValue = 'BULL';
                break;
            case '2':
                returnValue = 'BEAR';
                break;
        }
        return returnValue;
    }
}
