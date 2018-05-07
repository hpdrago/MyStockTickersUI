/**
 * Created by mike on 5/6/2018
 */
import { CrudFormComponent } from '../crud/form/crud-form.component';
import { ModelObject } from '../../model/entity/modelobject';
import { ViewChild } from '@angular/core';
import { StockAutoCompleteComponent } from './stock-autocomplete.component';
import { isNullOrUndefined } from 'util';
import { StockPriceQuote } from '../../model/entity/stock-price-quote';
import { StockPriceQuoteContainer } from '../../model/common/stock-price-quote-container';

/**
 * This is the base class for CRUD forms that contain StockAutoCompleteComponent that allows the user to search for/select
 * stock.
 */
export abstract class StockCrudFormComponent<T extends ModelObject<T> & StockPriceQuoteContainer>  extends CrudFormComponent<T>
{
    @ViewChild( StockAutoCompleteComponent )
    private stockAutoCompleteComponent: StockAutoCompleteComponent;
    private resettingForm: boolean = false;

    /**
     * Override to set the stock auto complete appropriately.
     */
    protected enableDisableInputs(): void
    {
        if ( !isNullOrUndefined( this.stockAutoCompleteComponent ))
        {
            if ( this.shouldDisable() && !this.resettingForm )
            {
                this.stockAutoCompleteComponent.setDisabledState( true );
            }
            else
            {
                this.stockAutoCompleteComponent.setDisabledState( false );
            }
        }
        super.enableDisableInputs();
    }

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stockPriceQuote
     */
    protected onStockSelected( stockPriceQuote: StockPriceQuote )
    {
        this.debug( "onStockSelected: " + JSON.stringify( stockPriceQuote ) );
        this.modelObject.setCompanyName( stockPriceQuote.companyName );
        this.modelObject.setLastPrice( stockPriceQuote.lastPrice );
        this.modelObject.setTickerSymbol( stockPriceQuote.tickerSymbol );
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