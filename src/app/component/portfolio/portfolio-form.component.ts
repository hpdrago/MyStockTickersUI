import { CrudFormComponent } from "../crud/form/crud-form.component";
import { Portfolio } from "../../model/entity/portfolio";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { PortfolioFactory } from '../../model/factory/portfolio.factory';
import { PortfolioController } from './portfolio-controller';
import { PortfolioStateStore } from './portfolio-state-store';

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
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {FormBuilder} formBuilder
     * @param {PortfolioStateStore} portfolioStateStore
     * @param {PortfolioController} portfolioController
     * @param {PortfolioFactory} portfolioFactory
     */
    constructor( protected toaster: ToastsManager,
                 private formBuilder: FormBuilder,
                 private portfolioStateStore: PortfolioStateStore,
                 private portfolioController: PortfolioController,
                 private portfolioFactory: PortfolioFactory )
    {
        super( toaster,
               portfolioStateStore,
               portfolioController,
               portfolioFactory );
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
