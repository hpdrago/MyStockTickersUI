/**
 * This enum identifies the possible values for StockCompany Notes bull or bear
 */
export enum StockNotesSentiment
{
    NEUTRAL = 0,
    BULL = 1,
    BEAR = 2
}
export namespace StockNotesSentiment
{
    export function getName( sentiment: string ): string
    {
        var returnValue = 'ERROR ' + sentiment;
        switch( sentiment )
        {
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
