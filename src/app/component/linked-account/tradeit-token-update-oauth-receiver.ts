import { TradeItOAuthReceiver } from '../tradeit-account/trade-it-o-auth-receiver';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { BaseClass } from '../../common/base-class';
import { TradeItAccountOAuthService } from '../../service/tradeit/tradeit-account-oauth.service';

/**
 * This class handles the call backs from the TradeIt Token Update process.  The token update process is required when
 * access token for the TradeIt account has expired and the user needs to update the token.
 */
export class TradeitTokenUpdateOauthReceiver extends BaseClass
                                             implements TradeItOAuthReceiver
{
    constructor( private tradeItOAuthService: TradeItAccountOAuthService,
                 private tradeItAccount: TradeItAccount )
    {
        super();
    }

    /**
     * This method is called when the user has successfully authenticated a brokerage account.
     */
    public notifyAuthenticationSuccess( tradeItAccount: TradeItAccount )
    {
        const methodName = "notifyAuthenticationSuccess";
        this.log( methodName + ".begin " + JSON.stringify( tradeItAccount ) );
        this.tradeItAccount = tradeItAccount;
        this.log( methodName + ".end" )
    }

    /**
     * This method is called from the popup window.
     *
     * NOTE: This method gets called twice instead of once on a successful login so the requestInProcess,
     * requestCompleted, and destroyed flags are used to prevent errors showing up as the second call results in a error from TradeIt.
     * @param event
     */
    public receiveMessage( event: any )
    {
        const methodName = "receiveMessage";
        this.log( methodName + ".begin" );
        /*
         * Just forward the call back to the OAuth service.
         */
        this.tradeItOAuthService.receiveMessage( event );
        this.log( methodName + ".end" );
    }

    public getTradeItAccount(): TradeItAccount
    {
        return this.tradeItAccount;
    }

}
