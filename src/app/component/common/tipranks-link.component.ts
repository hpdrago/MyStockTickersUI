import { Component, Input, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';

/**
 * This component simply creates a href link to TipRanks.com for a specific ticker symbol.
 */
@Component({
    selector: 'tipranks-link',
    template: `<a href="https://www.tipranks.com/stocks/{{tickerSymbol}}/price-target" target="_blank">{{displayValue}}</a>`
           })
export class TipRanksLinkComponent implements OnInit
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
            this.displayValue = 'TipRanks(' + this.tickerSymbol + ')';
        }
    }
}
