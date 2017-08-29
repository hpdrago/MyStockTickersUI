import { CrudFormComponent } from "../crud/crud-form.component";
import { Portfolio } from "../../model/class/portfolio";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { PortfolioFactory } from "../../model/factory/portfolio.factory";
import { PortfolioFormService } from "./portfolio-form.service";

/**
 * This is the Portfolio Form Component class.
 *
 * Created by mike on 1/8/2017.
 */
@Component({
    selector: 'portfolio-form',
    templateUrl: './portfolio-form.component.html'
})
export class PortfolioFormComponent extends CrudFormComponent<Portfolio>
{
    constructor( protected toaster: ToastsManager,
                 private formBuilder: FormBuilder,
                 protected portfolioFactory: PortfolioFactory,
                 protected portfolioFormService: PortfolioFormService )
    {
        super( toaster, portfolioFactory, portfolioFormService );
    }

    protected createCrudForm(): FormGroup
    {
        var portfolioForm: FormGroup = this.formBuilder.group(
            {
                'portfolioName':  new FormControl( '', Validators.required )
            } );
        return portfolioForm;
    }

    protected primaryKeyFields(): Array<string>
    {
        return ['portfolioName'];
    }

}
