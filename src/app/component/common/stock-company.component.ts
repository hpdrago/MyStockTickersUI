import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { BaseCachedValueComponent } from './base-cached-value.component';
import { CachedValueState } from '../../common/cached-value-state.enum';
import { StockCompany } from '../../model/entity/stock-company';
import { StockCompanyCacheService } from '../../service/cache/stock-company-cache.service';
import { isNullOrUndefined } from 'util';

/**
 * Displays the company of a model object that implements {@code StockCompanyContainer}.
 * This component will evaluate the cache state of the {@code stockCompanyContainer} and display the appropriate message
 * if the data is not current, or the company name if the data is current.
 */
@Component
({
     selector: 'stock-company',
     template: `<cached-value [cachedStateContainer]="stockCompany">
                   <ng-content>
                   </ng-content>
                </cached-value>
               `
 })
export class StockCompanyComponent extends BaseCachedValueComponent implements OnInit
{
    protected stockCompany: StockCompany;

    @Output()
    protected stockCompanyChange: EventEmitter<StockCompany> = new EventEmitter<StockCompany>();

    /**
     * Ticker symbol to identify the stock quote to obtain.
     */
    @Input()
    protected tickerSymbol: string;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCompanyCacheService} stockCompanyCacheService
     */
    constructor( protected toaster: ToastsManager,
                 private stockCompanyCacheService: StockCompanyCacheService )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
        super.addSubscription( 'stockCompanyCache',
            this.stockCompanyCacheService
                .subscribeToChanges( this.tickerSymbol,
                                     (stockCompany: StockCompany) => this.onStockCompanyChange( stockCompany )));
    }

    /**
     *
     * @param {StockCompany} stockCompany
     */
    private onStockCompanyChange( stockCompany: StockCompany )
    {
        let methodName = 'onStockCompanyChange';
        this.debug( methodName + ' ' + JSON.stringify( stockCompany ));
        if ( !isNullOrUndefined( stockCompany ))
        {
            this.stockCompany = stockCompany;
            this.stockCompanyChange.emit( stockCompany );
        }
    }

    protected getCachedValueState(): CachedValueState
    {
        return this.stockCompany.getCacheState();
    }

    protected getFailureMessage(): string
    {
        return this.stockCompany.getCacheError();
    }
}
