import { BaseComponent } from '../common/base.component';
import { ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';
import { ToastsManager } from 'ng2-toastr';
import { SelectItem } from 'primeng/api';
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccount } from '../../model/entity/linked-account';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from 'util';

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

    @Input()
    protected formControlName: string;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {LinkedAccountFactory} linkedAccountFactory
     * @param {LinkedAccountCrudService} linkedAccountService
     */
    constructor( protected toaster: ToastsManager,
                 private changeDetector: ChangeDetectorRef,
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
        const methodName = 'ngOnInit';
        this.logMethodBegin( methodName );
        let linkedAccount: LinkedAccount = this.linkedAccountFactory
                                               .newModelObject();
        this.linkedAccountService
            .getModelObjectList( linkedAccount )
            .subscribe( (linkedAccounts: LinkedAccount[]) =>
            {
                this.log( methodName + ' retrieving linked accounts' );
                linkedAccounts.forEach( (linkedAccount: LinkedAccount) =>
                                        {
                                            this.linkedAccountItems.push( {label: linkedAccount.accountName,
                                                                           value: linkedAccount.id } );
                                        })
                if ( !isNullOrUndefined( this.linkedAccountId ))
                {
                    this.log( methodName + ' linked account was already set, calling change detector' );
                    /*
                     * Force a change detection to get the drop down list box display the correct modelObjectRows.
                     */
                    let saveLinkedAccountId = this.linkedAccountId;
                    this.linkedAccountId = null;
                    this.changeDetector
                        .detectChanges();
                    this.linkedAccountId = saveLinkedAccountId;
                    this.changeDetector
                        .detectChanges();
                }
            });
        this.logMethodEnd( methodName );
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
        this.log( 'writeValue ' + linkedAccountId );
        this.linkedAccountId = linkedAccountId
    }
}
