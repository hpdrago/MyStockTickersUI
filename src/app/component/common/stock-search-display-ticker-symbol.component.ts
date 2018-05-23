/**
 * Created by mike on 5/23/2018
 */
import { BaseComponent } from './base.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StockCompany } from '../../model/entity/stock-company';
import { ToastsManager } from 'ng2-toastr';

/**
 * Displays the tickers symbol and allows the user to choose a new ticker symbol.
 */
@Component
({
    selector: 'stock-search-display-ticker-symbol',
    styleUrls: ['../crud/form/crud-form.component.css'],
    template: `
              <div class="ui-grid ui-grid-responsive ui-grid-pad ui-fluid" style="margin: 10px 0px">
                  <div class="crud-form ui-grid-row">
                      <div class="crud-form-label ui-grid-col-2">
                          <label class="crud-form" for="companyNameColumn">Stock:</label>
                      </div>
                      <div id="companyNameColumn" class="ui-grid-col-1">
                          {{tickerSymbol}}
                      </div>
                      <div id="companyNameColumn" class="ui-grid-col-9">
                          <stock-autocomplete id="autoComplete"
                                              (stockSelected)="onStockSelected( $event )">
                          </stock-autocomplete>
                      </div>
                  </div>
              </div>
              `
})
export class StockSearchDisplayTickerSymbolComponent extends BaseComponent
{
    @Input()
    protected tickerSymbol: string;

    @Output()
    private stockSelected: EventEmitter<StockCompany>  = new EventEmitter<StockCompany>();

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    protected onStockSelected( stockCompany: StockCompany )
    {
        this.tickerSymbol = stockCompany.tickerSymbol;
        this.stockSelected.emit( stockCompany );
    }

    public reset()
    {
        this.tickerSymbol = '';
    }
}
