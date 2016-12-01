/**
 * Created by mike on 11/27/2016.
 */

import { BaseComponent } from "./base.component";
import { Output, Input } from "@angular/core";
import { EventEmitter } from "@angular/common/src/facade/async";
import { CrudOperation } from "../../common/crud-operation";
import { FormGroup } from "@angular/forms";
import { Message } from "primeng/components/common/api";

export class CrudDialogComponent<T> extends BaseComponent
{
    @Input()
    crudOperation: CrudOperation;
    @Input()
    private visible: boolean = false;
    @Input()
    protected messages: Message[]
    @Input()
    private saveButtonDisabled: boolean;
    @Input()
    protected form: FormGroup;
    @Input()
    protected modelObject: T;

    @Output()
    protected onCloseButton: EventEmitter<null> = new EventEmitter<null>();
    @Output()
    protected onSaveButton: EventEmitter<null> = new EventEmitter<null>();

    constructor( )
    {
        super();
    }

    protected isModelObjectReadOnly(): boolean
    {
        return false;
    }

    protected onCloseButtonClick()
    {
        this.onCloseButton.emit();
    }

    protected onAddButtonClick()
    {
    }

    protected onDeleteButtonClick()
    {
    }

    protected onSaveButtonClick()
    {

    }

    /**
     * Enables the save button
     */
    protected enableSaveButton()
    {
        this.logger.log( "enableSaveButton" );
        this.saveButtonDisabled = false;
    }

    /**
     * Determines if the Save Button should be shown
     * @returns {boolean}
     */
    protected isShowSaveButton(): boolean
    {
        return this.crudOperation != CrudOperation.INSERT &&
            this.crudOperation != CrudOperation.NONE
    }

    /**
     * Determines if the Delete Button should be shown
     * @returns {boolean}
     */
    protected isShowDeleteButton(): boolean
    {
        return this.crudOperation != CrudOperation.INSERT &&
               this.crudOperation != CrudOperation.NONE;
    }

    /**
     * Determines if the Add Button should be shown
     * @returns {boolean}
     */
    protected isShowAddButton(): boolean
    {
        return this.crudOperation == CrudOperation.INSERT;
    }

    /**
     * Determines if the Add button is disabled.
     * @returns {boolean} true if adding a model object and the input data is valid,
     *                    false otherwise
     */
    protected isAddButtonDisabled()
    {
        var disabled = true;
        if ( this.crudOperation == CrudOperation.INSERT )
        {
            disabled = !this.form.valid;
        }
        return disabled;
    }

    /**
     * Determines if the Save button is disabled.
     * @returns {boolean} true if adding a model object and the input data is valid,
     *                    false otherwise
     */
    protected isSaveButtonDisabled()
    {
        var disabled = true;
        if ( this.crudOperation == CrudOperation.UPDATE &&
            !this.isModelObjectReadOnly() &&
            this.form.dirty )
        {
            disabled = !this.form.valid;
        }
        return disabled;
    }

    protected isDeleteButtonDisabled(): boolean
    {
        return false;
    }

}
