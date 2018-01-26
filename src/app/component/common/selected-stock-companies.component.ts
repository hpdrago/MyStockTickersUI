import { Component, Input, ViewEncapsulation } from '@angular/core';
import { SelectedStockCompanyList } from './selected-stock-company.list';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';

/**
 * This component displays the ticker symbols, last prices, and company names vertically based off of stock companies
 * found in the {@code stockCompanies} input list.  This component is used on forms to show the user the information
 * about the company(s) they have selected.
 */
@Component
({
    selector: 'selected-stock-companies',
    styleUrls: ['../crud/form/crud-form.component.css'],
    template: `<div class="ui-grid ui-grid-responsive ui-grid-pad ui-fluid" style="margin: 10px 0px">
                   <!----------------------------------------------------------------------------------------------------------
                    TICKER SYMBOLS
                    ------------------------------------------------------------------------------------------------------------>
                    <div class="crud-form ui-grid-row">
                        <div class="crud-form-label ui-grid-col-2">
                            <label class="crud-form">
                                Selected Stocks:
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
                                Last Price:
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
                                Company:
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
    @Input()
    protected stockCompanies: SelectedStockCompanyList;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }
}
