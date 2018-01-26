import { StockCompany } from '../model/entity/stock-company';
import { StockCompanyPriceQuoteService } from '../service/stock-company-price-quote.service';

/**
 * This class maintains a list of {@code StockCompany} instances.
 */
export class StockCompanyList
{
    protected stockCompanies: Array<StockCompany> = [];

    /**
     * Constructor
     * @param {StockCompanyPriceQuoteService} stockCompanyPriceQuoteService
     */
    constructor( protected stockCompanyPriceQuoteService: StockCompanyPriceQuoteService )
    {
    }

    /**
     * Adds a company to the list if not present already.
     * @param {string} tickerSymbol
     */
    public loadCompany( tickerSymbol: string )
    {
        if ( !this.containsCompany( tickerSymbol ))
        {
            this.stockCompanyPriceQuoteService
                .getStockCompany( tickerSymbol )
                .subscribe( stockCompany =>
                            {
                                if ( !this.containsCompany( stockCompany.tickerSymbol ) )
                                {
                                    this.addCompanyToList( stockCompany );
                                }
                            });
        }
    }

    /**
     * Add the stock company to the list.
     * @param {StockCompany} stockCompany
     */
    public addCompany( stockCompany: StockCompany ): void
    {
        if ( !this.containsCompany( stockCompany.tickerSymbol ))
        {
            this.addCompanyToList( stockCompany );
        }
    }

    /**
     * Returns true if the company is in the list.
     * @param {string} tickerSymbol
     * @return {boolean}
     */
    public containsCompany( tickerSymbol: string ): boolean
    {
        return this.stockCompanies
                   .filter( company => company.tickerSymbol === tickerSymbol )
                   .length > 0;
    }

    /**
     * Adds the company to the list -- appends the company to the array.
     * @param {StockCompany} stockCompany
     */
    protected addCompanyToList( stockCompany: StockCompany )
    {
        this.stockCompanies
            .push( stockCompany );
    }

    /**
     * Removes all of the companies from the list.
     */
    public clear()
    {
        this.stockCompanies = [];
    }

    /**
     * Get the list of stock companies.
     * @return {Array<StockCompany>}
     */
    public toArray(): Array<StockCompany>
    {
        return this.stockCompanies;
    }
}
