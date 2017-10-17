import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { StockSummary } from "../../model/entity/stock-summary";
import { StockSummaryCrudServiceContainer } from "./stock-summary-crud-service-container";
import { SessionService } from "../../service/crud/session.service";

/**
 * This is the Stock Summary Form Component class.
 *
 * Created by mike on 10/17/2017.
 */
@Component( {
                selector: 'stock-summary-form',
                styleUrls: ['../crud/form/crud-form.component.css'],
                templateUrl: './stock-summary-form.component.html'
            } )
export class StockSummaryFormComponent extends CrudFormComponent<StockSummary>
{
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockSummaryCrudServiceContainer: StockSummaryCrudServiceContainer )
    {
        super( toaster, stockSummaryCrudServiceContainer );
    }

    public ngOnInit(): any
    {
        super.ngOnInit();
        this.modelObject.customerId = this.sessionService.getLoggedInUserId();
    }

    /**
     * Creates and identifies the fields for the FormGroup instance for the stock notes form.
     * @return {FormGroup}
     */
    protected createCrudForm(): FormGroup
    {
        this.debug( "createCrudForm" );
        var stockNoteForm: FormGroup = this.formBuilder.group(
            {
                'tickerSymbol': new FormControl( this.modelObject.tickerSymbol, Validators.required ),
                'comments': new FormControl( this.modelObject.comments ),
                'analystBuyCount': new FormControl( this.modelObject.analystBuyCount ),
                'analystSellCount': new FormControl( this.modelObject.analystSellCount ),
                'analystHoldCount': new FormControl( this.modelObject.analystHoldCount ),
                'nextCatalystDate': new FormControl( this.modelObject.nextCatalystDate ),
                'nextCatalystDesc': new FormControl( this.modelObject.nextCatalystDesc ),
                'avgAnalystPriceTarget': new FormControl( this.modelObject.avgAnalystPriceTarget ),
                'lowAnalystPriceTarget': new FormControl( this.modelObject.lowAnalystPriceTarget ),
                'highAnalystPriceTarget': new FormControl( this.modelObject.highAnalystPriceTarget ),
                'buySharesBelow': new FormControl( this.modelObject.comments ),
            } );
        return stockNoteForm;
    }

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    public onStockSelected( stock: Stock )
    {
        this.debug( "onStockSelected: " + JSON.stringify( stock ) );
        this.modelObject.companyName = stock.companyName;
        this.modelObject.lastPrice = stock.lastPrice;
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
