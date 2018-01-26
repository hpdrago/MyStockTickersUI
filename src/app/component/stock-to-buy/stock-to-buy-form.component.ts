import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { SessionService } from "../../service/session.service";
import { CustomerCrudService } from "../../service/crud/customer-crud.service";
import { StockToBuyController } from './stock-to-buy-controller';
import { StockToBuyStateStore } from './stock-to-buy-state-store';
import { StockToBuyFactory } from '../../model/factory/stock-to-buy.factory';
import { StockToBuyCrudService } from '../../service/crud/stock-to-buy-crud.service';
import { isNullOrUndefined } from 'util';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { StockCrudFormComponent } from '../common/stock-crud-form.component';
import { SelectedStockCompanyList } from '../common/selected-stock-company.list';
import { StockCompanyService } from '../../service/crud/stock-company.service';
import { StockCompany } from '../../model/entity/stock-company';

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
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {StockToBuyStateStore} stockToBuyStateStore
     * @param {StockToBuyController} stockToBuyController
     * @param {StockToBuyFactory} stockToBuyFactory
     * @param {StockToBuyCrudService} stockToBuyCrudService
     * @param {StockCompanyService} stockCompanyService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockToBuyStateStore: StockToBuyStateStore,
                 private stockToBuyController: StockToBuyController,
                 private stockToBuyFactory: StockToBuyFactory,
                 private stockToBuyCrudService: StockToBuyCrudService )
    {
        super( changeDetector,
               toaster,
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
    protected onStockSelected( stockCompany: StockCompany )
    {
        const methodName = 'onStockSelected';
        this.logMethodBegin( methodName + ' ' + JSON.stringify( stockCompany ));
        super.onStockSelected( stockCompany );
        this.modelObject
            .tickerSymbol = stockCompany.tickerSymbol;
        this.setFormValue( 'tickerSymbol', stockCompany.tickerSymbol );
        /*
         * There can only one stock to buy for a customer and ticker symbol combination.
         */
        let stockToBuy = this.stockToBuyFactory
                             .newModelObject();
        stockToBuy.tickerSymbol = stockCompany.tickerSymbol;
        this.crudRestService
            .getModelObject( stockToBuy )
            .subscribe( (existingStockToBuy: StockToBuy) =>
            {
                if ( !isNullOrUndefined( existingStockToBuy ))
                {
                    this.toaster.warning( 'A Stock To Buy entry already exists for ' +
                        existingStockToBuy.getTickerSymbol() );
                }
            });
        this.logMethodEnd( methodName );
    }
}
