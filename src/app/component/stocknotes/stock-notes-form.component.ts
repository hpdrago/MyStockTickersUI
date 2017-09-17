import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { SelectItem } from "primeng/primeng";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";
import { StockNotesStock } from "../../model/entity/stock-notes-stock";
import { SessionService } from "../../service/crud/session.service";
import { StockNotesSourceList } from "./stock-notes-source-list";

/**
 * This is the Stock Note Form Component class.
 *
 * Created by mike on 8/15/2017.
 */
@Component( {
                selector: 'stock-notes-form',
                styleUrls: ['../crud/form/crud-form.component.css',
                            '../../../../node_modules/quill/dist/quill.core.css',
                            '../../../../node_modules/quill/dist/quill.snow.css'],
                templateUrl: './stock-notes-form.component.html'
            } )
export class StockNotesFormComponent extends CrudFormComponent<StockNotes>
{
    private sources: SelectItem[] = [];

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
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockNotesCrudServiceContainer: StockNotesCrudServiceContainer )
    {
        super( toaster, stockNotesCrudServiceContainer );
        this.bullOrBearOptions = [];
        this.bullOrBearOptions.push( {label: 'Bull', value: 1} );
        this.bullOrBearOptions.push( {label: 'Bear', value: 2} );
        this.bullOrBearOptions.push( {label: 'Neutral', value: 0} );
        /*
         * Get the stock note sources for the logged in user and populate the sources SelectItems
         */
        this.stockNotesCrudServiceContainer.stockNoteSourceService
                                           .getStockNoteSources( this.sessionService.getLoggedInUserId() )
                                           .subscribe((stockNotesSources: StockNotesSourceList) =>
                                                       {
                                                           this.sources = stockNotesSources.toSelectItems()
                                                       },
                                                       error =>
                                                       {
                                                           this.reportRestError( error );
                                                       });
    }

    /**
     * Creates and identifies the fields for the FormGroup instance for the stock notes form.
     * @return {FormGroup}
     */
    protected createCrudForm(): FormGroup
    {
        this.debug( "createCrudForm" );
        var stockNoteForm: FormGroup = this.formBuilder.group(
            {
                'stockSearch':   new FormControl( this.stockSearch ),
                'tickerSymbols': new FormControl( this.tickerSymbols, Validators.required ),
                'notes':         new FormControl( this.modelObject.notes, Validators.required ),
                'notesDate':     new FormControl( this.modelObject.notesDate, Validators.required  ),
                'notesSource':   new FormControl( this.modelObject.notesSourceId ),
                'notesRating':   new FormControl( this.modelObject.notesRating ),
                'bullOrBear':    new FormControl( this.modelObject.bullOrBear )
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

    /**
     * This method is called when the user is saving the form and before the REST call is made to save the model object.
     */
    protected prepareToSave()
    {
        this.debug( "prepareToSave.begin " + this.modelObject );
        /*
         * The ticker symbols should be separated by commas.
         * Each ticker symbol is pushed into the stocks array of the StockNotes model object
         */
        var stocks = this.tickerSymbols.split( "," );
        for ( let stock of stocks )
        {
            var stockNoteStock: StockNotesStock = new StockNotesStock();
            stockNoteStock.tickerSymbol = stock.trim();
            this.modelObject.stocks.push( stockNoteStock );
        }
        this.debug( "prepareToSave.end " + this.modelObject );
    }

    /**
     * This method is called whenever the notes source changes.  When the user types in a new source, each keystroke
     * will cause a call to this method.  Since we get the source id from the drop down list as the value, we need to
     * capture the name of any new source that the user types in so we assign that value here to the modelObject.
     *
     * @param event
     */
    protected sourcesOnChange( event )
    {
        this.debug( "sourcesOnChange: " + JSON.stringify( event ));
        this.modelObject.notesSourceName = event.value;
    }

}
