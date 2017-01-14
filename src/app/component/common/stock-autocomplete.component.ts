import { Component, Input, EventEmitter, Output } from "@angular/core";
import { PaginationPage } from "../../common/pagination";
import { StockCrudService } from "../../service/stock-crud.service";
import { BaseComponent } from "./base.component";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/stock";
import { FormGroup, FormControl } from "@angular/forms";
/**
 * Created by mike on 12/24/2016.
 */

@Component(
{
    selector: 'stock-autocomplete',
    template: `<div [formGroup]="formGroup">
                   <p-autoComplete [(ngModel)]="stockSearch"
                                   formControlName="tickerSymbol"
                                   [suggestions]="stockSearchResults"
                                   [minLength]="1"
                                   (completeMethod)="onStockSearch( $event )"
                                   (onSelect)="onStockSearchSelected( $event )"
                                   uppercase 
                                   placeholder="Enter company name of ticker symbol">
               </p-autoComplete>
               </div>`
} )
export class StockAutoCompleteComponent extends BaseComponent
{
    @Input()
    private formGroup: FormGroup;
    @Output()
    private stockSelected: EventEmitter<Stock>  = new EventEmitter<Stock>();

    private stockSearch: string;
    private stockSearchResults: string[];

    constructor( protected toaster: ToastsManager,
                 private stockCrudService: StockCrudService )
    {
        super( toaster );
    }

    public ngOnInit()
    {
       this.logger.log( "ngOnInit" );
        if ( !this.stockSelected )
        {
            throw new Error( "stockSelected has not been set by Input value" );
        }
    }

    /**
     * this method is called from the p-autoComplete component when the user is searching for a stock by company name
     * or ticker symbol.
     * @param event
     */
    private onStockSearch( event ): void
    {
        this.logger.log( "onStockSearch " + JSON.stringify( event.query ));
        this.stockCrudService.getStockCompaniesLike( event.query )
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
     * This method is called by the p-autoComplete component when the user has selected one of the stock companies
     * as a result of a search
     * @param event
     */
    private onStockSearchSelected( event ): void
    {
        this.logger.log( "onStockSearchSelected " + JSON.stringify( event ));
        var matches = /\[(.*)] (.*)/.exec( event );
        var tickerSymbol = matches[1];
        var companyName = matches[2];
        this.stockCrudService.getStock( tickerSymbol )
            .subscribe( (stock) =>
                        {
                            this.logger.log( "onStockSearchSelected tickerSymbol: " + stock.tickerSymbol );
                            this.stockSelected.emit( stock );
                        }
                        ,
                        error =>
                        {
                            this.reportRestError( error );
                        });
    }
}