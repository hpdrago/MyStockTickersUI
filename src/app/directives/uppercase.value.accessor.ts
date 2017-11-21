import { DefaultValueAccessor } from "@angular/forms";
import { Directive } from "@angular/core";

/**
 * https://stackoverflow.com/questions/35826325/how-to-convert-input-value-to-uppercase-in-angular-2-value-passing-to-ngcontrol
 */
@Directive( {
                selector: 'input[uppercase]',
                // When the user updates the input
                host: {'(input)': 'onChange($event.target.value.toUpperCase())'}
            } )
export class UppercaseValueAccessor extends DefaultValueAccessor
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
