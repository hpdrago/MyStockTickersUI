import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SessionService } from "../../service/session.service";
import { Customer } from "../../model/entity/customer";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { CustomerCrudServiceContainer } from "./customer-crud-service-container";
import { CrudOperation } from "../crud/common/crud-operation";

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
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private customerCrudServiceContainer: CustomerCrudServiceContainer )
    {
        super( toaster, customerCrudServiceContainer );
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
                'email':       new FormControl( this.modelObject.email, Validators.required )
            } );
        return stockNoteForm;
    }

}
