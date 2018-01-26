import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { ToastsManager } from "ng2-toastr";
import { Portfolio } from "../../model/entity/portfolio";
import { PortfolioStockStateStore } from './portfolio-stock-state-store';
import { PortfolioStockController } from './portfolio-stock-controller';
import { PortfolioStockFactory } from '../../model/factory/portfolio-stock.factory';
import { StockPriceQuoteService } from '../../service/crud/stock-price-quote.service';
import { PortfolioStockCrudService } from '../../service/crud/portfolio-stock-crud.service';
import { StockCompany } from '../../model/entity/stock-company';
import { SelectedStockCompanyList } from '../common/selected-stock-company.list';
import { StockCompanyService } from '../../service/crud/stock-company.service';
import { StockCompanyPriceQuoteService } from '../../service/stock-company-price-quote.service';

/**
 * Created by mike on 11/16/2016.
 */
@Component(
{
    selector:    'portfolio-stock-form',
    templateUrl: './portfolio-stock-form.component.html',
    styleUrls: ['../crud/form/crud-form.component.css',
                './portfolio-stock-form.component.css']
})
export class PortfolioStockFormComponent extends CrudFormComponent<PortfolioStock> implements OnInit
{
    @Input()
    protected portfolio: Portfolio;

    /**
     * Will only contain one company, but works with the selected companies component to display the selected stock.
     */
    protected selectedCompanyList: SelectedStockCompanyList;

    /**
     * Constructor.
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {FormBuilder} formBuilder
     * @param {PortfolioStockStateStore} portfolioStockStateStore
     * @param {PortfolioStockController} portfolioStockController
     * @param {PortfolioStockFactory} portfolioStockFactory
     * @param {PortfolioStockCrudService} portfolioStockCrudService
     * @param {StockPriceQuoteService} stockCrudService
     * @param {StockCompanyService} stockCompanyPriceQuoteService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected formBuilder: FormBuilder,
                 protected portfolioStockStateStore: PortfolioStockStateStore,
                 protected portfolioStockController: PortfolioStockController,
                 protected portfolioStockFactory: PortfolioStockFactory,
                 protected portfolioStockCrudService: PortfolioStockCrudService,
                 private stockCrudService: StockPriceQuoteService,
                 private stockCompanyPriceQuoteService: StockCompanyPriceQuoteService )
    {
        super( changeDetector,
               toaster,
               portfolioStockStateStore,
               portfolioStockController,
               portfolioStockFactory,
               portfolioStockCrudService );
        this.selectedCompanyList = new SelectedStockCompanyList( stockCompanyPriceQuoteService );
        this.continuousAdd = true;
    }

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    private onStockSelected( stockCompany: StockCompany )
    {
        this.debug( "onStockSelected: " + JSON.stringify( stockCompany ));
        this.selectedCompanyList
            .clear();
        this.selectedCompanyList
            .addCompany( stockCompany );
        this.modelObject.lastPrice = stockCompany.lastPrice;
        this.modelObject.tickerSymbol = stockCompany.tickerSymbol;
        this.modelObject.stockQuote.companyName = stockCompany.companyName;
        this.modelObject.stockQuote.latestPrice = stockCompany.lastPrice;
        this.modelObject.stockQuote.tickerSymbol = stockCompany.tickerSymbol;
        (<FormControl>this.formGroup.controls['tickerSymbol']).setValue( stockCompany.tickerSymbol );
        (<FormControl>this.formGroup.controls['companyName']).setValue( stockCompany.companyName );
        (<FormControl>this.formGroup.controls['lastPrice']).setValue( stockCompany.lastPrice );
    }

    private getTickerSymbolFormValue(): string
    {
        return (<FormControl>this.formGroup.controls['tickerSymbol']).value;
    }

    /**
     * Create the form.  This method is called by the super class
     * @return {FormGroup}
     */
    protected createFormGroup(): FormGroup
    {
        var formGroup: FormGroup = this.formBuilder.group(
        {
            'stockSearch':        '',
            'tickerSymbol':       new FormControl( '', Validators.required ),
            'companyName':        '',
            'numberOfShares':     '',
            'averageUnitCost':    '',
            'lastPrice':          '',
            'realizedGains':      '',
            'realizedLosses':     '',
            'stopLossPrice':      '',
            'stopLossShares':     '',
            'profitTakingPrice':  '',
            'profitTakingShares': ''
        } );
        return formGroup;
    }

    public onMenuSelect( sector, subSector ): void
    {
        alert( "onMenuSelect sector: " + sector + " subSector: " + subSector );
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

    /**
     * Determines if the company name is invalid
     * @returns {boolean}
     */
    public isCompanyNameInvalid(): boolean
    {
        return !this.formGroup.controls['companyName'].valid &&
               this.formGroup.controls['companyName'].dirty;
    }

    protected readOnlyFields(): Array<string>
    {
        return ['tickerSymbol'];
    }
}
