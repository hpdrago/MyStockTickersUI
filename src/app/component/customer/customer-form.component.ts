import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { SessionService } from '../../service/session.service';
import { Customer } from '../../model/entity/customer';
import { CrudFormComponent } from '../crud/form/crud-form.component';
import { CustomerStateStore } from './customer-state-store';
import { CustomerFactory } from '../../model/factory/customer.factory';
import { CustomerController } from './customer-controller';
import { CustomerCrudService } from '../../service/crud/customer-crud.service';

/**
 * This is the Customer Form Component class.
 *
 * Created by mike on 12/4/2017.
 */
@Component( {
                selector: 'customer-form',
                styleUrls: ['../crud/form/crud-form.component.css'],
                templateUrl: './customer-form.component.html'
            } )
export class CustomerFormComponent extends CrudFormComponent<Customer>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {CustomerStateStore} customerStateStore
     * @param {CustomerController} customerController
     * @param {CustomerFactory} customerFactory
     * @param {CustomerCrudService} customerCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 protected customerStateStore: CustomerStateStore,
                 protected customerController: CustomerController,
                 protected customerFactory: CustomerFactory,
                 protected customerCrudService: CustomerCrudService )
    {
        super( toaster,
               customerStateStore,
               customerController,
               customerFactory,
               customerCrudService );
    }

    /**
     * Creates and identifies the fields for the FormGroup instance for the stock notes form.
     * @return {FormGroup}
     */
    protected createFormGroup(): FormGroup
    {
        this.debug( 'initializeForm ' );
        var stockNoteForm: FormGroup = this.formBuilder.group(
            {
                'email':       new FormControl( this.modelObject.email, Validators.required )
            } );
        return stockNoteForm;
    }

}
