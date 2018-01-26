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

/**
 * This component is a text input that finds stocks based on the incremental search of the input
 * Created by mike on 12/24/2016.
 */
@Component(
{
    selector: 'stock-autocomplete',
    template: ` <p-autoComplete [suggestions]="stockSearchResults"
                                [(ngModel)]="stockCompany.tickerSymbol"
                                [minLength]="1"
                                (completeMethod)="onStockSearch( $event )"
                                (onSelect)="onStockSearchSelected( $event )"
                                (onBlur)="onBlur( $event )"
                                uppercase
                                [disabled]="disabledState || disabled"
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
    private stockSelected: EventEmitter<StockCompany>  = new EventEmitter<StockCompany>();

    protected stockSearchResults: string[];
    protected stockCompany: StockCompany;
    protected disabledState: boolean = false;
    private isStockSelected : boolean;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockPriceQuoteService} stockService
     * @param {StockCompanyService} stockCompanyService
     * @param {RestErrorReporter} restErrorReporter
     */
    constructor( protected toaster: ToastsManager,
                 private stockCompanyService: StockCompanyService,
                 private stockCompanyFactory: StockCompanyFactory,
                 private restErrorReporter: RestErrorReporter )
    {
        super( toaster );
    }

    public ngOnInit()
    {
        this.log( "ngOnInit" );
        this.stockCompany = this.stockCompanyFactory.newModelObject();
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
    }

    /**
     * This method is called from the p-autoComplete component when the user is searching for a stock by company name
     * or ticker symbol.
     * @param event
     */
    protected onStockSearch( event ): void
    {
        let methodName = 'onStockSearch';
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
                  " tickerSymbol: " + this.stockCompany.tickerSymbol +
                  " isStockSelected: " + this.isStockSelected );
        if ( !this.disabledState &&
             !this.isStockSelected &&
             !isNullOrUndefined( this.stockCompany.tickerSymbol ) &&
             this.stockCompany.tickerSymbol.length > 0 )
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
        if ( !this.disabledState )
        {
            var matches = /\[(.*)] (.*)/.exec( event );
            this.stockCompany.tickerSymbol = matches[1];
            /*
             * Send the change through ngModel
             */
            this.stockCompany.tickerSymbol = this.stockCompany.tickerSymbol.toUpperCase();
            this.propagateChange( this.stockCompany.tickerSymbol );
            this.getStockQuote();
        }
    }

    /**
     * Get a stock quote
     */
    private getStockQuote()
    {
        if ( !isNullOrUndefined( this.stockCompany.tickerSymbol ))
        {
            this.stockCompanyService
                .getStockCompany( this.stockCompany.tickerSymbol )
                .subscribe( ( stockCompany: StockCompany ) =>
                            {
                                this.log( 'onStockSearchSelected ' + JSON.stringify( stockCompany ) );
                                if ( CachedValueState.isNotFound( stockCompany.cacheState ))
                                {
                                    this.showError( stockCompany.tickerSymbol + ' was not found' );
                                }
                                else
                                {
                                    this.stockSelected.emit( stockCompany );
                                    this.stockCompany = this.stockCompanyFactory.newModelObject();
                                    this.isStockSelected = true;
                                }
                            },
                            error =>
                            {
                                let restException = new RestException( error );
                                if ( restException.isNotFoundError() )
                                {
                                    this.showError( this.stockCompany.tickerSymbol + ' was not found' );
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
            this.stockCompany.tickerSymbol = searchString.toUpperCase();
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
        /*
        this.tickThenRun( () =>
                          {
                              this.log( 'Setting disabledState=' + disabledState );
                              this.disabledState = disabledState;
                          });
                          */
    }

}
