import { Component, Input, EventEmitter, Output, forwardRef } from "@angular/core";
import { PaginationPage } from "../../common/pagination";
import { StockCrudService } from "../../service/crud/stock-crud.service";
import { BaseComponent } from "../common/base.component";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { isNullOrUndefined } from "util";
import { StockQuote } from "../../model/entity/stock-quote";
/**
 * This component is a text input that finds stocks based on the incremental search of the input
 * Created by mike on 12/24/2016.
 */
@Component(
{
    /*[(ngModel)]="stockSearch"*/
    /*formControlName="{{formControlName}}"*/
    selector: 'stock-autocomplete',
    template: ` <p-autoComplete [suggestions]="stockSearchResults"
                                [(ngModel)]="tickerSymbol"
                                [minLength]="1"
                                (completeMethod)="onStockSearch( $event )"
                                (onSelect)="onStockSearchSelected( $event )"
                                (onBlur)="onBlur( $event )"
                                (onKeyUp)="onKeyUp( $event )"
                                uppercase
                                placeholder="Enter company name of ticker symbol">
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
    @Input()
    private formGroup: FormGroup;
    @Input()
    private formControlName: string;
    @Output()
    private stockSelected: EventEmitter<Stock>  = new EventEmitter<Stock>();

    private stockSearchResults: string[];
    private tickerSymbol: string;
    private disabled: boolean;
    private isStockSelected : boolean;

    constructor( protected toaster: ToastsManager,
                 private stockCrudService: StockCrudService )
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

    public ngAfterViewInit()
    {
        this.log( "ngAfterViewInit" );
        this.isStockSelected = false;
    }

    public ngAfterContentInit()
    {
        this.log( "ngAfterContentInit" );
    }

    private getFormControlName(): string
    {
        return this.formControlName;
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
                            this.reportRestError( err );
                        }
            );
    }

    /**
     * This method is called when the search input loses focus.
     * If the user hasn't selected a stock, then it's possible that the stock does not exist in the stock table so
     * now we'll make another search based on the ticker symbol value to see if we can get a quote for the symbol.
     * @param event
     */
    private onBlur( event )
    {
        this.log( "onBlur " + JSON.stringify( event ) +
                  " tickerSymbol: " + this.tickerSymbol +
                  " isStockSelected: " + this.isStockSelected );
        if ( !this.isStockSelected &&
             !isNullOrUndefined( this.tickerSymbol ) &&
             this.tickerSymbol.length > 0 )
        {
            this.stockCrudService
                .getStockQuote( this.tickerSymbol )
                .subscribe( ( stockQuote: StockQuote ) =>
                {
                    this.log( "onBlue " + JSON.stringify( stockQuote ));
                    if ( !isNullOrUndefined( stockQuote ))
                    {
                        let stock: Stock = new Stock();
                        stock.tickerSymbol = stockQuote.tickerSymbol;
                        stock.companyName = stockQuote.companyName;
                        stock.lastPrice = stockQuote.lastPrice;
                        this.log( "emitting stock selected event" );
                        /*
                         * Send the change through ngModel
                         */
                        this.propagateChange( this.tickerSymbol );
                        this.stockSelected.emit( stock );
                        this.isStockSelected = true;
                    }
                },
                ( error ) =>
                {
                    /*
                     * 404 = not found
                     */
                    if ( error.status != 404 )
                    {
                        this.reportRestError( error );
                    }
                })
        }
    }

    /**
     * This method is called by the p-autoComplete component when the user has selected one of the stock companies
     * as a result of a search
     * @param event
     */
    private onStockSearchSelected( event ): void
    {
        this.log( "onStockSearchSelected " + JSON.stringify( event ));
        var matches = /\[(.*)] (.*)/.exec( event );
        this.tickerSymbol = matches[1];
        /*
         * Send the change through ngModel
         */
        this.propagateChange( this.tickerSymbol.toUpperCase() );
        this.stockCrudService
            .getStock( this.tickerSymbol )
            .subscribe( (stock) =>
                        {
                            this.log( "onStockSearchSelected tickerSymbol: " + stock.tickerSymbol );
                            this.stockSelected.emit( stock );
                            this.isStockSelected = true;
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        });
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
