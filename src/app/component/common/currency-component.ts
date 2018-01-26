import { Component, Input } from '@angular/core';

/**
 * This component formats the dollars into a currency modelObjectRows in USD.
 */
@Component(
{
    selector: 'currency',
    template: `{{currencyValue | currency: currencyType : 'symbol'}}`
})
export class CurrencyComponent
{
    @Input()
    protected currencyValue: number;

    @Input()
    protected currencyType: string = 'USD'
}
