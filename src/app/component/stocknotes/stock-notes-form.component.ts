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
import { isNumeric } from "rxjs/util/isNumeric";
import { CrudOperation } from "../crud/common/crud-operation";
import { isNullOrUndefined } from "util";
import { StockNotesSentiment } from "../common/stock-notes-sentiment";
import { StockNotesActionTaken } from "../common/stock-notes-action-taken";

/**
 * This is the Stock Note Form Component class.
 *
 * Created by mike on 8/15/2017.
 */
@Component( {
                selector: 'stock-notes-form',
                styleUrls: ['../crud/form/crud-form.component.css',
                            './stock-notes-form.component.css'],
                templateUrl: './stock-notes-form.component.html'
            } )
export class StockNotesFormComponent extends CrudFormComponent<StockNotes>
{
    private sourceItems: SelectItem[] = [];
    private bullOrBearOptions: SelectItem[];
    private actionTakenOptions: SelectItem[];

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
    }

    /**
     * Component initialization method
     */
    public ngOnInit()
    {
        this.log( 'ngOnInit.begin' );
        super.ngOnInit();
        this.bullOrBearOptions = [];
        this.bullOrBearOptions.push( {label: 'BULL', value: StockNotesSentiment.BULL } );
        this.bullOrBearOptions.push( {label: 'BEAR', value: StockNotesSentiment.BEAR } );
        this.bullOrBearOptions.push( {label: 'NEUTRAL', value: StockNotesSentiment.NEUTRAL } );

        this.actionTakenOptions = [];
        this.actionTakenOptions.push( {label: 'NONE', value: StockNotesActionTaken.NONE });
        this.actionTakenOptions.push( {label: 'BUY', value: StockNotesActionTaken.BUY });
        this.actionTakenOptions.push( {label: 'SELL', value: StockNotesActionTaken.SELL });
        /*
         * Get the stock note sources for the logged in user and populate the sources SelectItems
         */
        this.loadSources();
        this.enableDisableFields();
        this.log( 'ngOnInit.end' );
    }

    /**
     * This method will get the user's note source values from the database
     */
    private loadSources()
    {
        this.log( 'loadSources' );
        this.stockNotesCrudServiceContainer.stockNoteSourceService
            .getStockNoteSources( this.sessionService.getLoggedInUserId() )
            .subscribe( ( stockNotesSources: StockNotesSourceList ) =>
                        {
                            this.sourceItems = stockNotesSources.toSelectItems()
                            this.log( 'loadSources ' + JSON.stringify( this.sourceItems ) );
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        } );
    }

    /**
     * Creates and identifies the fields for the FormGroup instance for the stock notes form.
     * @return {FormGroup}
     */
    protected createCrudForm(): FormGroup
    {
        this.log( "createCrudForm" );
        var stockNoteForm: FormGroup = this.formBuilder.group(
            {
                'stockSearch':        new FormControl( this.stockSearch ),
                'tickerSymbols':      new FormControl( this.tickerSymbols, Validators.required ),
                'notes':              new FormControl( this.modelObject.notes, Validators.required ),
                'notesDate':          new FormControl( this.modelObject.notesDate, Validators.required  ),
                'notesSource':        new FormControl( this.modelObject.notesSourceId ),
                'notesRating':        new FormControl( this.modelObject.notesRating ),
                'bullOrBear':         new FormControl( this.modelObject.bullOrBear ),
                'actionTaken':        new FormControl( this.modelObject.actionTaken ),
                'actionTakenShares':  new FormControl( this.modelObject.actionTakenShares ),
                'actionTakenPrice':   new FormControl( this.modelObject.actionTakenPrice )
            } );
        return stockNoteForm;
    }

    /**
     * Override this method to set the local editable form field {@code tickerSymbols}
     * @param {StockNotes} modelObject
     */
    protected setFormValues( modelObject: StockNotes )
    {
        this.log( "setFromValues modelObject: " + JSON.stringify( modelObject ));
        this.tickerSymbols = modelObject.getTickerSymbols();
        this.log( "setFormValues tickerSymbols: " + this.tickerSymbols );
        super.setFormValues( modelObject );
        this.setFormValue( 'tickerSymbols', this.tickerSymbols );
        if ( this.crudOperation == CrudOperation.CREATE )
        {
            if ( isNullOrUndefined( this.modelObject.actionTaken ))
            {
                this.modelObject.actionTaken = StockNotesActionTaken.NONE;
            }
            if ( isNullOrUndefined( this.modelObject.actionTakenShares ))
            {
                this.modelObject.actionTakenShares = 0;
            }
        }
    }

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    public onStockSelected( stock: Stock )
    {
        this.log( "onStockSelected: " + JSON.stringify( stock ) );
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
        this.modelObject.stockPriceWhenCreated = stock.lastPrice;
        (<FormControl>this.formGroup.controls['stockSearch']).setValue( '' );
    }

    /**
     * This method is called when the user is saving the form and before the REST call is made to save the model object.
     */
    protected prepareToSave()
    {
        this.log( "prepareToSave.begin " + JSON.stringify( this.modelObject ));
        this.log( "prepareToSave tickerSymbols " + this.tickerSymbols );
        /*
         * The ticker symbols should be separated by commas.
         * Each ticker symbol is pushed into the stocks array of the StockNotes model object
         */
        var stocks = this.tickerSymbols.split( "," );
        this.modelObject.stocks = [];
        for ( let stock of stocks )
        {
            var stockNoteStock: StockNotesStock = new StockNotesStock();
            stockNoteStock.tickerSymbol = stock.trim();
            this.modelObject.stocks.push( stockNoteStock );
        }

        /*
         * When a new source is added, what the user types in goes into the notesSourceId which is a numeric field, the
         * value also goes into the notesSourceName field by the sourcesOnChange event.  We need to make notesSourceId
         * to be numeric so that it can be sent to the backend without JSON parsing errors
         */
        this.log( "isNumeric: " + isNumeric( this.modelObject.notesSourceId ));
        if ( !isNumeric( this.modelObject.notesSourceId ) )
        {
            this.modelObject.notesSourceId = 0;
        }
        this.log( "prepareToSave.end " + JSON.stringify( this.modelObject ));
    }

    /**
     * This method is called whenever the notes source changes.  When the user types in a new source, each keystroke
     * will cause a call to this method.  Since we get the source id from the drop down list as the value, we need to
     * capture the name of any new source that the user types in so we assign that value here to the modelObject.
     *
     * @param event
     */
    private sourcesOnChange( event )
    {
        //this.log( "sourcesOnChange: " + JSON.stringify( event ));
        this.modelObject.notesSourceName = event.value;
    }

    /**
     * This method is called when the user changes the action taken drop down list box value.
     * @param event
     */
    private onActionTakenChange( event )
    {
        this.log( 'onActionTakenChange event: ' + JSON.stringify( event ))
        this.enableDisableFields()
    }

    private enableDisableFields()
    {
        this.log( 'enableDisableFields modelObject: ' + JSON.stringify( this.modelObject ))
        if ( !isNullOrUndefined( this.modelObject ))
        {
            if ( this.modelObject.actionTaken == StockNotesActionTaken.NONE )
            {
                this.disableField( 'actionTakenShares' );
            }
            else
            {
                this.enableField( 'actionTakenShares' );
            }
        }
    }
}
