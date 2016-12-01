/**
 * Created by mike on 11/16/2016.
 */
import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { PortfolioStock } from "../../model/portfolio-stock";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Message, SelectItem } from "primeng/components/common/api";
import { StockSectorMap } from "../../model/stock-sectors";
import { StockService } from "../../service/stock.service";
import { Stock } from "../../model/stock";
import { PaginationPage } from "../../common/pagination";
import { ModelFactory } from "../../model/model-factory";
import { ValidationService } from "../../service/validation-service";
import { BaseComponent } from "../common/base.component";

@Component(
{
    selector: 'portfolio-stock-form',
    styleUrls: ['portfolio-stock-form.component.css'],
    templateUrl: 'portfolio-stock-form.component.html'
})
export class PortfolioStockFormComponent extends BaseComponent implements OnInit
{
    @Input()
    private portfolioStock: PortfolioStock;
    @Output()
    private onEnableSaveButton: EventEmitter<PortfolioStock> = new EventEmitter<PortfolioStock>();
    @Output()
    private stockForm: FormGroup;

    private messages: Message[] = [];
    private stockSectorMap: StockSectorMap = new StockSectorMap();
    private stockSubSectors: SelectItem[];
    private stockSectors: SelectItem[];
    private stockSearchResults: string[];
    private dataLoaded: boolean = false;
    private stockSearch: string;

    constructor( private formBuilder: FormBuilder,
                 private stockService: StockService )
    {
        super();
    }

    ngOnInit()
    {
        this.stockForm = this.formBuilder.group(
            {
                'stockSearch':        '',
                'tickerSymbol':       new FormControl( '', Validators.required ),
                'companyName':        '',
                'numberOfShares':     '',
                'costBasis':          '',
                'lastPrice':          '',
                'sector':             '',
                'subSector':          '',
                'realizedGain':       '',
                'realizedLoss':       '',
                'stopLossPrice':      '',
                'stopLossShares':     '',
                'profitTakingPrice':  '',
                'profitTakingShares': ''
            } );
        this.loadStockSectorMap();
        this.portfolioStock = ModelFactory.newPortfolioStockInstance();
        this.subscribeToFormChanges();
    }

    private subscribeToFormChanges()
    {
        /*
         * Initialize the change stream, the $ means an Observable variable
         */
        const myFormValueChanges$ = this.stockForm.valueChanges;
        /*
         * Subscribe to the stream
         */
        myFormValueChanges$.subscribe( (formData: any) =>
                                       {
                                           if ( this.stockForm.valid )
                                           {
                                               this.logger.log( "Form is valid emitting onEnableSaveButton" );
                                               this.onEnableSaveButton.emit(null);
                                           }
                                           else
                                           {
                                               this.logger.log( "Form is not valid" );
                                               for (let propertyName in this.stockForm.errors)
                                               {
                                                   if ( this.stockForm.errors.hasOwnProperty( propertyName ) &&
                                                        this.stockForm.touched )
                                                   {
                                                       return ValidationService.getValidatorErrorMessage( propertyName,
                                                                                                          this.stockForm.errors[propertyName] );
                                                   }
                                               }
                                           }
                                       });
    }

    /**
     * Loads the stock sectors
     */
    private loadStockSectorMap()
    {
        this.stockService
            .getStockSectors()
            .subscribe( ( data ) =>
                        {
                            this.logger.log( 'stock sector data: ' + JSON.stringify( data ) );
                            this.stockSectorMap.load( data );
                            this.stockSectors = this.stockSectorMap.getSectorSelectItems();
                            this.logger.log( 'stockSectors: ' + JSON.stringify( this.stockSectors ) );
                            this.dataLoaded = true;
                        },
                        err =>
                        {
                            error => console.error( err );
                            this.messages.push();
                        }
            );
    }

    /**
     * This method is called when the user selects a stock sector.
     * When this occurs, the sub sector dropdown is populated with the sub sectors
     * @param event
     */
    private onStockSectorChange( event )
    {
        this.logger.log( "onStockSectorChange: " + JSON.stringify( event.value ));
        this.stockSubSectors = this.stockSectorMap.getSubSectors( event.value.name );
        this.logger.log( "onStockSectorChange: " + JSON.stringify( this.stockSubSectors ));
    }

    /**
     * this method is called from the p-autoComplete component when the user is searching for a stock by company name
     * or ticker symbol.
     * @param event
     */
    private onStockSearch( event ): void
    {
        this.logger.log( "onStockSearch " + JSON.stringify( event.query ));
        this.stockService.getStocksCompaniesLike( event.query )
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
                                         error => console.error( err );
                                         this.messages.push();
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
        this.stockService.getStock( tickerSymbol )
                         .subscribe( (stock) =>
                                     {
                                         this.portfolioStock.lastPrice = stock.lastPrice;
                                         this.portfolioStock.tickerSymbol = tickerSymbol;
                                         this.portfolioStock.companyName = companyName;
                                         (<FormControl>this.stockForm.controls['tickerSymbol']).setValue( tickerSymbol );
                                         (<FormControl>this.stockForm.controls['companyName']).setValue( companyName );
                                     }
                                     ,
                                     err =>
                                     {
                                         error => console.error( err );
                                         this.messages.push();
                                     });
        this.stockForm.controls['stockSearch'].reset( "" );
        this.logger.log( "onStockSearchSelected tickerSymbol: " + this.portfolioStock.tickerSymbol );
    }

    private onMenuSelect( sector, subSector ): void
    {
        alert( "onMenuSelect sector: " + sector + " subSector: " + subSector );
    }

    /**
     * Determines if the ticker symbol is invalid
     * @returns {boolean}
     */
    private isTickerSymbolInvalid(): boolean
    {
        return !this.stockForm.controls['tickerSymbol'].valid &&
               this.stockForm.controls['tickerSymbol'].dirty;
    }

    /**
     * Determines if the company name is invalid
     * @returns {boolean}
     */
    private isCompanyNameInvalid(): boolean
    {
        return !this.stockForm.controls['companyName'].valid &&
               this.stockForm.controls['companyName'].dirty;
    }
}