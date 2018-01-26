import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockCompany } from "../../model/entity/stock-company";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { SessionService } from "../../service/session.service";
import { CustomerCrudService } from "../../service/crud/customer-crud.service";
import { StockAutoCompleteComponent } from "../common/stock-autocomplete.component";
import { StockToBuyController } from './stock-to-buy-controller';
import { StockToBuyStateStore } from './stock-to-buy-state-store';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';
import { CrudFormComponent } from '../crud/form/crud-form.component';
import { isNullOrUndefined } from 'util';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { StockCrudFormComponent } from '../common/stock-crud-form.component';

/**
 * This is the StockCompany ToBuy Form Component class.
 *
 * Created by mike on 10/17/2017.
 */
@Component( {
                selector: 'stock-to-buy-form',
                styleUrls: ['../crud/form/crud-form.component.css'],
                templateUrl: './stock-to-buy-form.component.html'
            } )
export class StockToBuyFormComponent extends StockCrudFormComponent<StockToBuy>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {StockToBuyStateStore} stockToBuyStateStore
     * @param {StockToBuyController} stockToBuyController
     * @param {StockToBuyFactory} stockToBuyFactory
     * @param {StockToBuyCrudService} stockToBuyCrudService
     * @param {CustomerCrudService} customerService
     */
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockToBuyStateStore: StockToBuyStateStore,
                 private stockToBuyController: StockToBuyController,
                 private stockToBuyFactory: StockToBuyFactory,
                 private stockToBuyCrudService: StockToBuyCrudService )
    {
        super( toaster,
               stockToBuyStateStore,
               stockToBuyController,
               stockToBuyFactory,
               stockToBuyCrudService );
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
                'notesSourceId':      new FormControl( this.modelObject.notesSourceId ),
                'buySharesUpToPrice': new FormControl( this.modelObject.buySharesUpToPrice ),
                'buyAfterDate':       new FormControl( this.modelObject.buyAfterDate ),
                'tags':               new FormControl( this.modelObject.tags )
            } );
        return stockNoteForm;
    }

    /**
     * Override to check to see that the user hasn't selected a stock to buy that already exists.
     * @param {StockPriceQuote} stockPriceQuote
     */
    protected onStockSelected( stockPriceQuote: StockPriceQuote )
    {
        super.onStockSelected( stockPriceQuote );
        this.crudRestService
            .getModelObject( this.modelObject )
            .subscribe( (existingStockToBuy: StockToBuy) =>
            {
                if ( !isNullOrUndefined( existingStockToBuy ))
                {
                    this.toaster.warning( 'A Stock To Buy entry already exists for ' +
                        existingStockToBuy.getTickerSymbol() );
                }
            });
    }
}
