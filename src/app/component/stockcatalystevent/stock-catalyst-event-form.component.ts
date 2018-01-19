import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { StockCatalystEventCrudServiceContainer } from "./stock-catalyst-event-crud-service-container";
import { SessionService } from "../../service/session.service";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { SelectItem } from "primeng/primeng";
import { DateOrTimePeriod } from "../../common/date-or-time-period.enum";
import { TimePeriods } from "../../common/time-periods.enum";

/**
 * This is the Stock CatalystEvent Form Component class.
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
    private dateOrTimePeriodOptions: SelectItem[];
    private timePeriodOptions: SelectItem[];
    private timePeriodYearOptions: SelectItem[];

    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockCatalystEventCrudServiceContainer: StockCatalystEventCrudServiceContainer )
    {
        super( toaster, stockCatalystEventCrudServiceContainer );
    }

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
        this.timePeriodYearOptions.push( { label: '2017', value: 2017 })
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
        this.modelObject.dateOrTimePeriod = event.value;
        if ( event.value == DateOrTimePeriod.TIMER_PERIOD )
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

    protected setDefaultValues(): void
    {
        super.setDefaultValues();
        this.modelObject.dateOrTimePeriod = DateOrTimePeriod.DATE;
    }

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    public onStockSelected( stock: Stock )
    {
        this.debug( "onStockSelected: " + JSON.stringify( stock ) );
        this.modelObject.companyName = stock.companyName;
        this.modelObject.tickerSymbol = stock.tickerSymbol;
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
}
