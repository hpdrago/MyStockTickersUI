import { CrudFormComponent } from "../crud/form/crud-form.component";
import { Portfolio } from "../../model/entity/portfolio";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { PortfolioFactory } from '../../model/factory/portfolio.factory';
import { PortfolioController } from './portfolio-controller';
import { PortfolioStateStore } from './portfolio-state-store';
import { PortfolioCrudService } from '../../service/crud/portfolio-crud.service';
import { LinkedAccountStateStore } from '../linked-account/linked-account-state-store';
import { LinkedAccount } from '../../model/entity/linked-account';

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
    protected linkedAccount: LinkedAccount;

    /**
     * Constructor.
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {FormBuilder} formBuilder
     * @param {PortfolioStateStore} portfolioStateStore
     * @param {PortfolioController} portfolioController
     * @param {PortfolioFactory} portfolioFactory
     * @param {PortfolioCrudService} portfolioCrudService
     * @param {LinkedAccountStateStore} linkedAccountStateStore
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private formBuilder: FormBuilder,
                 private portfolioStateStore: PortfolioStateStore,
                 private portfolioController: PortfolioController,
                 private portfolioFactory: PortfolioFactory,
                 private portfolioCrudService: PortfolioCrudService,
                 private linkedAccountStateStore: LinkedAccountStateStore )
    {
        super( changeDetector,
               toaster,
               portfolioStateStore,
               portfolioController,
               portfolioFactory,
               portfolioCrudService );
    }

    public ngOnInit(): void
    {
        super.ngOnInit();
        this.linkedAccount = this.linkedAccountStateStore
                                 .getModelObject();
        this.checkArgument( 'linkedAccount', this.linkedAccount );
        this.modelObject.linkedAccountId = this.linkedAccount.id;
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
