/**
 * Created by mike on 5/22/2018
 */
import { BaseComponent } from './base.component';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { StockCompany } from '../../model/entity/stock-company';
import { ToastsManager } from 'ng2-toastr';
import { StockCompanyService } from '../../service/crud/stock-company.service';
import { SelectedStockCompaniesComponent } from './selected-stock-companies.component';
import { StockAutoCompleteComponent } from './stock-autocomplete.component';
import { isNullOrUndefined } from 'util';

/**
 * This component combines the stock search and selection and the display of the selected stock companies.
 */
@Component
({
    selector: 'stock-search-selected-companies',
     styleUrls: ['../crud/form/crud-form.component.css'],
    template: `<div class="ui-grid ui-grid-responsive ui-grid-pad ui-fluid">
                  <div *ngIf="maxStocks > 1">
                      <div class="crud-form ui-grid-row">
                          <div class="crud-form-label ui-grid-col-2">
                          </div>
                          <div class="ui-grid-col-10">
                              When specifying multiple stocks, the note information will be duplicated for each stock
                          </div>
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

                  <selected-stock-companies [maxCompanies]="maxStocks">
                  </selected-stock-companies>
               </div>
              `
})
export class StockSearchSelectedCompaniesComponent extends BaseComponent
                                                   implements OnInit
{
    /**
     * Determines how many stocks are allowed to be entered.  Defaults to 1.
     * @type {number}
     */
    @Input()
    protected maxStocks: number = 1;

    /**
     * The ticker symbol for the existing selected stock.
     */
    @Input()
    protected tickerSymbol: string;

    /**
     * Emits the {@code StockCompany} when it is selected.
     * @type {EventEmitter<StockCompany>}
     */
    @Output()
    protected stockSelected: EventEmitter<StockCompany>  = new EventEmitter<StockCompany>();

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
     * Initialize the component.
     */
    public ngOnInit(): void
    {
        const methodName = 'ngOnInit';
        this.debug( methodName + ' @input tickerSymbol=' + this.tickerSymbol)
        this.debug( methodName + ' @input maxStocks=' + this.maxStocks)
        if ( !isNullOrUndefined( this.tickerSymbol ) && this.tickerSymbol.length > 0 )
        {
            this.selectedStockCompaniesComponent
                .loadCompany( this.tickerSymbol );
        }
    }

    /**
     * Reset the component.
     */
    public reset()
    {
        const methodName = 'reset';
        this.logMethodBegin( methodName );
        this.stockAutoCompleteComponent
            .reset();
        this.selectedStockCompaniesComponent
            .reset();
        this.logMethodEnd( methodName );
    }

    /**
     * Adds the stock company to the list.
     * @param {StockCompany} stockCompany
     */
    public addCompany( stockCompany: StockCompany )
    {
        this.debug( "addCompany: " + JSON.stringify( stockCompany ))
        this.selectedStockCompaniesComponent
            .addCompany( stockCompany );
    }

    /**
     * Loads a stock company for the ticker symbol
     * @param {string} tickerSymbol
     */
    public loadCompany( tickerSymbol: string )
    {
        this.debug( "loadCompany: " + tickerSymbol );
        if ( !isNullOrUndefined( tickerSymbol ))
        {
            this.selectedStockCompaniesComponent
                .loadCompany( tickerSymbol );
        }
    }

    /**
     * This method is called when the user selects a stock company.
     * The company is added to the list and the company is also emitted to any child components that also need to
     * receive the selected stock company.
     * @param {StockCompany} stockCompany
     */
    protected onStockSelected( stockCompany: StockCompany ): void
    {
        const methodName = 'onStockSelected';
        this.debug( methodName + ' ' + JSON.stringify( stockCompany ) );
        this.stockSelected.emit( stockCompany );
        this.addCompany( stockCompany );
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

    /**
     * Set the disabled flag on the component.
     * @param {boolean} disabled
     */
    public setDisabled( disabled: boolean ): void
    {
        this.debug( 'setDisabled: " + disabled: ' + disabled );
        super.setDisabled( disabled );
        this.selectedStockCompaniesComponent
            .setDisabled( disabled );
        this.stockAutoCompleteComponent
            .setDisabled( disabled );
    }
}

