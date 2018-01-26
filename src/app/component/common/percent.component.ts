import { Component, Input } from '@angular/core';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';

/**
 * This component simply formats a number into a two decimal format.
 */
@Component
({
    selector: 'percent',
    template: `{{(percentValue/divideBy) | percent: '1.2-2' }}`
})
export class PercentComponent extends BaseComponent
{
    /**
     * The percentage modelObjectRows.
     */
    @Input()
    protected percentValue: number;

    /**
     * Optional modelObjectRows to divide {@code percentValue} by a constant modelObjectRows.
     * Defaults to 1.
     * @type {number}
     */
    @Input()
    protected divideBy: number = 1;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

}
