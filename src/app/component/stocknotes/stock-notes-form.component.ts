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
import { StockCrudService } from "../../service/crud/stock-crud.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

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
    private stockNotesSources: StockNotesSourceList;

    /**
     * The stock is returned via an event when the user searches for a ticker symbol or company
     */
    private stock: Stock;
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
                 private stockNotesCrudServiceContainer: StockNotesCrudServiceContainer )
    {
        super( toaster, stockNotesCrudServiceContainer );
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
        this.actionTakenOptions.push( {label: 'BUY', value: StockNotesActionTaken.BUY });
        this.actionTakenOptions.push( {label: 'SELL', value: StockNotesActionTaken.SELL });
        super.ngOnInit();
        this.enableDisableFields();
        this.log( 'ngOnInit.override.end' );
    }

    /**
     * This method is called by the super class at the beginning of ngOnInit
     * @returns {any}
     */
    protected loadResources(): any
    {
        /*
         * Get the stock note sources for the logged in user and populate the sources SelectItems
         */
        this.loadSources();
    }

    /**
     * This method will get the user's note source values from the database
     */
    private loadSources()
    {
        this.log( 'loadSources.begin' );
        this.stockNotesCrudServiceContainer.stockNoteSourceService
            .getStockNoteSources( this.sessionService.getLoggedInUserId() )
            .subscribe( ( stockNotesSources: StockNotesSourceList ) =>
                        {
                            this.stockNotesSources = stockNotesSources;
                            this.sourceItems = stockNotesSources.toSelectItems()
                            this.loadResourcesCompleted();
                        },
                        error =>
                        {
                            this.reportRestError( error );
                        } );
    }

    /**
     * This method is called when {@code loadSources} has completed.
     */
    protected loadResourcesCompleted(): void
    {
        this.log( "loadResourcesCompleted.override" );
        this.formGroup.addControl( 'notesSource', new FormControl( this.getSourceName( this.modelObject ) ) );
        super.loadResourcesCompleted();
    }

    /**
     * This method is called after {@code loadResources() and ngOnInit() have completed}.  At that time, the form
     * has been built and the source names have been loaded so it's safe to set the source name field.
     */
    protected postInit(): void
    {
        this.log( "postInit.override" );
        this.setFormValue( 'notesSource', this.getSourceName( this.modelObject ) );
    }

    /**
     * Creates and identifies the fields for the FormGroup instance for the stock notes form.
     * @return {FormGroup}
     */
    protected createFormGroup(): FormGroup
    {
        this.log( "initializeForm " + CrudOperation.getName( this.crudOperation ) );
        var stockNoteForm: FormGroup;
        if ( this.isCrudCreateOperation() )
        {
            stockNoteForm = this.formBuilder.group(
                {
                    'stockSearch': new FormControl( this.stockSearch ),
                    'tickerSymbols': new FormControl( this.tickerSymbols, Validators.required ),
                    'notes': new FormControl( this.modelObject.notes, Validators.required ),
                    'notesSource': new FormControl( "" ),
                    'notesDate': new FormControl( this.modelObject.notesDate, Validators.required ),
                    'notesRating': new FormControl( this.modelObject.notesRating ),
                    'tags': new FormControl( this.modelObject.tags ),
                    'bullOrBear': new FormControl( this.modelObject.bullOrBear ),
                    'actionTaken': new FormControl( this.modelObject.actionTaken ),
                    'actionTakenShares': new FormControl( this.modelObject.actionTakenShares ),
                    'actionTakenPrice': new FormControl( this.modelObject.actionTakenPrice )
                } );
        }
        else
        {
            stockNoteForm = this.formBuilder.group(
                {
                    'tickerSymbol': new FormControl( this.modelObject.tickerSymbol, Validators.required ),
                    'notes': new FormControl( this.modelObject.notes, Validators.required ),
                    'notesSource': new FormControl( "" ),
                    'notesDate': new FormControl( this.modelObject.notesDate, Validators.required ),
                    'notesRating': new FormControl( this.modelObject.notesRating ),
                    'tags': new FormControl( this.modelObject.tags ),
                    'bullOrBear': new FormControl( this.modelObject.bullOrBear ),
                    'actionTaken': new FormControl( this.modelObject.actionTaken ),
                    'actionTakenShares': new FormControl( this.modelObject.actionTakenShares ),
                    'actionTakenPrice': new FormControl( this.modelObject.actionTakenPrice )
                } );
        }
        return stockNoteForm;
    }

    private getSourceName( stockNotes: StockNotes ): string
    {
        if ( isNullOrUndefined( stockNotes ) )
        {
            return "";
        }
        return this.stockNotesSources.getLabel( stockNotes.notesSourceId );
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
            this.tickerSymbols = modelObject.getTickerSymbols();
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
        super.setFormValues( modelObject );
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
        this.log( "sourcesOnChange: " + JSON.stringify( event ));
        /*
         * Capture the new values that the user types and put in the source name
         */
        this.modelObject.notesSourceName = event.value.toUpperCase();
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
