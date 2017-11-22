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
import { StockNotesSentiment } from "../../common/stock-notes-sentiment.enum";
import { StockNotesActionTaken } from "../../common/stock-notes-action-taken.enum";
import { StockCrudService } from "../../service/crud/stock-crud.service";
import { CustomerService } from "../../service/crud/customer.service";

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
    private stockNotesSourceList: StockNotesSourceList = new StockNotesSourceList( [] );
    private sourcesChanged: boolean;

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
                 private customerService: CustomerService,
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
        }
    }

    /**
     * Load the necessary resources
     */
    protected loadResources(): void
    {
        this.log( "loadResources" );
        this.customerService.subscribeToSourcesLoading( (loading)=>
        {
            this.log( "loadResources customerService is loading: " + loading );
            if ( !loading )
            {
                this.stockNotesSourceList = this.customerService.getStockNotesSourceList();
                this.sourceItems = this.stockNotesSourceList.toSelectItems();
                this.log( "loadResources source items set " + JSON.stringify( this.stockNotesSourceList ) );
                this.onLoadResourcesCompleted();
            }
        });
    }

    /**
     * This method is called after {@code loadResources() and ngOnInit() have completed}.  At that time, the form
     * has been built and the source names have been loaded so it's safe to set the source name field.
     */
    protected postInit(): void
    {
        this.log( "postInit.override.begin setting notesSourceId to " + this.modelObject.notesSourceId );
        this.setFormValue( 'notesSource', this.modelObject.notesSourceId );
        this.enableDisableActionTakenFields();
        this.log( "postInit.override.end" );
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
            'notes':             new FormControl( this.modelObject.notes, Validators.required ),
            'notesSource':       new FormControl( "" ),
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
     * This method is called just before the form is displayed.  This is a good place to perform initialization.
     */
    protected onPrepareToDisplay(): void
    {
        super.onPrepareToDisplay();
        this.sourcesChanged = false;
        this.tickerSymbols = '';
        this.stockSearch = '';
    }

    private getSourceName( stockNotes: StockNotes ): string
    {
        if ( isNullOrUndefined( stockNotes ) )
        {
            return "";
        }
        this.log( "getSourceName: " + JSON.stringify( stockNotes ));
        return this.stockNotesSourceList.getLabel( stockNotes.notesSourceId );
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
        (<FormControl>this.formGroup.controls['tickerSymbols']).setValue( this.tickerSymbols );
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
        if ( !isNumeric( event.value ))
        {
            this.modelObject.notesSourceName = event.value.toUpperCase();
            this.sourcesChanged = true;
        }
        else
        {
            this.log( "sourcesOnChange: setting notesSourceId= " + event.value );
            this.modelObject.notesSourceId = event.value;
        }
    }

    /**
     * This method is called when the user changes the action taken drop down list box value.
     * @param event
     */
    private onActionTakenChange( event )
    {
        this.log( 'onActionTakenChange event: ' + JSON.stringify( event ))
        this.modelObject.actionTaken = event.value;
        this.enableDisableActionTakenFields()
    }

    /**
     * Enables or disables the action taken fields based on the action taken choice
     */
    private enableDisableActionTakenFields()
    {
        this.log( 'enableDisableFields modelObject.actionTaken: ' + this.modelObject.actionTaken )
        this.log( 'enableDisableFields modelObject.actionTaken: ' + StockNotesActionTaken.getName( this.modelObject.actionTaken ));
        if ( !isNullOrUndefined( this.modelObject ))
        {
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
        return this.modelObject.actionTaken == StockNotesActionTaken.NONE ||
               this.modelObject.actionTaken == StockNotesActionTaken.BUY_LATER;
    }

    /**
     * Need to reset the form and any non-modelObject local variables
     */
    protected resetForm(): void
    {
        super.resetForm();
        this.tickerSymbols = "";
        this.stockSearch = "";
        this.stock = null;
    }

    /**
     * This method is override to check to see if the user added a new source.  if so, we need to notify the customer
     * service that the sources changed.
     * @param {StockNotes} modelObject
     */
    protected onSaveCompleted( modelObject: StockNotes )
    {
        this.log( "onSaveCompleted" );
        super.onSaveCompleted( modelObject );
        if ( this.sourcesChanged )
        {
            this.customerService.stockNoteSourcesChanged();
        }
    }

    protected onTextChange( event )
    {
        this.log( "onTextChange " + JSON.stringify( event ));
        this.log( "modelObject: " + JSON.stringify( this.modelObject ));
    }
}
