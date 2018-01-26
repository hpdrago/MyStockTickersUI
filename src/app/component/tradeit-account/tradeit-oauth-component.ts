import { TradeItAccount } from "../../model/entity/tradeit-account";

/**
 * This interface defines the methods that a component must implement to handle OAuth events.
 */
export interface TradeitOAuthComponent
{
    /**
     * This method is called by the TradeIt popup window to communicate the authentication results.
     * @param event
     */
    receiveMessage( event: any );

    /**
     * Get the current TradeItAccount.
     * @return {TradeItAccount}
     */
    getTradeItAccount(): TradeItAccount;

    /**
     * Notify that the authentication succeeded.
     */
    notifyAuthenticationSuccess( tradeItAccount: TradeItAccount );
}
