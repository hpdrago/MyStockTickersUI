import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Component, ElementRef, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { SelectItem } from "primeng/primeng";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";
import { StockNotesStock } from "../../model/entity/stock-notes-stock";
import { SessionService } from "../../service/session.service";
import { StockNotesSourceList } from "./stock-notes-source-list";
import { isNumeric } from "rxjs/util/isNumeric";
import { CrudOperation } from "../crud/common/crud-operation";
import { isNullOrUndefined } from "util";
import { StockNotesSentiment } from "../../common/stock-notes-sentiment.enum";
import { StockNotesActionTaken } from "../../common/stock-notes-action-taken.enum";
import { StockCrudService } from "../../service/crud/stock-crud.service";
import { CustomerCrudService } from "../../service/crud/customer-crud.service";
import { StockAutoCompleteComponent } from "../common/stock-autocomplete.component";
import { CrudFormWithNotesSourceComponent } from "../common/crud-form-with-notes-source.component";

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
export class StockNotesFormComponent extends CrudFormWithNotesSourceComponent<StockNotes>
{
    private bullOrBearOptions: SelectItem[];
    private actionTakenOptions: SelectItem[];

    /**
     * Reference to the stock search
     */
    @ViewChild(StockAutoCompleteComponent)
    private stockAutoCompletedComponent: StockAutoCompleteComponent;
    @ViewChild(StockAutoCompleteComponent)
    private stockAutoCompletedElementRef: ElementRef;

    private stock: Stock;
    private stocks: Stock[];

    /**
     * Comma delimited list of ticker symbols
     */
    private tickerSymbols: string = "";

