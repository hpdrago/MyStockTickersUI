import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { StockCatalystEventCrudServiceContainer } from "./stock-catalyst-event-crud-service-container";
import { SessionService } from "../../service/crud/session.service";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";

/**
 * This is the Stock CatalystEvent Form Component class.
 *
 * Created by mike on 10/17/2017.
 */
@Component( {
                selector: 'stock-catalyst-event-form',
                styleUrls: ['../crud/form/crud-form.component.css'],
                templateUrl: './stock-catalyst-event-form.component.html'
            } )
export class StockCatalystEventFormComponent extends CrudFormComponent<StockCatalystEvent>
{
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockCatalystEventCrudServiceContainer: StockCatalystEventCrudServiceContainer )
    {
        super( toaster, stockCatalystEventCrudServiceContainer );
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
                'tickerSymbol':   new FormControl( this.modelObject.tickerSymbol, Validators.required ),
                'catalystDate':   new FormControl( this.modelObject.catalystDate, Validators.required ),
                'catalystDesc':   new FormControl( this.modelObject.catalystDesc, Validators.required )
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
