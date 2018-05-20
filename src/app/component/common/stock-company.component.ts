import { Component, Input, OnInit } from '@angular/core';
import { StockCompanyContainer } from '../../model/common/stock-company-container';
import { ToastsManager } from 'ng2-toastr';
import { BaseCachedValueComponent } from './base-cached-value.component';
import { CachedValueState } from '../../common/cached-value-state.enum';
import { StockCompany } from '../../model/entity/stock-company';
import { StockCompanyCacheService } from '../../service/cache/stock-company-cache.service';

/**
 * Displays the company of a model object that implements {@code StockCompanyContainer}.
 * This component will evaluate the cache state of the {@code stockCompanyContainer} and display the appropriate message
 * if the data is not current, or the company name if the data is current.
 */
@Component
({
     selector: 'stock-company',
     template: `<cached-value [cachedStateContainer]="stockCompanyContainer"
                              [staleMessage]="getStaleMessage()"
                              [notFoundMessage]="getNotFoundMessage()">
                   <ng-content>
                   </ng-content>
                </cached-value>
               `
 })
export class StockCompanyComponent extends BaseCachedValueComponent implements OnInit
{
    @Input()
    protected stockCompanyContainer: StockCompanyContainer;

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
        this.stockCompanyCacheService
            .subscribeToChanges( this.stockCompanyContainer.getTickerSymbol(),
                                 (stockCompany: StockCompany) => this.onStockCompanyChange( stockCompany ));
    }

    /**
     *
     * @param {StockCompany} stockCompany
     */
    private onStockCompanyChange( stockCompany: StockCompany )
    {
        let methodName = 'onStockCompanyChange';
        this.debug( methodName + ' ' + JSON.stringify( stockCompany ));
        this.stockCompanyContainer.setStockCompany( stockCompany );
    }

    protected getCachedValueState(): CachedValueState
    {
        return this.stockCompanyContainer.getStockCompanyCacheState();
    }

    protected getFailureMessage(): string
    {
        return this.stockCompanyContainer.getStockCompanyCacheError();
    }
}
