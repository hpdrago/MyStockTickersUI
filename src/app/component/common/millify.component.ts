
import { Component, Input } from '@angular/core';

/**
 * Converts a number to a short hand of K, M, B, ... millions, billions, ...
 *
 * https://www.npmjs.com/package/millify
 */
@Component
({
    selector: 'millify',
    template: `{{doMillify(value)}}`
 })
export class MillifyComponent
{
    @Input()
    protected value: number;

    /**
     * Found this function here: https://stackoverflow.com/questions/9461621/how-to-format-a-number-as-2-5k-if-a-thousand-or-more-otherwise-900-in-javascrip
     * @param {number} number
     * @return {number}
     */
    protected doMillify(number: number): any
    {
        var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
        // what tier? (determines SI symbol)
        var tier = Math.log10(number) / 3 | 0;

        // if zero, we don't need a suffix
        if(tier == 0) return number;

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = number / scale;

        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    }
}
