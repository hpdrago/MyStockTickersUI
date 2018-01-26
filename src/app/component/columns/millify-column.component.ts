import { Component, Input } from '@angular/core';

/**
 * Component to format a number to a short hand in K, M, B, ...
 */
@Component
({
    selector: 'millify-column',
    template: `<div style="text-align: right">
                   <millify [value]="value">
                   </millify>
               </div>
    `
})
export class MillifyColumnComponent
{
    @Input()
    protected value: number;
}
