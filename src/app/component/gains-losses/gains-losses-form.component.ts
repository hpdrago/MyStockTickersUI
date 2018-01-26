import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SessionService } from "../../service/session.service";
import { GainsLossesController } from './gains-losses-controller';
import { GainsLossesStateStore } from './gains-losses-state-store';
import { isNullOrUndefined } from 'util';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { StockCompanyService } from '../../service/crud/stock-company.service';
import { StockCompany } from '../../model/entity/stock-company';
import { GainsLosses } from '../../model/entity/gains-losses';
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { GainsLossesCrudService } from '../../service/crud/gains-losses-crud.service';
import { CrudFormComponent } from '../crud/form/crud-form.component';
import { StockAutoCompleteComponent } from '../common/stock-autocomplete.component';

/**
 * This is the StockCompany ToBuy Form Component class.
 *
 * Created by Mike on 5/29/2018
 */
@Component
({
    selector: 'gains-losses-form',
    styleUrls: ['../crud/form/crud-form.component.css'],
    templateUrl: './gains-losses-form.component.html'
} )
export class GainsLossesFormComponent extends CrudFormComponent<GainsLosses>
{
    @ViewChild( StockAutoCompleteComponent )
    private stockAutoCompleteComponent: StockAutoCompleteComponent;

    /**
     * Constructor.
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {GainsLossesStateStore} gainsLossesStateStore
     * @param {GainsLossesController} gainsLossesController
     * @param {GainsLossesFactory} gainsLossesFactory
     * @param {GainsLossesCrudService} gainsLossesCrudService
     * @param {StockCompanyService} stockCompanyService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private gainsLossesStateStore: GainsLossesStateStore,
                 private gainsLossesController: GainsLossesController,
                 private gainsLossesFactory: GainsLossesFactory,
                 private gainsLossesCrudService: GainsLossesCrudService )
    {
        super( changeDetector,
               toaster,
               gainsLossesStateStore,
               gainsLossesController,
               gainsLossesFactory,
               gainsLossesCrudService );
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
                'tickerSymbol':     new FormControl( this.modelObject.tickerSymbol, Validators.required ),
                'linkedAccountId':  new FormControl( this.modelObject.linkedAccountId, Validators.required ),
                'gains':            new FormControl( this.modelObject.gains ),
                'losses':           new FormControl( this.modelObject.losses ),
            } );
        return stockNoteForm;
    }

    protected disableInputs(): void
    {
        super.disableInputs();
        if ( !isNullOrUndefined( this.stockAutoCompleteComponent ))
        {
            this.stockAutoCompleteComponent.setDisabledState( false );
        }
    }

    protected enableInputs(): void
    {
        super.enableInputs();
        if ( !isNullOrUndefined( this.stockAutoCompleteComponent ))
        {
            this.stockAutoCompleteComponent.setDisabledState( true );
        }
    }

    /**
     * Override to check to see that the user hasn't selected a stock to buy that already exists.
     * @param {StockPriceQuote} stockPriceQuote
     */
    protected onStockSelected( stockCompany: StockCompany )
    {
        const methodName = 'onStockSelected';
        this.logMethodBegin( methodName + ' ' + JSON.stringify( stockCompany ));
        this.modelObject
            .tickerSymbol = stockCompany.tickerSymbol;
        this.setFormValue( 'tickerSymbol', stockCompany.tickerSymbol );
        /*
         * There can only one stock to buy for a customer and ticker symbol combination.
         */
        let gainsLosses = this.gainsLossesFactory
                              .newModelObject();
        gainsLosses.tickerSymbol = stockCompany.tickerSymbol;
        this.crudRestService
            .getModelObject( gainsLosses )
            .subscribe( (existingGainsLosses: GainsLosses) =>
            {
                if ( !isNullOrUndefined( existingGainsLosses ))
                {
                    this.toaster.warning( 'A gain/loss entry already exists for ' +
                        existingGainsLosses.tickerSymbol );
                }
            });
        this.logMethodEnd( methodName );
    }
}
