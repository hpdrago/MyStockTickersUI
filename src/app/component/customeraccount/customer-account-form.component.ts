import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { SessionService } from "../../service/session.service";
import { CustomerAccount } from "../../model/entity/customer-account";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";
import { SelectItem } from "primeng/primeng";

/**
 * This is the Customer Account Form Component class.
 *
 * Created by mike on 10/17/2017.
 */
@Component( {
                selector: 'customer-account-form',
                styleUrls: ['../crud/form/crud-form.component.css'],
                templateUrl: './customer-account-form.component.html'
            } )
export class CustomerAccountFormComponent extends CrudFormComponent<CustomerAccount>
{
    private brokerageItems: SelectItem[];
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockToBuyCrudServiceContainer: CustomerAccountCrudServiceContainer )
    {
        super( toaster, stockToBuyCrudServiceContainer );
    }


    public ngOnInit(): void
    {
        super.ngOnInit();
        this.brokerageItems = [];
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
                'name':               new FormControl( this.modelObject.name, Validators.required ),
                'comments':           new FormControl( this.modelObject.brokerage, Validators.compose( [Validators.required,
                                                                                                                Validators.maxLength( 20 )]))
            } );
        return stockNoteForm;
    }

}
