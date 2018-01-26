import { AsyncCacheService } from './async-cache.service';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { StockCompany } from '../../model/entity/stock-company';
import { StockCompanyFactory } from '../../model/factory/stock-company-factory';
import { StockCompanyService } from '../crud/stock-company.service';

/**
 * This class caches the {@code StockCompany}s.  It fetches the quotes when they are needed and refreshes the quotes
 * when they expire.  When stock quotes are loaded, all subscribers are notified of the stock quote change.
 */
@Injectable()
export class StockCompanyCacheService extends AsyncCacheService<string, StockCompany>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCompanyFactory} stockCompanyFactory
     * @param {StockCompanyService} stockCompanyService
     */
    public constructor( protected toaster: ToastsManager,
                        protected stockCompanyFactory: StockCompanyFactory,
                        protected stockCompanyService: StockCompanyService )
    {
        super( toaster, stockCompanyFactory );
    }

    /**
     * Get the stock quote.
     * @param {string} tickerSymbol
     * @return {Observable<StockCompany>}
     */
    protected fetchCachedDataFromBackend( tickerSymbol: string ): Observable<StockCompany>
    {
        this.debug( 'fetchCachedDataFromBackend ' + tickerSymbol );
        return this.stockCompanyService
                   .getStockCompany( tickerSymbol );
    }

}
