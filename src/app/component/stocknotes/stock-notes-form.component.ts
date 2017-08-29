import { CrudFormComponent } from "../crud/crud-form.component";
import { StockNotes } from "../../model/class/stock-notes";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";
import { Stock } from "../../model/class/stock";
import { StockNotesFormService } from "./stock-notes-form.service";

/**
 * This is the Stock Note Form Component class.
 *
 * Created by mike on 8/15/2017.
 */
@Component( {
                selector: 'stock-notes-form',
                templateUrl: './stock-notes-form.component.html'
            } )
export class StockNotesFormComponent extends CrudFormComponent<StockNotes>
{
    constructor( protected toaster: ToastsManager,
                 private formBuilder: FormBuilder,
                 protected stockNotesFactory: StockNotesFactory,
                 protected stockNotesFormService: StockNotesFormService )
    {
        super( toaster, stockNotesFactory, stockNotesFormService );
    }

    protected createCrudForm(): FormGroup
    {
        var stockNoteForm: FormGroup = this.formBuilder.group(
            {
                'tickerSymbol': new FormControl( this.modelObject.tickerSymbol, Validators.required ),
                'notes': new FormControl( this.modelObject.notes, Validators.required )
            } );
        return stockNoteForm;
    }

    protected primaryKeyFields(): Array<string>
    {
        return ['tickerSymbol'];
    }

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    public onStockSelected( stock: Stock )
    {
        this.logger.debug( "onStockSelected: " + JSON.stringify( stock ) );
        this.modelObject.tickerSymbol = stock.tickerSymbol;
        (<FormControl>this.formGroup.controls['tickerSymbol']).setValue( stock.tickerSymbol );
    }
}
