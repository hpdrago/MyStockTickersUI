/**
 * Upper case directive found here:
 *     http://www.waynehong.com/javascript/angular-2-attribute-directive-typescript-example/
 * Created by mike on 10/15/2016.
 */

import { Directive, Input, Output, EventEmitter } from "@angular/core";

@Directive({
   selector: '[ngModel][uppercase]',
   host:
   {
       "(input)": 'onInputChange($event)'
   }
} )
export class UppercaseDirective
{
    @Output() ngModelChange:EventEmitter<any> = new EventEmitter()
    value: any

    onInputChange($event)
    {
        this.value = $event.target.value.toUpperCase()
        this.ngModelChange.emit(this.value)
    }
}
