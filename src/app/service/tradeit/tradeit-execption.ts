import { TradeItAPIResult } from "./apiresults/tradeit-api-result";

/**
 * This exception is thrown when an ERROR is reported by TradeIt on the return result of a REST API call.
 */
export class TradeItException
{
    constructor( protected tradeItApiResult: TradeItAPIResult )
    {
    }

    public getMessages(): string
    {
        return this.tradeItApiResult.getMessages();
    }

    public getShortMessage(): string
    {
        return this.tradeItApiResult.shortMessage;
    }

    public getLongMessages(): string[]
    {
        return this.tradeItApiResult.longMessages;
    }

    /**
     * Creates a new exception from the raw json returned from the REST API call to the backend.
     * @param rawJsonError
     * @returns {TradeItException}
     */
    public static createException( rawJsonError ): TradeItException
    {
        let apiResult: TradeItAPIResult = TradeItAPIResult.newInstance( rawJsonError );
        return new TradeItException( apiResult );
    }
}
