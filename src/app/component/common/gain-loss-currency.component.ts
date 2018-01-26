import { Component, Input } from '@angular/core';

/**
 * This component displays the currency in green or read depending on the currency value.
 * GREEN = currency >= 0
 * RED = currency < 0
 */
@Component(
{
    selector: 'gain-loss-currency',
    template: `
        <div class="positiveGain" *ngIf="currencyValue >= 0.0">
            <currency [currencyValue]="currencyValue" 
                      [currencyType]="currencyType">
            </currency>
        </div>
        <div class="negativeGain" *ngIf="currencyValue < 0.0">
            <currency [currencyValue]="currencyValue" 
                      [currencyType]="currencyType">
            </currency>
        </div>`
})
export class GainLossCurrencyComponent
{
    @Input()
    private currencyValue: number;

    @Input()
    private currencyType: string = 'USD'
}
