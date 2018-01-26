import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { SessionService } from "../../service/session.service";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { SelectItem } from "primeng/primeng";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';
import { TradeItAccountController } from './tradeit-account-controller';
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountCrudService } from '../../service/crud/tradeit-account-crud.service';

/**
 * This is the Customer Account Form Component class.
 *
 * Created by mike on 10/17/2017.
 */
@Component( {
                selector: 'tradeit-account-form',
                styleUrls: ['../crud/form/crud-form.component.css'],
                templateUrl: './tradeit-account-form.component.html'
            } )
export class TradeItAccountFormComponent extends CrudFormComponent<TradeItAccount>
{
    private brokerageItems: SelectItem[];

    /**
     * Constructor.
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {TradeItAccountController} tradeItAccountController
     * @param {TradeItAccountFactory} tradeItAccountFactory
     * @param {TradeItAccountCrudService} tradeItCrudService
     * @param {TradeItService} tradeItService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private tradeItAccountStateStore: TradeItAccountStateStore,
                 private tradeItAccountController: TradeItAccountController,
                 private tradeItAccountFactory: TradeItAccountFactory,
                 private tradeItCrudService: TradeItAccountCrudService,
                 private tradeItService: TradeItService )
    {
        super( changeDetector,
               toaster,
               tradeItAccountStateStore,
               tradeItAccountController,
               tradeItAccountFactory,
               tradeItCrudService );
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
