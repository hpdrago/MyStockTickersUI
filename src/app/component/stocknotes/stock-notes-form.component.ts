import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { SelectItem } from "primeng/primeng";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";

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
    /**
     * The stock is returned via an event when the user searches for a ticker symbol or company
     */
    private stock: Stock;
    /**
     * Comma delimited list of ticker symbols
     */
    private tickerSymbols: string;
    /**
     * The string the user enters the ticker symbols or company name to search for
     */
    private stockSearch: string;

    constructor( protected toaster: ToastsManager,
                 private formBuilder: FormBuilder,
                 private stockNotesCrudServiceContainer: StockNotesCrudServiceContainer )
    {
        super( toaster, stockNotesCrudServiceContainer );
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
                'stockSearch': new FormControl( this.stockSearch ),
                'tickerSymbols': new FormControl( this.tickerSymbols, Validators.required ),
                'notes': new FormControl( this.modelObject.notes, Validators.required ),
                'noteDate': new FormControl( this.modelObject.notesDate, Validators.required  ),
                'noteRating': new FormControl( this.modelObject.notesRating ),
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
        this.debug( "onStockSelected: " + JSON.stringify( stock ) );
        if ( !this.tickerSymbols )
        {
            this.tickerSymbols = '';
        }
        if ( this.tickerSymbols.length > 0 )
        {
            this.tickerSymbols += ', '
        }
        this.tickerSymbols += stock.tickerSymbol;
        this.stock = stock;
        this.stockSearch = '';
        //this.modelObject.setStocks( this.stockSearch );
        (<FormControl>this.formGroup.controls['stockSearch']).setValue( '' );
    }
}
