/**
 * Created by mike on 5/22/2018
 */
import { BaseComponent } from './base.component';
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { StockCompany } from '../../model/entity/stock-company';
import { ToastsManager } from 'ng2-toastr';
import { StockCompanyService } from '../../service/crud/stock-company.service';
import { SelectedStockCompaniesComponent } from './selected-stock-companies.component';
import { StockAutoCompleteComponent } from './stock-autocomplete.component';

/**
 * This component combines the stock search and selection and the display of the selected stock companies.
 */
@Component
({
    selector: 'stock-search-selected-companies',
     styleUrls: ['../crud/form/crud-form.component.css'],
    template: `<div class="ui-grid ui-grid-responsive ui-grid-pad ui-fluid" style="margin: 10px 0px">
                  <div class="crud-form ui-grid-row">
                      <div class="crud-form-label ui-grid-col-2">
                      </div>
                      <div class="ui-grid-col-10">
                          When specifying multiple stocks, the note information will be duplicated for each stock
                      </div>
                  </div>
                  <div class="crud-form ui-grid-row">
                      <div class="crud-form-label ui-grid-col-2">
                          <label class="crud-form" for="stockSearchCreate">Stock Search:</label>
                      </div>
                      <div class="ui-grid-col-10">
                          <stock-autocomplete id="stockSearchCreate"
                                              (stockSelected)="onStockSelected( $event )">
                          </stock-autocomplete>
                      </div>
                  </div>

                  <selected-stock-companies>
                  </selected-stock-companies>
               </div>
              `
})
export class StockSearchSelectedCompaniesComponent extends BaseComponent
{
    /**
     * Emits the {@code StockCompany} when it is selected.
     * @type {EventEmitter<StockCompany>}
     */
    @Output()
    private stockSelected: EventEmitter<StockCompany>  = new EventEmitter<StockCompany>();

    /**
     * Get the reference to the stock search component.
     */
    @ViewChild(StockAutoCompleteComponent)
    private stockAutoCompleteComponent: StockAutoCompleteComponent;

    /**
     * Displays the select stock company(s) information.
     */
    @ViewChild(SelectedStockCompaniesComponent)
    private selectedStockCompaniesComponent: SelectedStockCompaniesComponent;

    protected disabled: boolean = false;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCompanyService} stockCompanyService
     */
    public constructor( protected toaster: ToastsManager,
                        private stockCompanyService: StockCompanyService )
    {
        super( toaster );
    }

    /**
     * Reset the component.
     */
    public reset()
    {
        this.stockAutoCompleteComponent
            .reset();
        this.selectedStockCompaniesComponent
            .reset();
    }

    /**
     * Adds the stock company to the list.
     * @param {StockCompany} stockCompany
     */
    public addCompany( stockCompany: StockCompany )
    {
        this.selectedStockCompaniesComponent
            .addCompany( stockCompany );
    }

    /**
     * Loads a stock company for the ticker symbol
     * @param {string} tickerSymbol
     */
    public loadCompany( tickerSymbol: string )
    {
        this.selectedStockCompaniesComponent
            .loadCompany( tickerSymbol );
    }

    /**
     * This method is called when the user selects a stock company.
     * The company is added to the list and the company is also emitted to any child components that also need to
     * receive the selected stock company.
     * @param {StockCompany} stockCompany
     */
    protected onStockSelected( stockCompany: StockCompany ): void
    {
        let methodName = 'onStockSelected';
        this.debug( methodName + ' ' + JSON.stringify( stockCompany ) );
        this.stockSelected.emit( stockCompany );
    }

    /**
     * Get the list of selected companies.
     * @return {Array<StockCompany>}
     */
    public getCompanies(): Array<StockCompany>
    {
        return this.selectedStockCompaniesComponent
                   .getCompanies();
    }

    public setDisabled( disabled: boolean )
    {
        this.disabled = disabled
    }
}

