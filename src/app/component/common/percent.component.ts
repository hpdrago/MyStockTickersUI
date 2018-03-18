import { Component, Input } from '@angular/core';

/**
 * This component simply formats a number into a two decimal format.
 */
@Component
({
    selector: 'percent',
    template: `{{percentValue | percent: '1.2-2' }}`
})
export class PercentComponent
{
    @Input()
    protected percentValue: number;
}
