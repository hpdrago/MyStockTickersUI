import { Component, EventEmitter, Output } from '@angular/core';
import { CommonButtonComponent } from '../../common/common-button.component';

@Component
({
     selector: 'crud-table-customize-button',
     templateUrl: './crud-table-button.component.html'
 })
export class CrudTableCustomizeButtonComponent extends CommonButtonComponent
{
    @Output()
    protected buttonClick = new EventEmitter<any>();

    /**
     * Constructor.
     */
    public constructor()
    {
        super();
    }

    public ngOnInit(): void
    {
        super.ngOnInit();
        this.buttonLabel = 'Customize';
        this.buttonIcon = 'fa fa-cog';
    }

    /**
     * This method is called when the Refresh button is clicked.
     * It will notify the button service that the button was clicked.
     */
    protected onButtonClick(): void
    {
        this.buttonClick.emit();
    }
}
