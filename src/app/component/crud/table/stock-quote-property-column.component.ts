import { BaseComponent } from '../../common/base.component';
import { Component, Input } from '@angular/core';
import { CrudTableColumn } from './crud-table-column';
import { ToastsManager } from 'ng2-toastr';
import { StockQuote } from '../../../model/entity/stock-quote';
import { isNullOrUndefined } from 'util';

/**
 * Displays a column where the property is extracted from a StockQuote.
 */
@Component
({
    selector: 'stock-quote-property-column',
    template: `<stock-quote [tickerSymbol]="tickerSymbol"
                            (stockQuoteChange)="onStockQuoteChange( stockQuote )">
                   <div *ngIf="isValidQuote( stockQuote )">
                       <crud-table-display-column [modelObject]="stockQuote"
                                                  [column]="column">
                       </crud-table-display-column>
                   </div>
               </stock-quote>
    `
 })
export class StockQuotePropertyColumnComponent extends BaseComponent
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
     * The stock  quote received from the cache.
     */
    protected stockQuote: StockQuote;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    protected onStockQuoteChange( stockQuote: StockQuote )
    {
        this.stockQuote = stockQuote;
    }

    protected isValidQuote( stockQuote: StockQuote )
    {
        return !isNullOrUndefined( stockQuote );
    }
}
