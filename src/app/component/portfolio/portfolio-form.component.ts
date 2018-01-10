import { CrudFormComponent } from "../crud/form/crud-form.component";
import { Portfolio } from "../../model/entity/portfolio";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { PortfolioCrudServiceContainer } from "./portfolio-crud-service-container";

/**
 * This is the Portfolio Form Component class.
 *
 * Created by mike on 1/8/2017.
 */
@Component({
    selector: 'portfolio-form',
    styleUrls: ['../crud/form/crud-form.component.css'],
    templateUrl: './portfolio-form.component.html'
})
export class PortfolioFormComponent extends CrudFormComponent<Portfolio>
{
    constructor( protected toaster: ToastsManager,
                 private formBuilder: FormBuilder,
                 protected portfolioCrudServiceContainer: PortfolioCrudServiceContainer )
    {
        super( toaster, portfolioCrudServiceContainer );
    }

    protected createFormGroup(): FormGroup
    {
        var portfolioForm: FormGroup = this.formBuilder.group(
            {
                'portfolioName':  new FormControl( '', Validators.required )
            } );
        return portfolioForm;
    }

    protected readOnlyFields(): Array<string>
    {
        return ['portfolioName'];
    }

}
