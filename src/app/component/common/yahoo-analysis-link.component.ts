import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

/**
 * This component simply creates a href link to TipRanks.com for a specific ticker symbol.
 */
@Component
({
    selector: 'yahoo-analysis-link',
    template: `<a href="https://finance.yahoo.com/quote/{{tickerSymbol}}/analysis?p={{tickerSymbol}}" target="_blank">{{displayValue}}</a>`
})
export class YahooAnalysisLinkComponent implements OnInit
{
    @Input()
    protected tickerSymbol: string;

    @Input()
    protected displayValue: string;

    public ngOnInit(): void
    {
        if ( isNullOrUndefined( this.tickerSymbol ))
        {
            throw new ReferenceError( 'tickerSymbol cannot be null' );
        }
        if ( isNullOrUndefined( this.displayValue ))
        {
            this.displayValue = 'Yahoo(' + this.tickerSymbol + ')';
        }
    }
}
