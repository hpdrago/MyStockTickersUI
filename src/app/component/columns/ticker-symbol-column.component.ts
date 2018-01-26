import { Component, Input } from '@angular/core';

@Component
({
    selector: 'ticker-symbol-column',
    template: `<span style="{'width':'10px'}">{{tickerSymbol}}</span>
    `
})
export class TickerSymbolColumnComponent
{
    @Input()
    protected tickerSymbol: String;
}
