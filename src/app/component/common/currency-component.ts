import { Component, Input } from '@angular/core';

/**
 * This component formats the dollars into a currency value in USD.
 */
@Component(
{
    selector: 'currency',
    template: `{{currencyValue | currency: currencyType : true}}`
})
export class CurrencyComponent
{
    @Input()
    private currencyValue: number;

    @Input()
    private currencyType: string = 'USD'
}
