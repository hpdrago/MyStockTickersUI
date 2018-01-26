import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Output } from "@angular/core";
import { PaginationPage } from "../../common/pagination";
import { StockPriceQuoteService } from "../../service/crud/stock-price-quote.service";
import { ToastsManager } from "ng2-toastr";
import { StockCompany } from "../../model/entity/stock-company";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { isNullOrUndefined } from "util";
import { BaseComponent } from "./base.component";
import { RestErrorReporter } from "../../service/rest-error-reporter";
import { RestException } from '../../common/rest-exception';
import { StockCompanyService } from '../../service/crud/stock-company.service';
import { StockCompanyFactory } from '../../model/factory/stock-company-factory';
import { CachedValueState } from '../../common/cached-value-state.enum';
import { StockCompanyPriceQuoteService } from '../../service/stock-company-price-quote.service';

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
                                uppercase
                                [disabled]="disabledState || disabled"
                                placeholder="Enter company name or ticker symbol. Tab for expanded search when no results found">
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
    private stockSelected: EventEmitter<StockCompany>  = new EventEmitter<StockCompany>();

    @Output()
    private stockNotFound: EventEmitter<string>  = new EventEmitter<string>();

    protected stockSearchResults: string[];
    protected disabledState: boolean = false;
    private isStockSelected : boolean;
    private emittedTickerSymbol = '';
    protected tickerSymbol;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockCompanyService} stockCompanyService
     * @param {StockCompanyPriceQuoteService} stockCompanyPriceQuoteService
     * @param {StockCompanyFactory} stockCompanyFactory
     * @param {RestErrorReporter} restErrorReporter
     */
    constructor( protected toaster: ToastsManager,
                 private stockCompanyService: StockCompanyService,
                 private stockCompanyPriceQuoteService: StockCompanyPriceQuoteService,
                 private stockCompanyFactory: StockCompanyFactory,
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
    }

    public reset(): void
    {
        this.log( "reset" );
        this.setDisabledState( false );
        this.isStockSelected = false;
        this.emittedTickerSymbol = '';
        this.tickerSymbol = '';
    }

    /**
     * This method is called from the p-autoComplete component when the user is searching for a stock by company name
     * or ticker symbol.
     * @param event
     */
    protected onStockSearch( event ): void
    {
        const methodName = 'onStockSearch';
        let query: string = event.query;
        this.log( methodName + ' ' + query );
        if ( this.disabledState )
        {
            this.log( methodName + ' disabled returning' );
            return;
        }
        this.propagateChange( query );
        this.stockCompanyService
            .getStockCompaniesLike( query )
            .subscribe( ( data: PaginationPage<StockCompany> ) =>
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
        if ( !this.disabledState &&
            !isNullOrUndefined( this.tickerSymbol ) &&
             this.tickerSymbol.length > 0 )
        {
            if ( isNullOrUndefined( this.tickerSymbol ) ||
                 this.tickerSymbol != this.emittedTickerSymbol )
            {
                this.getStockCompany();
            }
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
        if ( !this.disabledState )
        {
            var matches = /\[(.*)] (.*)/.exec( event );
            this.tickerSymbol = matches[1];
            /*
             * Send the change through ngModel
             */
            this.tickerSymbol = this.tickerSymbol.toUpperCase();
            this.propagateChange( this.tickerSymbol );
            this.getStockCompany();
        }
    }

    /**
     * Look up the the full StockCompany information for the selected stock company.
     */
    private getStockCompany()
    {
        const methodName = 'getStockCompany';
        this.logMethodBegin( methodName + ' ' + this.tickerSymbol + ' ' + this.emittedTickerSymbol );
        if ( !isNullOrUndefined( this.tickerSymbol ) &&
             this.tickerSymbol != this.emittedTickerSymbol ) // prevent duplicate emits caused by onBlur and selection
        {
            /*
             * Assume we will emit the company since the user is presented with valid companies, we don't expect to
             * get any errors and we want to prevent duplicate searches and subsequent emits of stock companies.
             */
            this.emittedTickerSymbol = this.tickerSymbol;
            this.stockCompanyPriceQuoteService
                .getStockCompany( this.tickerSymbol )
                .subscribe( ( stockCompany: StockCompany ) =>
                            {
                                this.log( methodName + ' ' + JSON.stringify( stockCompany ) );
                                if ( CachedValueState.isNotFound( stockCompany.cacheState ))
                                {
                                    this.showError( stockCompany.tickerSymbol + ' was not found' );
                                }
                                else
                                {
                                    this.stockSelected
                                        .emit( stockCompany );
                                    this.emittedTickerSymbol = stockCompany.tickerSymbol;
                                    this.tickerSymbol = '';
                                    this.isStockSelected = true;
                                }
                            },
                            error =>
                            {
                                this.emittedTickerSymbol = '';
                                let restException = new RestException( error );
                                if ( restException.isNotFoundError() )
                                {
                                    /*
                                     * Let the registered handler handle the stock not found case.
                                     */
                                    if ( this.stockNotFound )
                                    {
                                        this.stockNotFound
                                            .emit( this.tickerSymbol );
                                    }
                                    else
                                    {
                                        this.showError( this.tickerSymbol + ' was not found' );
                                    }
                                }
                                else
                                {
                                    this.restErrorReporter.reportRestError( restException );
                                }
                            } );
        }
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

    public setDisabledState( disabledState: boolean ): void
    {
        this.log( 'Setting disabledState=' + disabledState );
        this.disabledState = disabledState;
    }

}
