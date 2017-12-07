/**
 * This is the base class for all Tradeit API messages containing the common result and status properties.
 *
 * Created 12/7/2017
 */
export abstract class TradeitApiResult
{
    public status: string;
    public token: string;
    public shortMessage: string;
    public longMessages: string;
}
