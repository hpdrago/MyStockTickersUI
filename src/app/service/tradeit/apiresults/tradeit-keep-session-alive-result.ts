import { TradeItAPIResult } from "./tradeit-api-result";
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { TradeItAuthenticateResult } from './tradeit-authenticate-result';

/**
 * This class contains the values returned from a call to the backend services to keep a session alive for a TradeIt
 * account. The results are the same as the authentication results.
 */
export class TradeItKeepSessionAliveResult extends TradeItAuthenticateResult
{

}
