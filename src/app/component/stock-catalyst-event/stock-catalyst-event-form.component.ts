import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockCompany } from "../../model/entity/stock-company";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { SessionService } from "../../service/session.service";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { SelectItem } from "primeng/primeng";
import { DateOrTimePeriod } from "../../common/date-or-time-period.enum";
import { TimePeriods } from "../../common/time-periods.enum";
import { StockCatalystEventStateStore } from './stock-catalyst-event-state-store';
import { StockCatalystEventController } from './stock-catalyst-event-controller';
import { StockCatalystEventFactory } from '../../model/factory/stock-catalyst-event.factory';
import { StockCatalystEventCrudService } from '../../service/crud/stock-catalyst-event-crud.service';
import { StockSearchSelectedCompaniesComponent } from '../common/stock-search-selected-companies.component';

/**
 * This is the StockCompany CatalystEvent Form Component class.
 *
 * Created by mike on 10/17/2017.
 */
@Component( {
                selector: 'stock-catalyst-event-form',
                styleUrls: ['../crud/form/crud-form.component.css'],
                templateUrl: './stock-catalyst-event-form.component.html'
            } )
export class StockCatalystEventFormComponent extends CrudFormComponent<StockCatalystEvent>
{
    protected dateOrTimePeriodOptions: SelectItem[];
    protected timePeriodOptions: SelectItem[];
    protected timePeriodYearOptions: SelectItem[];

    @ViewChild( StockSearchSelectedCompaniesComponent )
    private stockSearchSelectedCompaniesComponent: StockSearchSelectedCompaniesComponent;

    /**
     * Constructor.
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {StockCatalystEventStateStore} stockCatalystEventStateStore
     * @param {StockCatalystEventController} stockCatalystEventController
     * @param {StockCatalystEventFactory} stockCatalystEventFactory
     * @param {StockCatalystEventCrudService} stockCatalystEventCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockCatalystEventStateStore: StockCatalystEventStateStore,
                 private stockCatalystEventController: StockCatalystEventController,
                 private stockCatalystEventFactory: StockCatalystEventFactory,
                 private stockCatalystEventCrudService: StockCatalystEventCrudService )
    {
        super( changeDetector, toaster,
               stockCatalystEventStateStore,
               stockCatalystEventController,
               stockCatalystEventFactory,
               stockCatalystEventCrudService );
    }

    /**
     * Initialization event.
     */
    public ngOnInit(): void
    {
        super.ngOnInit();
        this.dateOrTimePeriodOptions = [];
        this.dateOrTimePeriodOptions.push( {label: 'DATE', value: DateOrTimePeriod.DATE } );
        this.dateOrTimePeriodOptions.push( {label: 'TIME PERIOD', value: DateOrTimePeriod.TIMER_PERIOD } );

        this.timePeriodOptions = [];
        this.timePeriodOptions.push( { label: '1H', value: TimePeriods.FIRST_HALF })
        this.timePeriodOptions.push( { label: '2H', value: TimePeriods.SECOND_HALF })
        this.timePeriodOptions.push( { label: '1Q', value: TimePeriods.FIRST_QUARTER })
        this.timePeriodOptions.push( { label: '2Q', value: TimePeriods.SECOND_QUARTER })
        this.timePeriodOptions.push( { label: '3Q', value: TimePeriods.THIRD_QUARTER })
        this.timePeriodOptions.push( { label: '4Q', value: TimePeriods.FOURTH_QUARTER })

        this.timePeriodYearOptions = [];
        this.timePeriodYearOptions.push( { label: '2018', value: 2018 })
        this.timePeriodYearOptions.push( { label: '2019', value: 2019 })
        this.timePeriodYearOptions.push( { label: '2020', value: 2020 })
        this.timePeriodYearOptions.push( { label: '2021', value: 2021 })
        this.timePeriodYearOptions.push( { label: '2022', value: 2022 })
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
                'dateOrTimePeriod': new FormControl( this.modelObject.dateOrTimePeriod, Validators.required ),
                'catalystDate':     new FormControl( this.modelObject.catalystDate ),
                'timePeriod':       new FormControl( this.modelObject.timePeriod ),
                'timePeriodYear':   new FormControl( this.modelObject.timePeriodYear ),
                'catalystDesc':     new FormControl( this.modelObject.catalystDesc, Validators.required )
            } );
        return stockNoteForm;
    }

    protected isTimePeriod(): boolean
    {
        return this.modelObject.dateOrTimePeriod == DateOrTimePeriod.TIMER_PERIOD;
    }

    protected onDateOrTimePeriodChange( event )
    {
        const methodName = 'onDateOrTimePeriodChange';
        this.log( methodName + ' ' + JSON.stringify( event ));
        this.modelObject.dateOrTimePeriod = event.value;
        this.enableDisableDateAndTimerPeriodFields();
    }

    /**
     * Set the default values.
     */
    protected setDefaultValues(): void
    {
        super.setDefaultValues();
        this.modelObject.dateOrTimePeriod = DateOrTimePeriod.DATE;
        this.enableDisableDateAndTimerPeriodFields();
    }

    private enableDisableDateAndTimerPeriodFields(): void
    {
        if ( this.modelObject.dateOrTimePeriod == DateOrTimePeriod.TIMER_PERIOD )
        {
            this.enableField( 'timePeriod' );
            this.enableField( 'timePeriodYear' );
            this.disableField( 'catalystDate' );
        }
        else
        {
            this.disableField( 'timePeriod' );
            this.disableField( 'timePeriodYear' );
            this.enableField( 'catalystDate' );
        }
    }

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    public onStockSelected( stockCompany: StockCompany )
    {
        this.debug( "onStockSelected: " + JSON.stringify( stockCompany ) );
        this.modelObject.stockQuote.companyName = stockCompany.companyName;
        this.modelObject.tickerSymbol = stockCompany.tickerSymbol;
        this.setFormValue( 'tickerSymbol', stockCompany.tickerSymbol );
    }

    /**
     * Determines if the ticker symbol is invalid
     * @returns {boolean}
     */
    public isTickerSymbolInvalid(): boolean
    {
        return !this.formGroup.controls['tickerSymbol'].valid &&
               this.formGroup.controls['tickerSymbol'].dirty;
    }

    protected resetForm(): void
    {
        super.resetForm();
        if ( this.stockSearchSelectedCompaniesComponent )
        {
            this.stockSearchSelectedCompaniesComponent.reset();
        }
    }
}
