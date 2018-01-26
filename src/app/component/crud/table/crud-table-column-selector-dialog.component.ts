import { BaseComponent } from '../../common/base.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Column } from 'primeng/shared';

@Component
({
    selector: 'crud-table-column-selector-dialog',
    templateUrl: './crud-table-column-selector-dialog.html'
})
export class CrudTableColumnSelectorDialogComponent extends BaseComponent
{
    @Input()
    protected displayDialog: boolean;

    @Input()
    protected availableColumns: Column[];

    @Input()
    protected selectedColumns: Column[];

    @Output()
    protected cancelButtonClickedEvent: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    protected okButtonClickedEvent: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( public toaster: ToastsManager )
    {
        super( toaster );
    }

    protected onOkButtonClicked()
    {
        //this.displayDialog = false;
        this.okButtonClickedEvent.emit();
    }

    protected onCancelButtonClicked()
    {
        //this.displayDialog = false;
        this.cancelButtonClickedEvent.emit();
    }
}
