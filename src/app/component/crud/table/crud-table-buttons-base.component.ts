import { Input } from '@angular/core';

/**
 * This is the base class for all crud table buttons components and defines the additional buttons that can be added
 * to the table beyond the add, delete, update, and refresh buttons.
 */
export class CrudTableButtonsBaseComponent
{
    @Input()
    protected includeCustomizeButton: boolean = true;
}
