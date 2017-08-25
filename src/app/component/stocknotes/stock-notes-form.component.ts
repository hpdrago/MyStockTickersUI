import { CrudFormComponent } from "../common/crud-form.component";
import { StockNote } from "../../model/class/stock-note";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNoteFactory } from "../../model/factory/stock-note.factory";
import { Stock } from "../../model/class/stock";

/**
 * This is the Stock Note Form Component class.
 *
 * Created by mike on 8/15/2017.
 */
@Component( {
                selector: 'stock-notes-form',
                templateUrl: './stock-notes-form.component.html',
                inputs: ['crudFormService']
            } )
export class StockNotesFormComponent extends CrudFormComponent<StockNote>
{
    constructor( protected toaster: ToastsManager,
                 private formBuilder: FormBuilder,
                 protected stockNotesFactory: StockNoteFactory )
    {
        super( toaster, stockNotesFactory );
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
