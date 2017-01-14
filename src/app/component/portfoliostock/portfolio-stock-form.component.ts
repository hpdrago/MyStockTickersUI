import { Component, OnInit } from "@angular/core";
import { PortfolioStock } from "../../model/portfolio-stock";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { SelectItem } from "primeng/components/common/api";
import { Stock } from "../../model/stock";
import { CrudFormComponent } from "../common/crud-form.component";
import { StockSectorList } from "../../model/stock-sectors.list";
import { PortfolioStockFactory } from "../../model/portfolio-stock.factory";
import { StockCrudService } from "../../service/stock-crud.service";
import { StockSectorCrudService } from "../../service/stock-sector-crud.service";
import { ToastsManager } from "ng2-toastr";

/**
 * Created by mike on 11/16/2016.
 */
@Component(
{
    selector:    'portfolio-stock-form',
    templateUrl: './portfolio-stock-form.component.html',
    inputs:      ['portfolioStockFormService']
})
export class PortfolioStockFormComponent extends CrudFormComponent<PortfolioStock> implements OnInit
{
    private stockSectorMap: StockSectorList = new StockSectorList();
    private stockSubSectors: SelectItem[];
    private stockSectors: SelectItem[];
    private dataLoaded: boolean = false;
    private selectedStock: Stock;

    constructor( protected toaster: ToastsManager,
                 protected formBuilder: FormBuilder,
                 protected stockCrudService: StockCrudService,
                 protected stockSectorService: StockSectorCrudService,
                 protected portfolioStockFactory: PortfolioStockFactory )
    {
        super( toaster, portfolioStockFactory );
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
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    private onStockSelected( stock )
    {
        this.logger.debug( "onStockSelected: " + JSON.stringify( stock ));
        this.selectedStock = stock;
        this.modelObject.lastPrice = stock.lastPrice;
        this.modelObject.tickerSymbol = stock.tickerSymbol;
        this.modelObject.companyName = stock.companyName;
        (<FormControl>this.formGroup.controls['tickerSymbol']).setValue( stock.tickerSymbol );
        (<FormControl>this.formGroup.controls['companyName']).setValue( stock.companyName );
        (<FormControl>this.formGroup.controls['lastPrice']).setValue( stock.lastPrice );
    }

    /**
     * This method is called when the ticker symbol input loses focus
     */
    private onTickerSymbolLostFocus(): void
    {
        var methodName = "onTickerSymbolLostFocus";
        this.logger.debug( methodName + " selectedStock: " + JSON.stringify( this.selectedStock ) );
        /*
         * It's possible that the ticker symbol does not exist in the database so load it after the user has
         * pressed the tab key
         */
        if ( !this.selectedStock || this.selectedStock.tickerSymbol != this.getTickerSymbolFormValue() )
        {
            this.stockCrudService.getStock( this.getTickerSymbolFormValue() )
                .subscribe( (stock) =>
                            {
                                this.logger.log( methodName + " found: " + stock.tickerSymbol );
                                this.onStockSelected( stock );
                            },
                            error =>
                            {
                                this.resetForm();
                                this.reportRestError( error );
                            });
        }
    }

    private getTickerSymbolFormValue(): string
    {
        return (<FormControl>this.formGroup.controls['tickerSymbol']).value;
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
        return !this.formGroup.controls['tickerSymbol'].valid &&
               this.formGroup.controls['tickerSymbol'].dirty;
    }

    /**
     * Determines if the company name is invalid
     * @returns {boolean}
     */
    private isCompanyNameInvalid(): boolean
    {
        return !this.formGroup.controls['companyName'].valid &&
               this.formGroup.controls['companyName'].dirty;
    }

    protected primaryKeyFields(): Array<string>
    {
        return ['tickerSymbol'];
    }
}