import { CrudFormComponent } from "../crud/form/crud-form.component";
import { StockNotes } from "../../model/entity/stock-notes";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotesFactory } from "../../model/factory/stock-notes.factory";
import { Stock } from "../../model/entity/stock";
import { StockNotesFormService } from "./stock-notes-form.service";
import { SelectItem } from "primeng/primeng";

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
    private bullOrBearOptions: SelectItem[];
    private stock: Stock;

    constructor( protected toaster: ToastsManager,
                 private formBuilder: FormBuilder,
                 protected stockNotesFactory: StockNotesFactory,
                 protected stockNotesFormService: StockNotesFormService )
    {
        super( toaster, stockNotesFactory, stockNotesFormService );
        this.bullOrBearOptions = [];
        this.bullOrBearOptions.push( {label: 'Bull', value: 1} );
        this.bullOrBearOptions.push( {label: 'Bear', value: 2} );
        this.bullOrBearOptions.push( {label: 'Neutral', value: 0} );
    }

    protected createCrudForm(): FormGroup
    {
        this.debug( "createCrudForm" );
        var stockNoteForm: FormGroup = this.formBuilder.group(
            {
                'tickerSymbol': new FormControl( this.modelObject.tickerSymbol, Validators.required ),
                'notes': new FormControl( this.modelObject.notes, Validators.required ),
                'noteDate': new FormControl( this.modelObject.notesDate, Validators.required  ),
                'noteRating': new FormControl( this.modelObject.noteRating ),
                'bullOrBear': new FormControl( this.modelObject.bullOrBear )
            } );
        return stockNoteForm;
    }


   /* protected setFormValue( fieldName: string, fieldValue: any ): any
    {
        if ( fieldName === 'bullOrBear')
        {

        }
        return super.setFormValue( fieldName, fieldValue );
    }*/

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    public onStockSelected( stock: Stock )
    {
        this.debug( "onStockSelected tickerSymbol: " + this.modelObject.tickerSymbol );
        this.debug( "onStockSelected: " + JSON.stringify( stock ) );
        this.stock = stock;
        //(<FormControl>this.formGroup.controls['tickerSymbol']).setValue( stock.tickerSymbol );
    }
}
