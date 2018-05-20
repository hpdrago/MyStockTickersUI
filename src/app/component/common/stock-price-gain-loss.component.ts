/**
 * Created by mike on 5/19/2018
 */
import { Component, Input } from '@angular/core';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';

/**
 * This component displays an amount (@code amount) colored red or green based on whether the {@code changeAmount}
 * is positive or no change (green), negative (red).
 */
@Component
({
    selector: 'stock-price-gain-loss',
    template: `<div class="positiveGain" *ngIf="changeAmount >= 0.0">
                   <currency [currencyValue]="amount">
                   </currency>
               </div>
               <div class="negativeGain" *ngIf="changeAmount < 0.0">
                   <currency [currencyValue]="amount">
                   </currency>
               </div> `
})
export class StockPriceGainLossComponent extends BaseComponent
{
    /**
     * The amount of change.
     */
    @Input()
    protected changeAmount: number;

    /**
     * The amount to display.
     */
    @Input()
    protected amount: number;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }
}
