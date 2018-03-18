import { Component, Input } from '@angular/core';

/**
 * This is a simple wrapper component for the date pipe that make its convenient to display a date without have to
 * remember the date format string which defaults to 'y-MM-dd' but can be changed with the input value {@code dateFormat}.
 */
@Component
({
    selector: 'date',
    template: `{{dateValue | date: dateFormat }}`
 })
export class DateComponent
{
    @Input()
    protected dateValue: Date;

    @Input()
    protected dateFormat: string = 'y-MM-dd';
}

