/**
 * This class contains the configuration parameters for importing excel files into the gains and losses table.
 * Created by mike on 6/1/2018
 */
export class ImportConfiguration
{
    public clearEntries: boolean;
    public skipHeaderRows: number;
    public skipFooterRows: number;
    public tickerSymbolEmbeddedWithParens: boolean;
    public tickerSymbolColumn: number;
    public gainsColumn: number;
    public lossColumn: number;
    public gainsLossColumn: number;
}
