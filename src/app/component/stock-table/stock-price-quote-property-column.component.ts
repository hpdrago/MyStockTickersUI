import { BaseComponent } from '../common/base.component';
import { Component, Input } from '@angular/core';
import { CrudTableColumn } from '../crud/table/crud-table-column';
import { ToastsManager } from 'ng2-toastr';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { isNullOrUndefined } from 'util';

/**
 * Displays a column where the property is extacted from a StockPriceQuote.
 */
@Component
({
    selector: 'stock-price-quote-property-column',
    template: `
        <stock-price-quote [tickerSymbol]="tickerSymbol"
                           (stockPriceQuoteChange)="stockPriceQuote">
            <div *ngIf="isValidQuote(stockPriceQuote)">
                <crud-table-column-by-data-type [modelObject]="stockPriceQuote"
                                                [column]="column">
                </crud-table-column-by-data-type>
            </div>
        </stock-price-quote>
    `
 })
export class StockPriceQuotePropertyColumnComponent extends BaseComponent
{
    /**
     * The ticker symbol is used to interface with the cache.
     */
    @Input()
    protected tickerSymbol: string;

    /**
     * Contains the column specification.
     */
    @Input()
    protected column: CrudTableColumn;

    /**
     * The stock price quote received from the cache.
     */
    protected stockPriceQuote: StockPriceQuote;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    protected isValidQuote( stockPriceQuote: StockPriceQuote )
    {
        return !isNullOrUndefined( stockPriceQuote );
    }
}
