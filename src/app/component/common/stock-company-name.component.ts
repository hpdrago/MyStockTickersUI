import { Component, Input, OnInit } from '@angular/core';
import { StockCompanyContainer } from '../../model/common/stock-company-container';
import { ToastsManager } from 'ng2-toastr';
import { BaseCachedValueComponent } from './base-cached-value.component';
import { CachedValueState } from '../../common/cached-value-state.enum';
import { StockCompanyService } from '../../service/crud/stock-company.service';
import { StockCompany } from '../../model/entity/stock-company';

/**
 * Displays the company name of a model object that implements {@code StockCompanyContainer}.
 * This component will evaluate the cache state of the {@code stockCompanyContainer} and display the appropriate message
 * if the data is not current, or the company name if the data is current.
 */
@Component
({
     selector: 'stock-company-name',
     template: `<cached-value [cachedStateContainer]="stockCompany"
                              [failureMessage]="getFailureMessage()"
                              [staleMessage]="getStaleMessage()"
                              [notFoundMessage]="getNotFoundMessage()">
                    {{getDisplayValue()}}
                </cached-value>
    `
 })
export class StockCompanyNameComponent extends BaseCachedValueComponent implements OnInit
{
    @Input()
    protected stockCompany: StockCompanyContainer;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCompanyService} stockCompanyService
     */
    constructor( protected toaster: ToastsManager,
                 private stockCompanyService: StockCompanyService )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
        if ( CachedValueState.isStale( this.stockCompany.getStockCompanyCacheState() ))
        {
            this.stockCompanyService
                .getStockCompany( this.stockCompany.getTickerSymbol() )
                .subscribe( (stockCompany: StockCompany) =>
                {
                    this.stockCompany
                        .setCompanyName( stockCompany.companyName );
                    this.stockCompany
                        .setStockCompanyCacheState( stockCompany.cacheState );
                });
        }
    }

    protected getCachedValueState(): CachedValueState
    {
        return this.stockCompany.getStockCompanyCacheState();
    }

    protected getDisplayValue(): string
    {
        return this.stockCompany.getCompanyName();
    }

    protected getFailureMessage(): string
    {
        return this.stockCompany.getStockCompanyCacheError();
    }
}
