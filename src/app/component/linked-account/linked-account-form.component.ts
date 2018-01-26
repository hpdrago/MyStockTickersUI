import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { SessionService } from "../../service/session.service";
import { SelectItem } from "primeng/primeng";
import { LinkedAccountCrudService } from '../../service/crud/linked-account-crud.service';
import { LinkedAccountFactory } from '../../model/factory/linked-account.factory';
import { LinkedAccountController } from './linked-account-controller';
import { LinkedAccountStateStore } from './linked-account-state-store';
import { LinkedAccount } from '../../model/entity/linked-account';

/**
 * This is the Customer Account Form Component class.
 *
 * Created by mike on 10/17/2017.
 */
@Component( {
                selector: 'linked-account-form',
                styleUrls: ['../crud/form/crud-form.component.css'],
                templateUrl: './linked-account-form.component.html'
            } )
export class LinkedAccountFormComponent extends CrudFormComponent<LinkedAccount>
{
    private brokerageItems: SelectItem[];

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {LinkedAccountStateStore} linkedAccountStateStore
     * @param {LinkedAccountController} linkedAccountController
     * @param {LinkedAccountFactory} linkedAccountFactory
     * @param {LinkedAccountCrudService} linkedAccountCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private linkedAccountStateStore: LinkedAccountStateStore,
                 private linkedAccountController: LinkedAccountController,
                 private linkedAccountFactory: LinkedAccountFactory,
                 private linkedAccountCrudService: LinkedAccountCrudService )
    {
        super( toaster,
               linkedAccountStateStore,
               linkedAccountController,
               linkedAccountFactory,
               linkedAccountCrudService );
    }

    /**
     * Creates and identifies the fields for the FormGroup instance for the stock notes form.
     * @return {FormGroup}
     */
    protected createFormGroup(): FormGroup
    {
        this.debug( "initializeForm " );
        var stockNoteForm: FormGroup = this.formBuilder.group(
            {
                'accountName': new FormControl( this.modelObject.accountName, Validators.compose( [Validators.required,
                                                                                                  Validators.maxLength( 40 )])),
            } );
        return stockNoteForm;
    }

}
