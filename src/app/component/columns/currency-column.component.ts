import { Component, Input } from '@angular/core';

@Component
({
    selector: 'currency-column',
    template: `<div style="text-align: right">
                   <currency [currencyValue]="currencyValue">
                   </currency>
               </div>
    `
})
export class CurrencyColumnComponent
{
    @Input()
    protected currencyValue: number;
}
