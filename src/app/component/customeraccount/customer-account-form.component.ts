import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { SessionService } from "../../service/session.service";
import { CustomerAccount } from "../../model/entity/customer-account";
import { CustomerAccountCrudServiceContainer } from "./customer-account-crud-service-container";
import { SelectItem } from "primeng/primeng";
import { TradeItService } from "../../service/tradeit/tradeit.service";

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
                 private tradeItService: TradeItService,
                 private formBuilder: FormBuilder,
                 private customerAccountCrudServiceContainer: CustomerAccountCrudServiceContainer )
    {
        super( toaster, customerAccountCrudServiceContainer );
    }


    public ngOnInit(): void
    {
        super.ngOnInit();
        this.tradeItService
            .getBrokerSelectItems()
            .subscribe( items =>
                        {
                            this.log( "ngOnInit broker select items loaded" );
                            this.brokerageItems = items;
                        }
                        ,
                        error =>
                        {
                            this.reportRestError( error );
                        });
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
                'name':               new FormControl( this.modelObject.name, Validators.compose( [Validators.required,
                                                                                                             Validators.maxLength( 20 )])),
                'brokerage':          new FormControl( this.modelObject.brokerage, Validators.required )
            } );
        return stockNoteForm;
    }

}
