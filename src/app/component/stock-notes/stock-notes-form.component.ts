import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SelectItem } from "primeng/primeng";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesStock } from "../../model/entity/stock-notes-stock";
import { SessionService } from "../../service/session.service";
import { CrudOperation } from "../crud/common/crud-operation";
import { isNullOrUndefined } from "util";
import { StockNotesSentiment } from "../../common/stock-notes-sentiment.enum";
import { StockNotesActionTaken } from "../../common/stock-notes-action-taken.enum";
import { StockInformationService } from "../../service/crud/stock-information.service";
import { CustomerCrudService } from "../../service/crud/customer-crud.service";
import { StockAutoCompleteComponent } from "../common/stock-autocomplete.component";
import { StockPriceQuote } from "../../model/entity/stock-price-quote";
import { StockNotesStateStore } from './stock-notes-state-store';
import { StockNotesController } from './stock-notes-controller';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';
import { CrudFormComponent } from '../crud/form/crud-form.component';

/**
 * This is the StockCompany Note Form Component class.
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
    protected bullOrBearOptions: SelectItem[];
    protected actionTakenOptions: SelectItem[];

    /**
     * Reference to the stock search
     */
    @ViewChild(StockAutoCompleteComponent)
    protected stockAutoCompletedComponent: StockAutoCompleteComponent;

    protected stockPriceQuote: StockPriceQuote;
    protected stockPriceQuotes: StockPriceQuote[] = [];

    /**
     * Comma delimited list of ticker symbols
     */
    protected tickerSymbols: string = "";
    protected lastPrices: string = "";
    protected companies: string = "";

    /**
     * The string the user enters the ticker symbols or company name to search for
     */
    protected stockSearch: string = "";

    private formatter = new Intl.NumberFormat('en-US', {
                                              style: 'currency',
                                              currency: 'USD',
                                              minimumFractionDigits: 2,
                                                    // the default value for minimumFractionDigits depends on the currency
                                                    // and is usually already 2
                                                });

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {StockInformationService} stockService
     * @param {CustomerCrudService} customerService
     * @param {StockNotesStateStore} stockNotesCrudStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCrudService} stockNotesCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockService: StockInformationService,
                 private stockNotesCrudStateStore: StockNotesStateStore,
                 private stockNotesController: StockNotesController,
                 private stockNotesFactory: StockNotesFactory,
                 private stockNotesCrudService: StockNotesCrudService )
    {
        super( toaster,
               stockNotesCrudStateStore,
               stockNotesController,
               stockNotesFactory,
               stockNotesCrudService )
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
        this.modelObject.notesRating = 3;
        this.modelObject.bullOrBear = 1;
        this.modelObject.actionTaken = StockNotesActionTaken.NONE;
        this.modelObject.notesDate = new Date( Date.now() );
        this.tickerSymbols = '';
        this.lastPrices = '';
        this.companies = '';
        this.stockSearch = '';
        this.stockPriceQuote = null;
        this.stockPriceQuotes = [];
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
        stockNoteForm.addControl( 'tickerSymbol', new FormControl( this.modelObject.tickerSymbol ));
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

    protected invalidProperty( propertyName: string ): void
    {
        super.invalidProperty( propertyName );
        if ( propertyName === 'tickerSymbol' )
        {
            if ( this.stockPriceQuotes.length > 0 )
            {
                //this.modelObject.tickerSymbol = this.stocks[0].tickerSymbol;
                //this.log( "invalidProperty setting ticker symbol to " + this.modelObject.tickerSymbol );
            }
        }
    }

    /**
     * Override this method to set the local editable form field {@code tickerSymbols}
     * @param {StockNotes} modelObject
     */
    protected setFormValues( modelObject: StockNotes )
    {
        var methodName = "setFormValues";
        this.log( methodName + " modelObject: " + JSON.stringify( modelObject ));
        this.log( methodName + " crudOperation: " + CrudOperation.getName( this.crudOperation ) );
        if ( this.isCrudCreateOperation() )
        {
            this.tickerSymbols = modelObject.tickerSymbol;
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
                    .getStockPriceQuote( modelObject.tickerSymbol )
                    .subscribe( (stockPriceQuote) =>
                                {
                                    if ( stockPriceQuote == null )
                                    {
                                        this.log( methodName + " received null stockPriceQuote for tickerSymbol " +
                                            modelObject.tickerSymbol );
                                    }
                                    else
                                    {
                                        this.log( methodName + " found: " + stockPriceQuote.tickerSymbol );
                                        modelObject.stockPriceWhenCreated = stockPriceQuote.lastPrice;
                                        this.companies = stockPriceQuote.companyName;
                                        this.lastPrices = '' + stockPriceQuote.lastPrice;
                                    }

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
            this.tickerSymbols = modelObject.tickerSymbol;
            if ( !isNullOrUndefined( modelObject.tickerSymbol ))
            {
                this.stockService
                    .getStockPriceQuote( modelObject.tickerSymbol )
                    .subscribe( stockPriceQuote =>
                                {
                                    this.companies = stockPriceQuote.companyName;
                                    this.lastPrices = '' + stockPriceQuote.lastPrice;
                                } );
            }
        }
        super.setFormValues( modelObject );
    }

    /**
     * This method is called just before the form is displayed
     */
    protected prepareToDisplay(): void
    {
        let methodName = "prepareToDisplay";
        super.prepareToDisplay();
        /*
         * Need to simulate the entry of the stocks for this stock note
         */
        this.modelObject
            .stocks
            .forEach( (stockNoteStock: StockNotesStock) =>
                      {
                          this.debug( methodName + " getting stock quote: " + stockNoteStock.tickerSymbol );
                          this.stockService
                              .getStockPriceQuote( stockNoteStock.tickerSymbol )
                              .subscribe( (stockPriceQuote: StockPriceQuote) =>
                                          {
                                              this.debug( methodName + " getting stock quote: " + stockNoteStock.tickerSymbol );
                                              this.onStockSelected( stockPriceQuote )
                                          }
                              );
                      } );
    }

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    public onStockSelected( stockPriceQuote: StockPriceQuote )
    {
        this.log( "onStockSelected: " + JSON.stringify( stockPriceQuote ) );
        if ( isNullOrUndefined( this.tickerSymbols ))
        {
            this.tickerSymbols = '';
        }
        let index = this.tickerSymbols.indexOf( stockPriceQuote.tickerSymbol );
        if ( index == -1 )
        {
            this.stockPriceQuotes.push( stockPriceQuote );
            if ( this.tickerSymbols.length > 0 )
            {
                this.tickerSymbols += ', '
                this.lastPrices += ', '
                this.companies += ', '
            }
            this.tickerSymbols += stockPriceQuote.tickerSymbol;
            this.lastPrices += this.formatter.format( stockPriceQuote.lastPrice );
            this.companies += stockPriceQuote.companyName;
        }
        else
        {
            this.stockPriceQuotes[index] = stockPriceQuote;
        }
        this.modelObject.tickerSymbol = stockPriceQuote.tickerSymbol;
        this.stockPriceQuote = stockPriceQuote;
        this.stockSearch = '';
        this.modelObject.stockPriceWhenCreated = stockPriceQuote.lastPrice;
        (<FormControl>this.formGroup.controls['tickerSymbol']).setValue( stockPriceQuote.tickerSymbol );
        (<FormControl>this.formGroup.controls['stockSearch']).setValue( '' );
        this.setStockNoteStocks();
    }

    /**
     * Populates the stockNotStocks on the StockNotes instance.
     */
    protected setStockNoteStocks()
    {
        this.log( "setStockNotes.begin " + JSON.stringify( this.modelObject ));
        if ( this.isCrudCreateOperation() )
        {
            this.log( "setStockNotes tickerSymbols " + this.tickerSymbols );
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
        this.log( "setStockNotes.end " + JSON.stringify( this.modelObject ));
    }

    /**
     * This method is called when the user changes the action taken drop down list box value.
     * @param event
     */
    protected onActionTakenChange( event )
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
