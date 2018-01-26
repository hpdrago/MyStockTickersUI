import { Component, Input } from '@angular/core';

/**
 * This component displays the currency in green or read depending on the currency modelObjectRows.
 * GREEN = currency >= 0
 * RED = currency < 0
 */
@Component(
{
    selector: 'gain-loss-currency',
    template: `<div style="text-align: right">
                   <div class="positiveGain" *ngIf="currencyValue >= 0.0">
                       <currency [currencyValue]="currencyValue" 
                                 [currencyType]="currencyType">
                       </currency>
                   </div>
                   <div class="negativeGain" *ngIf="currencyValue < 0.0">
                       <currency [currencyValue]="currencyValue" 
                                 [currencyType]="currencyType">
                       </currency>
                   </div>
               </div>`
})
export class GainLossCurrencyComponent
{
    @Input()
    protected currencyValue: number;

    @Input()
    protected currencyType: string = 'USD'
}
