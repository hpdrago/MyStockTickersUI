import { Component, Input } from '@angular/core';
import { SelectedStockCompanyList } from './selected-stock-company.list';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { StockCompany } from '../../model/entity/stock-company';
import { StockCompanyService } from '../../service/crud/stock-company.service';
import { StockCompanyPriceQuoteService } from '../../service/stock-company-price-quote.service';

/**
 * This component displays the ticker symbols, last prices, and company names vertically based off of stock companies
 * found in the {@code stockCompanies} input list.  This component is used on forms to show the user the information
 * about the company(s) they have selected.
 */
@Component
({
    selector: 'selected-stock-companies',
    styleUrls: ['../crud/form/crud-form.component.css'],
    template: `<div class="ui-grid ui-grid-responsive ui-grid-pad ui-fluid">
                   <!----------------------------------------------------------------------------------------------------------
                    TICKER SYMBOLS
                    ------------------------------------------------------------------------------------------------------------>
                    <div class="crud-form ui-grid-row">
                        <div class="crud-form-label ui-grid-col-2">
                            <label class="crud-form">
                                <div *ngIf="maxCompanies == 1">
                                    Stock:
                                </div>
                                <div *ngIf="maxCompanies > 1">
                                    Stock(s):
                                </div>
                            </label>
                        </div>
                        <div class="ui-grid-col-10">
                            {{stockCompanies.tickerSymbols}}
                        </div>
                    </div>

                    <!----------------------------------------------------------------------------------------------------------
                    LAST PRICES
                    ------------------------------------------------------------------------------------------------------------>
                    <div class="ui-grid-row">
                        <div class="crud-form-label ui-grid-col-2">
                            <label class="crud-form" for="lastPriceColumn">
                                <div *ngIf="maxCompanies == 1">
                                    Last Price:
                                </div>
                                <div *ngIf="maxCompanies > 1">
                                    Last Price(s):
                                </div>
                            </label>
                        </div>
                        <div class="ui-grid-col-10">
                            {{stockCompanies.lastPrices}}
                        </div>
                    </div>

                    <!----------------------------------------------------------------------------------------------------------
                    COMPANIES
                    ------------------------------------------------------------------------------------------------------------>
                    <div class="ui-grid-row">
                        <div class="crud-form-label ui-grid-col-2">
                            <label class="crud-form" for="notes">
                                <div *ngIf="maxCompanies == 1">
                                    Company:
                                </div>
                                <div *ngIf="maxCompanies > 1">
                                    Company(s):
                                </div>
                            </label>
                        </div>
                        <div class="ui-grid-col-10">
                            {{stockCompanies.companies}}
                        </div>
                    </div>
                </div>
    `
 })
export class SelectedStockCompaniesComponent extends BaseComponent
{
    /**
     * Identifies how many companies can be added.
     * @type {number} Defaults to one company.
     */
    @Input()
    protected maxCompanies: number = 1;

    /**
     * This list of the selected companies.
     */
    protected stockCompanies: SelectedStockCompanyList;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCompanyPriceQuoteService} stockCompanyPriceQuoteService
     */
    public constructor( protected toaster: ToastsManager,
                        private stockCompanyPriceQuoteService: StockCompanyPriceQuoteService )
    {
        super( toaster );
        this.stockCompanies = new SelectedStockCompanyList( stockCompanyPriceQuoteService );
    }

    /**
     * Adds the stock company to the list.
     * @param {StockCompany} stockCompany
     */
    public addCompany( stockCompany: StockCompany )
    {
        if ( this.maxCompanies == 1 )
        {
            this.stockCompanies
                .clear();
        }
        this.stockCompanies
            .addCompany( stockCompany );
    }

    /**
     * Loads a stock company for the ticker symbol
     * @param {string} tickerSymbol
     */
    public loadCompany( tickerSymbol: string )
    {
        if ( this.maxCompanies == 1 )
        {
            this.stockCompanies
                .clear();
        }
        this.stockCompanies
            .loadCompany( tickerSymbol );
    }

    /**
     * Clears the companies list.
     */
    public reset()
    {
        this.debug( 'reset' );
        this.stockCompanies
            .clear();
    }

    /**
     * Get a list of the stock companies.
     * @return {Array<StockCompany>}
     */
    public getCompanies(): Array<StockCompany>
    {
        return this.stockCompanies
                   .toArray();
    }
}
