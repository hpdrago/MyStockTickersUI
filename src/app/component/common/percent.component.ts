import { Component, Input } from '@angular/core';

/**
 * This component simply formats a number into a two decimal format.
 */
@Component
({
    selector: 'percent',
    template: `{{(percentValue/divideBy) | percent: '1.2-2' }}`
})
export class PercentComponent
{
    /**
     * The percentage value.
     */
    @Input()
    protected percentValue: number;

    /**
     * Optional value to divide {@code percentValue} by a constant value.
     * Defaults to 1.
     * @type {number}
     */
    @Input()
    protected divideBy: number = 1;
}
