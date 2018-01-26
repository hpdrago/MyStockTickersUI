import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { SessionService } from "../../service/session.service";
import { CrudFormWithNotesSourceComponent } from "../common/crud-form-with-notes-source.component";
import { CustomerCrudService } from "../../service/crud/customer-crud.service";
import { StockAutoCompleteComponent } from "../common/stock-autocomplete.component";
import { StockToBuyController } from './stock-to-buy-controller';
import { StockToBuyStateStore } from './stock-to-buy-state-store';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';

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
    @ViewChild( StockAutoCompleteComponent )
    private stockAutoCompleteComponent: StockAutoCompleteComponent;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {StockToBuyStateStore} stockToBuyStateStore
     * @param {StockToBuyController} stockToBuyController
     * @param {StockToBuyFactory} stockToBuyFactory
     * @param {CustomerCrudService} customerService
     */
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockToBuyStateStore: StockToBuyStateStore,
                 private stockToBuyController: StockToBuyController,
                 private stockToBuyFactory: StockToBuyFactory,
                 protected customerService: CustomerCrudService)
    {
        super( toaster,
               stockToBuyStateStore,
               stockToBuyController,
               stockToBuyFactory,
               customerService );
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
                'comments':           new FormControl( this.modelObject.comments, Validators.maxLength(4000 ) ),
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

    protected resetForm(): void
    {
        this.stockAutoCompleteComponent.reset();
        super.resetForm();
    }
}
