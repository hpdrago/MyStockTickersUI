import { BaseComponent } from '../../common/base.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Column } from 'primeng/shared';
import { CrudController } from '../common/crud-controller';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

/**
 * This component is used to customize the crud table by selecting and ordering the crudTableColumns allowing the user
 * to create their own preferences.
 */
@Component
({
    selector: 'crud-table-column-selector-dialog',
    templateUrl: './crud-table-column-selector-dialog.html'
})
export class CrudTableColumnSelectorDialogComponent extends BaseComponent
{
    protected _displayDialog: boolean;
    private okButtonClickedSubject = new Subject();
    private cancelButtonClickedSubject = new Subject();

    @Input()
    protected _availableColumns: Column[];

    @Input()
    protected _selectedColumns: Column[];

    @Output()
    protected cancelButtonClickedEvent: EventEmitter<void> = new EventEmitter<void>();

    @Output()
    protected okButtonClickedEvent: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudController<any>} controller
     */
    public constructor( public toaster: ToastsManager )
    {
        super( toaster );
    }

    /**
     * OK Button clicked handler
     */
    protected onOkButtonClicked()
    {
        this._displayDialog = false;
        this.okButtonClickedEvent.emit();
        this.okButtonClickedSubject.next();
    }

    /**
     * Cancel button clicked handler
     */
    protected onCancelButtonClicked()
    {
        this._displayDialog = false;
        this.cancelButtonClickedEvent.emit();
        this.cancelButtonClickedSubject.next();
    }

    /**
     * Subscribe to be notified when the OK button is clicked.
     * @param {() => any} callBack
     * @return {Subscription}
     */
    public subscribeToOkButtonClicked( callBack: () => any ): Subscription
    {
        return this.okButtonClickedSubject
                   .subscribe( callBack );
    }

    /**
     * Subscribe to be notified when the Cancel button is clicked.
     * @param {() => any} callBack
     * @return {Subscription}
     */
    public subscribeToCancelButtonClicked( callBack: () => any ): Subscription
    {
        return this.cancelButtonClickedSubject
                   .subscribe( callBack );
    }

    /**
     * Get the selected crudTableColumns.
     * @return {Column[]}
     */
    public get selectedColumns(): Column[]
    {
        return this._selectedColumns;
    }

    /**
     * Set the selected crudTableColumns.
     * @param {Column[]} value
     */
    public set selectedColumns( columns: Column[] )
    {
        this._selectedColumns = columns;
    }

    /**
     * Get the available crudTableColumns
     * @return {Column[]}
     */
    public get availableColumns(): Column[]
    {
        return this._availableColumns;
    }

    /**
     * Set the available crudTableColumns.
     * @param {Column[]} value
     */
    public set availableColumns( columns: Column[] )
    {
        this._availableColumns = columns;
    }

    /**
     * Control the display of the dialog.
     * @param {boolean} value
     */
    public set displayDialog( value: boolean )
    {
        this.debug( "displayDialog " + value );
        this._displayDialog = value;
    }
}
