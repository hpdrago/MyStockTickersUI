import { BaseComponent } from "./base.component";
import { Component, EventEmitter, Output, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockAutoCompleteComponent } from "./stock-autocomplete.component";
import { StockCompany } from '../../model/entity/stock-company';

/**
 * This component displays a label, text input box, and a reset button that enables the user to search for and selected
 * a stock and reset the contents of the input text.
 */
@Component( {
    selector: 'stock-search',
    styleUrls: ['../crud/form/crud-form.component.css'],
    template: `<div class="ui-grid ui-grid-responsive ui-grid-pad ui-fluid" 
                    style="float: left;margin: 10px 0px">
                   <div class="ui-grid-col-12" 
                        style="padding-left: 4px; 
                               text-align: left; 
                               padding-top: 2px;
                               float:left;
                               white-space: nowrap;">
                       <label class="crud-form" for="stockSearch">Stock Search:</label>
                       <stock-autocomplete (stockSelected)="onStockSelected( $event )">
                       </stock-autocomplete>
                       <button pButton 
                               type="button" 
                               class="ui-button-info" 
                               label="Reset" 
                               style="width: 100px"
                               (click)="onResetButtonClick()">
                       </button>
                   </div>
               </div>
    `
            } )
export class StockSearchComponent extends BaseComponent
{
    @Output()
    private stockSelected: EventEmitter<StockCompany>  = new EventEmitter<StockCompany>();
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
