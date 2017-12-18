import { BaseComponent } from "./base.component";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { Stock } from "../../model/entity/stock";
import { ToastsManager } from "ng2-toastr";
import { StockAutoCompleteComponent } from "./stock-autocomplete.component";

/**
 * This component displays a label, text input box, and a reset button that enables the user to search for and selected
 * a stock and reset the contents of the input text.
 */
@Component( {
                selector: 'stock-search',
                styleUrls: ['../crud/form/crud-form.component.css'],
                template: `
                        <div class="ui-grid-col-3" style="padding-right: 4px; text-align: right; padding-top: 2px">
                            <label class="crud-form" for="stockSearch">Stock Search:</label>
                        </div>
                        <div class="ui-grid-col-7" style="padding-right: 4px">
                            <stock-autocomplete (stockSelected)="onStockSelected( $event )">
                            </stock-autocomplete>
                        </div>
                        <div class="ui-grid-col-2">
                            <button pButton type="button" class="ui-button-info" label="Reset" (click)="onResetButtonClick()"></button>
                        </div>
                `
            } )
export class StockSearchComponent extends BaseComponent
{
    @Output()
    private stockSelected: EventEmitter<Stock>  = new EventEmitter<Stock>();
    @Output()
    private resetButtonClick: EventEmitter<void>  = new EventEmitter<void>();

    @ViewChild(StockAutoCompleteComponent)
    private stockAutoCompleteComponent: StockAutoCompleteComponent;

    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    /**
     * This method is called by the stock autocomplete component when a stock has been selects.
     * @param event
     */
    private onStockSelected( event )
    {
        this.stockSelected.emit( event );
    }

    /**
     * This method is called when the reset button is clicked.
     */
    private onResetButtonClick()
    {
        this.resetButtonClick.emit();
        this.stockAutoCompleteComponent.reset();
    }
}
