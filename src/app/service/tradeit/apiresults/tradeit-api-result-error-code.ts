import { TradeItAPIResult } from "./tradeit-api-result";

export enum TradeItAPIResultEnum
{
    SUCCESS,
    SYSTEM_ERROR,
    CONCURRENT_AUTHENTICATION_ERROR,
    BROKER_EXECUTION_ERROR,
    BROKER_AUTHENTICATION_ERROR,
    TOO_MANY_LOGIN_ATTEMPTS_ERROR,
    BROKER_ACCOUNT_ERROR,
    PARAMS_ERROR,
    SESSION_EXPIRED_ERROR,
    TOKEN_INVALID_OR_EXPIRED_ERROR
}
export namespace TradeItAPIResultEnum
{
    export function getSessionExpiredCode()
    {
        return 600;
    }
    export function codeValueOf( code: number ): string
    {
        switch( code )
        {
            case   0: return "SUCCESS";
            case 100: return "SYSTEM_ERROR";
            case 101: return "CONCURRENT_AUTHENTICATION_ERROR";
            case 200: return "BROKER_EXECUTION_ERROR";
            case 300: return "BROKER_AUTHENTICATION_ERROR";
            case 301: return "TOO_MANY_LOGIN_ATTEMPTS_ERROR";
            case 400: return "BROKER_ACCOUNT_ERROR";
            case 500: return "PARAMS_ERROR";
            case 600: return "SESSION_EXPIRED_ERROR";
            case 700: return "TOKEN_INVALID_OR_EXPIRED_ERROR";
        }
    }
    export function nameOf( tradeItAPIResult: TradeItAPIResult ): string
    {
        switch( tradeItAPIResult.code )
        {
            case   0: return "SUCCESS";
            case 100: return "SYSTEM_ERROR";
            case 101: return "CONCURRENT_AUTHENTICATION_ERROR";
            case 200: return "BROKER_EXECUTION_ERROR";
            case 300: return "BROKER_AUTHENTICATION_ERROR";
            case 301: return "TOO_MANY_LOGIN_ATTEMPTS_ERROR";
            case 400: return "BROKER_ACCOUNT_ERROR";
            case 500: return "PARAMS_ERROR";
            case 600: return "SESSION_EXPIRED_ERROR";
            case 700: return "TOKEN_INVALID_OR_EXPIRED_ERROR";
        }
    }
    export function valueOf( tradeItAPIResult: TradeItAPIResult ): TradeItAPIResultEnum
    {
        switch( tradeItAPIResult.code )
        {
            case   0: return TradeItAPIResultEnum.SUCCESS;
            case 100: return TradeItAPIResultEnum.SYSTEM_ERROR;
            case 101: return TradeItAPIResultEnum.CONCURRENT_AUTHENTICATION_ERROR;
            case 200: return TradeItAPIResultEnum.BROKER_EXECUTION_ERROR;
            case 300: return TradeItAPIResultEnum.BROKER_AUTHENTICATION_ERROR;
            case 301: return TradeItAPIResultEnum.TOO_MANY_LOGIN_ATTEMPTS_ERROR;
            case 400: return TradeItAPIResultEnum.BROKER_ACCOUNT_ERROR;
            case 500: return TradeItAPIResultEnum.PARAMS_ERROR;
            case 600: return TradeItAPIResultEnum.SESSION_EXPIRED_ERROR;
            case 700: return TradeItAPIResultEnum.TOKEN_INVALID_OR_EXPIRED_ERROR;
        }
    }
    export function isSystemError( tradeItAPIResult: TradeItAPIResult ): boolean
    {
        return tradeItAPIResult.code == 100;
    }
    export function isConcurrentAuthenticationError( tradeItAPIResult: TradeItAPIResult ): boolean
    {
        return tradeItAPIResult.code == 101;
    }
    export function isBrokerExecutionError( tradeItAPIResult: TradeItAPIResult ): boolean
    {
        return tradeItAPIResult.code == 200;
    }
    export function isBrokerAuthenticationError( tradeItAPIResult: TradeItAPIResult ): boolean
    {
        return tradeItAPIResult.code == 300;
    }
    export function isTooManyLoginAttempts( tradeItAPIResult: TradeItAPIResult ): boolean
    {
        return tradeItAPIResult.code == 301;
    }
    export function isBrokerAccountError( tradeItAPIResult: TradeItAPIResult ): boolean
    {
        return tradeItAPIResult.code == 400;
    }
    export function isParamsError( tradeItAPIResult: TradeItAPIResult ): boolean
    {
        return tradeItAPIResult.code == 500;
    }
    export function isSessionExpiredError( tradeItAPIResult: TradeItAPIResult ): boolean
    {
        return tradeItAPIResult.code == 600;
    }
    export function isTokenInvalidOrExpiredError( tradeItAPIResult: TradeItAPIResult ): boolean
    {
        return tradeItAPIResult.code == 700;
    }
}

    /*
    SYSTEM_ERROR( 100, "System Error", "System Error" ),
        CONCURRENT_AUTHENTICATION_ERROR( 101, "Concurrent Authentication Error", "Triggered when we are currently processing a login for a user and second request for the same user comes in." ),
        BROKER_EXECUTION_ERROR( 200, "Broker Execution Error", "User should modify the input for the trade request" ),
        BROKER_AUTHENTICATION_ERROR( 300, "Broker Authentication Error", "Authentication info is incorrect or the user may have changed their login information and the oAuth token is no longer valid." ),
        TOO_MANY_LOGIN_ATTEMPTS_ERROR( 301, "Too Many Login Attempts Error", "After 3 invalid login attempts in a row, the user IP will be blocked from TradeIt servers for a duration of 5 minutes." ),
        BROKER_ACCOUNT_ERROR( 400, "Broker TradeItAccount Error", "User credentials are valid, but needs to take action on the brokers site (ie. sign exchange agreement, sign margin agreement." ),
        PARAMS_ERROR( 500, "Parameters Error", "Publisher should check the parameters being passed in." ),
        SESSION_EXPIRED_ERROR( 600, "Session Expired", "Publisher should call authenticate again in order to generate a new session token." ),
        TOKEN_INVALID_OR_EXPIRED_ERROR( 700, "Token invalid or expired", "Publisher should call oAuthUpdate in order to refresh the token." );
        */
