import { Component, Input } from '@angular/core';

/**
 * This component displays a percent in and colors the percentage green (>=0) and red (<0).
 */
@Component(
{
    selector: 'gain-loss-percent',
    template: `<div class="positiveGain" *ngIf="percentValue >= 0.0">
                    <percent [percentValue]="percentValue" [divideBy]="divideBy"></percent> 
               </div>
               <div class="negativeGain" *ngIf="percentValue < 0.0">
                   <percent [percentValue]="percentValue" [divideBy]="divideBy"></percent> 
               </div>
              `
})
export class GainLossPercentComponent
{
    @Input()
    protected percentValue: number;

    /**
     * Optional modelObjectRows to divide {@code percentValue} by a constant modelObjectRows.
     * Defaults to 1.
     * @type {number}
     */
    @Input()
    protected divideBy: number = 1;

}
