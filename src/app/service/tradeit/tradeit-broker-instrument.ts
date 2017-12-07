/**
 * This class contains the supported functions for each broker.
 */
export class TradeitBrokerInstrument
{
    public instrument: string;
    public supportsAccountOverview: boolean;
    public supportsPositions: boolean;
    public supportsTrading: boolean;
    public supportsOrderStatus: boolean;
    public supportsTransactionHistory: boolean;
    public supportsOrderCanceling: boolean;
    public supportsFxRates: boolean;
    public isFeatured: boolean;
}