    /**
     * The string the user enters the ticker symbols or company name to search for
     */
    private stockSearch: string = "";

    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockService: StockCrudService,
                 protected customerService: CustomerCrudService,
                 private stockNotesCrudServiceContainer: StockNotesCrudServiceContainer )
    {
        super( toaster, stockNotesCrudServiceContainer, customerService );
    }

    /**
     * Component initialization method
     */
    public ngOnInit()
    {
        this.log( 'ngOnInit.override.begin' );
        this.bullOrBearOptions = [];
        this.bullOrBearOptions.push( {label: 'BULL', value: StockNotesSentiment.BULL } );
        this.bullOrBearOptions.push( {label: 'BEAR', value: StockNotesSentiment.BEAR } );
        this.bullOrBearOptions.push( {label: 'NEUTRAL', value: StockNotesSentiment.NEUTRAL } );

        this.actionTakenOptions = [];
        this.actionTakenOptions.push( {label: 'NONE', value: StockNotesActionTaken.NONE });
        this.actionTakenOptions.push( {label: 'BUY LATER', value: StockNotesActionTaken.BUY_LATER });
        this.actionTakenOptions.push( {label: 'BUY', value: StockNotesActionTaken.BUY });
        this.actionTakenOptions.push( {label: 'SELL', value: StockNotesActionTaken.SELL });
        super.ngOnInit();
        this.log( 'ngOnInit.override.end' );
    }


    /**
     * Set the initial values for new notes and when the form resets.
     * @return {any}
     */
    protected setDefaultValues()
    {
        super.setDefaultValues();
        if ( this.modelObject )
        {
            this.modelObject.notesRating = 3;
            this.modelObject.bullOrBear = 1;
            this.modelObject.actionTaken = StockNotesActionTaken.NONE;
            this.modelObject.notesDate = new Date( Date.now() );
            this.tickerSymbols = '';
            this.stockSearch = '';
            this.stock = null;
            this.stocks = [];
        }
    }

    protected resetForm(): void
    {
        super.resetForm();
        if ( this.stockAutoCompletedComponent )
        {
            this.stockAutoCompletedComponent.reset();
        }
    }

    /**
     * This method is called after {@code loadResources() and ngOnInit() have completed}.  At that time, the form
     * has been built and the source names have been loaded so it's safe to set the source name field.
     */
    protected postInit(): void
    {
        super.postInit();
        this.log( "postInit" );
        this.enableDisableActionTakenFields();
    }

    /**
     * Creates and identifies the fields for the FormGroup instance for the stock notes form.
     * @return {FormGroup}
     */
    protected createFormGroup(): FormGroup
    {
        this.log( "createFormGroup " + CrudOperation.getName( this.crudOperation ) );
        var stockNoteForm: FormGroup;
        /*
         * Create the form group and the common form fields
         */
        stockNoteForm = this.formBuilder.group(
        {
            'notes':             new FormControl( this.modelObject.notes, Validators.compose( [Validators.maxLength( 4000 ),
                                                                                               Validators.required] )),
            'notesSourceId':     new FormControl( this.modelObject.notesSourceId ),
            'notesDate':         new FormControl( this.modelObject.notesDate, Validators.required ),
            'notesRating':       new FormControl( this.modelObject.notesRating ),
            'tags':              new FormControl( this.modelObject.tags ),
            'bullOrBear':        new FormControl( this.modelObject.bullOrBear ),
            'actionTaken':       new FormControl( this.modelObject.actionTaken ),
            'actionTakenShares': new FormControl( this.modelObject.actionTakenShares ),
            'actionTakenPrice':  new FormControl( this.modelObject.actionTakenPrice )
        } );
        stockNoteForm.addControl( 'stockSearch', new FormControl( this.stockSearch ));
        stockNoteForm.addControl( 'tickerSymbols', new FormControl( this.tickerSymbols ));
        stockNoteForm.addControl( 'tickerSymbol', new FormControl( this.modelObject.tickerSymbol, Validators.required ));
        /*
         * Add the specific fields based on the crud operation
         */
        if ( this.isCrudCreateOperation() )
        {
            stockNoteForm.controls['stockSearch'].enable();
            stockNoteForm.controls['tickerSymbols'].enable();
            stockNoteForm.controls['tickerSymbol'].disable();
        }
        else
        {
            stockNoteForm.controls['stockSearch'].disable();
            stockNoteForm.controls['tickerSymbols'].disable();
            stockNoteForm.controls['tickerSymbol'].enable();
        }
        return stockNoteForm;
    }

    /**
     * Override this method to set the local editable form field {@code tickerSymbols}
     * @param {StockNotes} modelObject
     */
    protected setFormValues( modelObject: StockNotes )
    {
        var methodName = "setFormValues";
        this.log( methodName + " modelObject: " + JSON.stringify( modelObject ));
        if ( this.isCrudCreateOperation() )
        {
            this.log( methodName + " tickerSymbols: " + JSON.stringify( this.tickerSymbols ));
            this.setFormValue( 'tickerSymbols', isNullOrUndefined( this.tickerSymbols ) ? "" : this.tickerSymbols );
            if ( isNullOrUndefined( modelObject.actionTaken ))
            {
                modelObject.actionTaken = StockNotesActionTaken.NONE;
            }
            if ( isNullOrUndefined( modelObject.actionTakenShares ))
            {
                modelObject.actionTakenShares = 0;
            }
            if ( !isNullOrUndefined( modelObject.tickerSymbol ))
            {
                this.stockService
                    .getStock( modelObject.tickerSymbol )
                    .subscribe( (stock) =>
                                {
                                    this.log( methodName + " found: " + stock.tickerSymbol );
                                    modelObject.stockPriceWhenCreated = stock.lastPrice;
                                },
                                error =>
                                {
                                    this.resetForm();
                                    this.reportRestError( error );
                                });
            }
        }
        else
        {
            this.tickerSymbols = modelObject.getTickerSymbols();
        }
        super.setFormValues( modelObject );
    }

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    public onStockSelected( stock: Stock )
    {
        this.log( "onStockSelected: " + JSON.stringify( stock ) );
        if ( this.tickerSymbols.indexOf( stock.tickerSymbol ) == -1 )
        {
            if ( !this.tickerSymbols )
            {
                this.tickerSymbols = '';
                this.stocks = [];
            }
            if ( this.tickerSymbols.length > 0 )
            {
                this.tickerSymbols += ', '
            }
            this.tickerSymbols += stock.tickerSymbol;
            this.modelObject.tickerSymbol = stock.tickerSymbol;
            this.stock = stock;
            this.stockSearch = '';
            this.modelObject.stockPriceWhenCreated = stock.lastPrice;
            (<FormControl>this.formGroup.controls['tickerSymbols']).setValue( this.tickerSymbols );
            (<FormControl>this.formGroup.controls['stockSearch']).setValue( '' );
            this.stocks.push( stock );
        }
    }

    /**
     * This method is called just before the form is displayed
     */
    protected onPrepareToDisplay(): void
    {
        super.onPrepareToDisplay();
    }

    /**
     * This method is called when the user is saving the form and before the REST call is made to save the model object.
     */
    protected prepareToSave()
    {
        this.log( "prepareToSave.begin " + JSON.stringify( this.modelObject ));
        if ( this.isCrudCreateOperation() )
        {
            this.log( "prepareToSave tickerSymbols " + this.tickerSymbols );
            /*
             * The ticker symbols should be separated by commas.
             * Each ticker symbol is pushed into the stocks array of the StockNotes model object
             */
            var stocks = this.tickerSymbols.split( "," );
            this.modelObject.stocks = [];
            stocks.forEach( stock =>
            {
                var stockNoteStock: StockNotesStock = new StockNotesStock();
                stockNoteStock.tickerSymbol = stock.trim();
                this.modelObject.stocks.push( stockNoteStock );
            });
        }
        super.prepareToSave();
        this.log( "prepareToSave.end " + JSON.stringify( this.modelObject ));
    }

    /**
     * This method is called when the user changes the action taken drop down list box value.
     * @param event
     */
    private onActionTakenChange( event )
    {
        this.log( 'onActionTakenChange event: ' + JSON.stringify( event ))
        if ( !isNullOrUndefined( this.modelObject ))
        {
            this.modelObject.actionTaken = event.value;
        }
        this.enableDisableActionTakenFields()
    }

    /**
     * Enables or disables the action taken fields based on the action taken choice
     */
    private enableDisableActionTakenFields()
    {
        if ( !isNullOrUndefined( this.modelObject ))
        {
            this.log( 'enableDisableFields modelObject.actionTaken: ' + this.modelObject.actionTaken )
            this.log( 'enableDisableFields modelObject.actionTaken: ' + StockNotesActionTaken.getName( this.modelObject.actionTaken ));
            if ( this.isActionTakenFieldsDisabled() )
            {
                this.disableField( 'actionTakenShares' );
                this.disableField( 'actionTakenPrice' );
            }
            else
            {
                this.enableField( 'actionTakenShares' );
                this.enableField( 'actionTakenPrice' );
            }
        }
    }

    /**
     * Determines if the action taken shares and prices fields should be disabled.
     * @return {boolean}
     */
    private isActionTakenFieldsDisabled(): boolean
    {
        if ( isNullOrUndefined( this.modelObject ))
        {
            return false;
        }
        else
        {
            return this.modelObject.actionTaken == StockNotesActionTaken.NONE ||
                   this.modelObject.actionTaken == StockNotesActionTaken.BUY_LATER;
        }
    }
}
