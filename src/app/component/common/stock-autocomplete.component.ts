import { Component, EventEmitter, forwardRef, Output } from "@angular/core";
import { PaginationPage } from "../../common/pagination";
import { StockInformationService } from "../../service/crud/stock-information.service";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { isNullOrUndefined } from "util";
import { StockPriceQuote } from "../../model/entity/stock-price-quote";
import { BaseComponent } from "./base.component";
import { RestErrorReporter } from "../../service/rest-error-reporter";
import { RestException } from '../../common/rest-exception';

/**
 * This component is a text input that finds stocks based on the incremental search of the input
 * Created by mike on 12/24/2016.
 */
@Component(
{
    selector: 'stock-autocomplete',
    template: ` <p-autoComplete [suggestions]="stockSearchResults"
                                [(ngModel)]="tickerSymbol"
                                [minLength]="1"
                                (completeMethod)="onStockSearch( $event )"
                                (onSelect)="onStockSearchSelected( $event )"
                                (onBlur)="onBlur( $event )"
                                (onKeyUp)="onKeyUp( $event )"
                                uppercase
                                placeholder="Enter company name or ticker symbol. Tab for expanded search">
               </p-autoComplete>
    `,
    providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => StockAutoCompleteComponent ),
        multi: true
    }]
} )
export class StockAutoCompleteComponent extends BaseComponent implements ControlValueAccessor
{
    @Output()
    private stockSelected: EventEmitter<StockPriceQuote>  = new EventEmitter<StockPriceQuote>();

    protected stockSearchResults: string[];
    protected tickerSymbol: string;
    private disabled: boolean;
    private isStockSelected : boolean;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     * @param {CrudRestErrorReporter} crudRestErrorReporter
     * @param {StockInformationService} stockCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private stockCrudService: StockInformationService,
                 private restErrorReporter: RestErrorReporter )
    {
        super( toaster );
    }

    public ngOnInit()
    {
        this.log( "ngOnInit" );
        if ( !this.stockSelected )
        {
            throw new Error( "stockSelected has not been set by Input value" );
        }
        this.reset();
    }

    public reset(): void
    {
        this.tickerSymbol = '';
        this.disabled = false;
        this.isStockSelected = false;
    }

    /**
     * This method is called from the p-autoComplete component when the user is searching for a stock by company name
     * or ticker symbol.
     * @param event
     */
    private onStockSearch( event ): void
    {
        var query: string = event.query;
        this.log( "onStockSearch " + query );
        this.propagateChange( query );
        this.stockCrudService
            .getStockCompaniesLike( query )
            .subscribe( ( data: PaginationPage<Stock> ) =>
                        {
                            this.stockSearchResults = [];
                            for ( let stock of data.content )
                            {
                                this.stockSearchResults.push( "[" + stock.tickerSymbol + "] " + stock.companyName );
                            }
                        },
                        err =>
                        {
                            this.restErrorReporter.reportRestError( err );
                        }
            );
    }

    /**
     * This method is called when the search input loses focus.
     * If the user hasn't selected a stock, then it's possible that the stock does not exist in the stock table so
     * now we'll make another search based on the ticker symbol value to see if we can get a quote for the symbol.
     * @param event
     */
    protected onBlur( event )
    {
        this.log( "onBlur " + JSON.stringify( event ) +
                  " tickerSymbol: " + this.tickerSymbol +
                  " isStockSelected: " + this.isStockSelected );
        if ( !this.isStockSelected &&
             !isNullOrUndefined( this.tickerSymbol ) &&
             this.tickerSymbol.length > 0 )
        {
            this.getStockQuote();
        }
    }

    /**
     * This method is called by the p-autoComplete component when the user has selected one of the stock companies
     * as a result of a search
     * @param event
     */
    protected onStockSearchSelected( event ): void
    {
        this.log( 'onStockSearchSelected ' + JSON.stringify( event ));
        var matches = /\[(.*)] (.*)/.exec( event );
        this.tickerSymbol = matches[1];
        /*
         * Send the change through ngModel
         */
        this.tickerSymbol = this.tickerSymbol.toUpperCase();
        this.propagateChange( this.tickerSymbol );
        this.getStockQuote();
    }

    /**
     * Get a stock quote
     */
    private getStockQuote()
    {
        this.stockCrudService
            .getStockPriceQuote( this.tickerSymbol )
            .subscribe( ( stockPriceQuote ) =>
                        {
                            this.log( 'onStockSearchSelected ' + JSON.stringify( stockPriceQuote.tickerSymbol ) );
                            if ( stockPriceQuote.isNotFound() )
                            {
                                this.showError( stockPriceQuote.tickerSymbol + ' was not found' );
                            }
                            else
                            {
                                this.stockSelected.emit( stockPriceQuote );
                                this.tickerSymbol = "";
                                this.isStockSelected = true;
                            }
                        },
                        error =>
                        {
                            let restException = new RestException( error );
                            if ( restException.isNotFoundError() )
                            {
                                this.showError( this.tickerSymbol + ' was not found' );
                            }
                            else
                            {
                                this.restErrorReporter.reportRestError( restException );
                            }
                        } );
    }

    private onKeyUp(event)
    {
        this.debug( "onChange " + JSON.stringify( event ) );
        // get value from text area
        //this.tickerSymbol = this.tickerSymbol.toUpperCase();
    }

    /*
     * The following methods are needed to send the stock information to the component
     * https://medium.com/@tarik.nzl/angular-2-custom-form-control-with-validation-json-input-2b4cf9bc2d73
     */
    public writeValue( searchString: string ): void
    {
        this.debug( "writeValue: " + searchString );
        if ( !isNullOrUndefined( searchString ) )
        {
            this.tickerSymbol = searchString.toUpperCase();
        }
    }

    /**
     * This is a placeholder function that is replace with a new function in registerOnChange
     * @param _
     */
    private propagateChange = ( _: any) => {};

    public registerOnChange( fn: any ): void
    {
        this.propagateChange = fn;
    }

    public registerOnTouched( fn: any ): void {}

    public setDisabledState( isDisabled: boolean ): void
    {
        this.disabled = isDisabled;
    }

}
