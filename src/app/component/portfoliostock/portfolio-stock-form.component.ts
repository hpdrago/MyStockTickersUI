import { Component, OnInit } from "@angular/core";
import { PortfolioStock } from "../../model/portfolio-stock";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { SelectItem } from "primeng/components/common/api";
import { Stock } from "../../model/stock";
import { PaginationPage } from "../../common/pagination";
import { CrudFormComponent } from "../common/crud-form.component";
import { StockSectorList } from "../../model/stock-sectors.list";
import { PortfolioStockFactory } from "../../model/portfolio-stock-factory";
import { PortfolioStockFormService } from "./portfolio-stock-form.service";
import { StockCrudService } from "../../service/stock-crud.service";
import { StockSectorCrudService } from "../../service/stock-sector-crud.service";
import { ToastsManager } from "ng2-toastr";

/**
 * Created by mike on 11/16/2016.
 */
@Component(
{
    selector:    'portfolio-stock-form',
    styleUrls:   ['./portfolio-stock-form.component.css'],
    templateUrl: './portfolio-stock-form.component.html',
    inputs:      ['modelObject']
})
export class PortfolioStockFormComponent extends CrudFormComponent<PortfolioStock> implements OnInit
{
    private stockSectorMap: StockSectorList = new StockSectorList();
    private stockSubSectors: SelectItem[];
    private stockSectors: SelectItem[];
    private stockSearchResults: string[];
    private dataLoaded: boolean = false;
    private stockSearch: string;

    constructor( protected toaster: ToastsManager,
                 protected formBuilder: FormBuilder,
                 protected stockCrudService: StockCrudService,
                 protected portfolioStockFormService: PortfolioStockFormService,
                 protected stockSectorService: StockSectorCrudService,
                 protected portfolioStockFactory: PortfolioStockFactory )
    {
        super( toaster, portfolioStockFormService, portfolioStockFactory );
    }

    /**
     * Component initialization
     */
    public ngOnInit()
    {
        super.ngOnInit();
        this.loadStockSectorMap();
    }

    /**
     * Create the form.  This method is called by the super class
     * @return {FormGroup}
     */
    protected createCrudForm(): FormGroup
    {
        var formGroup: FormGroup = this.formBuilder.group(
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
        return formGroup;
    }

    /**
     * Loads the stock sectors
     */
    private loadStockSectorMap()
    {
        this.stockSectorService
            .getStockSectors()
            .subscribe( ( data ) =>
                        {
                            this.logger.debug( 'stock sector data: ' + JSON.stringify( data ) );
                            this.stockSectorMap.load( data );
                            this.stockSectors = this.stockSectorMap.getSectorSelectItems();
                            this.logger.debug( 'stockSectors: ' + JSON.stringify( this.stockSectors ) );
                            this.dataLoaded = true;
                        },
                        error =>
                        {
                            this.reportRestError( error );
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
                                         this.modelObject.lastPrice = stock.lastPrice;
                                         this.modelObject.tickerSymbol = tickerSymbol;
                                         this.modelObject.companyName = companyName;
                                         (<FormControl>this.crudForm.controls['tickerSymbol']).setValue( tickerSymbol );
                                         (<FormControl>this.crudForm.controls['companyName']).setValue( companyName );
                                     }
                                     ,
                                     error =>
                                     {
                                         this.reportRestError( error );
                                     });
        this.crudForm.controls['stockSearch'].reset( "" );
        this.logger.log( "onStockSearchSelected tickerSymbol: " + this.modelObject.tickerSymbol );
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
        return !this.crudForm.controls['tickerSymbol'].valid &&
               this.crudForm.controls['tickerSymbol'].dirty;
    }

    /**
     * Determines if the company name is invalid
     * @returns {boolean}
     */
    private isCompanyNameInvalid(): boolean
    {
        return !this.crudForm.controls['companyName'].valid &&
               this.crudForm.controls['companyName'].dirty;
    }

    protected primaryKeyFields(): Array<string>
    {
        return ['tickerSymbol'];
    }
}