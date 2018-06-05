import { BaseComponent } from '../common/base.component';
import { Component, forwardRef, OnInit } from '@angular/core';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';
import { ToastsManager } from 'ng2-toastr';
import { SelectItem } from 'primeng/api';
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccount } from '../../model/entity/linked-account';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Displays a drop down list of linked account;
 */
@Component
({
    selector: 'linked-account-selection',
    template: `<p-dropdown id="linkedAccountSelection"
                           class="crud-form"
                           [options]="linkedAccountItems"
                           (onChange)="onAccountSelected($event)"
                           [(ngModel)]="linkedAccountId"
                           [style]="{'width':'225px'}"
                           [disabled]="disabled"
                           placeholder="Select an Account">
               </p-dropdown>
    `,
     providers: [{
         provide: NG_VALUE_ACCESSOR,
         useExisting: forwardRef(() => LinkedAccountSelectionComponent ),
         multi: true
     }]
 })
export class LinkedAccountSelectionComponent extends BaseComponent
                                             implements OnInit,
                                                        ControlValueAccessor
{
    protected linkedAccountItems: SelectItem[] = [];
    protected linkedAccountId: string;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {LinkedAccountFactory} linkedAccountFactory
     * @param {LinkedAccountCrudService} linkedAccountService
     */
    constructor( protected toaster: ToastsManager,
                 private linkedAccountFactory: LinkedAccountFactory,
                 private linkedAccountService: LinkedAccountCrudService )
    {
        super( toaster );
    }

    /**
     * Loads the linked accounts.
     */
    public ngOnInit(): void
    {
        let linkedAccount: LinkedAccount = this.linkedAccountFactory
                                               .newModelObject();
        this.linkedAccountService
            .getModelObjectList( linkedAccount )
            .subscribe( (linkedAccounts: LinkedAccount[]) =>
            {
                linkedAccounts.forEach( (linkedAccount: LinkedAccount) =>
                                        {
                                            this.linkedAccountItems.push( {label: linkedAccount.accountName,
                                                                           value: linkedAccount.id } );
                                        })
            });
    }

    /**
     * This method is called when then user selects a linked account.
     * @param event
     */
    public onAccountSelected( event: any )
    {
        const methodName = 'onAccountSelected';
        this.log( methodName + ' ' + JSON.stringify( event ));
        this.linkedAccountId = event.value;
        this.propagateChange( this.linkedAccountId );
    }

    /**
     * This is a placeholder function that is replace with a new function in registerOnChange
     * @param _
     */
    private propagateChange = ( _: any) => {};

    public registerOnChange( fn: any ): void
    {
        this.propagateChange = fn;
    }

    public registerOnTouched( fn: any ): void {}

    public setDisabledState( isDisabled: boolean ): void
    {
        this.setDisabled( isDisabled );
    }

    public writeValue( linkedAccountId: any ): void
    {
        this.linkedAccountId = linkedAccountId
    }
}
