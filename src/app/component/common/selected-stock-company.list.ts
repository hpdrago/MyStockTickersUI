import { StockCompanyList } from '../../common/stock-company.list';
import { StockCompanyService } from '../../service/crud/stock-company.service';
import { StockPriceQuoteService } from '../../service/crud/stock-price-quote.service';
import { StockCompany } from '../../model/entity/stock-company';

/**
 * This class manages the list of ticker symbols, last prices, and company names displayed on forms or other components
 * to indicate which stocks a user has select.  A list of stock companies is maintained and three string properties that
 * contain a comma delimited list of ticker symbols, last prices, and company name which can then be used to display
 * on a form.
 */
export class SelectedStockCompanyList extends StockCompanyList
{
    /**
     * Comma delimited list of ticker symbols
     */
    public tickerSymbols: string = "";
    public lastPrices: string = "";
    public companies: string = "";

    private formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        // the default value for minimumFractionDigits depends on the currency
        // and is usually already 2
    });


    /**
     * Constructor
     * @param {StockCompanyService} stockCompanyService
     * @param {StockPriceQuoteService} stockPriceQuoteService
     */
    constructor( protected stockCompanyService: StockCompanyService )
    {
        super( stockCompanyService )
    }

    protected addCompanyToList( stockCompany: StockCompany ): void
    {
        super.addCompanyToList( stockCompany );
        this.tickerSymbols = "";
        this.lastPrices = "";
        this.companies = "";
        this.stockCompanies
            .forEach( stockCompany =>
                      {
                          if ( this.tickerSymbols.length > 0 )
                          {
                              this.tickerSymbols += ', '
                              this.lastPrices += ', '
                              this.companies += ', '
                          }
                          this.tickerSymbols += stockCompany.tickerSymbol;
                          this.lastPrices += this.formatter.format( stockCompany.lastPrice );
                          this.companies += stockCompany.companyName;
                      });
    }

}
