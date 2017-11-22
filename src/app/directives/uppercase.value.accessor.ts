import { DefaultValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Directive, forwardRef, Provider } from "@angular/core";

/**
 * https://stackoverflow.com/questions/35826325/how-to-convert-input-value-to-uppercase-in-angular-2-value-passing-to-ngcontrol
 */
@Directive( {
                selector: 'input[upper]',
                // When the user updates the input
                host: {'(input)': 'onChange($event.target.value.toUpperCase())'},
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => UppercaseValueDirective ),
                        multi: true
                    }]
            } )
export class UppercaseValueDirective extends DefaultValueAccessor
{

    // When the code updates the value of the
    // property bound to the input
    writeValue( value: any ): void
    {
        if ( value != null )
        {
            super.writeValue( value.toUpperCase() );
        }
    }
}
