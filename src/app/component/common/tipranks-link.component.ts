import { Component, Input } from '@angular/core';

/**
 * This component simply creates a href link to TipRanks.com for a specific ticker symbol.
 */
@Component({
    selector: 'tipranks-link',
    template: `<a href="https://www.tipranks.com/stocks/{{tickerSymbol}}/price-target" target="_blank">{{displayValue}}</a>`
           })
export class TipRanksLinkComponent
{
    @Input()
    private tickerSymbol: string;

    @Input()
    private displayValue: string;
}
