import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { StockToBuyCrudServiceContainer } from "./stock-to-buy-crud-service-container";
import { SessionService } from "../../service/session.service";
import { CrudFormWithNotesSourceComponent } from "../common/crud-form-with-notes-source.component";
import { CustomerCrudService } from "../../service/crud/customer-crud.service";

/**
 * This is the Stock ToBuy Form Component class.
 *
 * Created by mike on 10/17/2017.
 */
@Component( {
                selector: 'stock-to-buy-form',
                styleUrls: ['../crud/form/crud-form.component.css'],
                templateUrl: './stock-to-buy-form.component.html'
            } )
export class StockToBuyFormComponent extends CrudFormWithNotesSourceComponent<StockToBuy>
{
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockToBuyCrudServiceContainer: StockToBuyCrudServiceContainer,
                 protected customerService: CustomerCrudService)
    {
        super( toaster, stockToBuyCrudServiceContainer, customerService );
    }

    /**
     * Creates and identifies the fields for the FormGroup instance for the stock notes form.
     * @return {FormGroup}
     */
    protected createFormGroup(): FormGroup
    {
        this.debug( "initializeForm " );
        var stockNoteForm: FormGroup = this.formBuilder.group(
            {
                'tickerSymbol':       new FormControl( this.modelObject.tickerSymbol, Validators.required ),
                'comments':           new FormControl( this.modelObject.comments, Validators.compose( [Validators.required,
                                                                                                                Validators.maxLength(4000 )])),
                'notesSource':        new FormControl( this.modelObject.notesSourceId ),
                'buySharesUpToPrice': new FormControl( this.modelObject.buySharesUpToPrice ),
                'buyAfterDate':       new FormControl( this.modelObject.buyAfterDate ),
                'tags':               new FormControl( this.modelObject.tags )
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
        this.modelObject.tickerSymbol = stock.tickerSymbol;
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
