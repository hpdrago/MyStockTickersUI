import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SelectItem } from "primeng/primeng";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesStock } from "../../model/entity/stock-notes-stock";
import { SessionService } from "../../service/session.service";
import { CrudOperation } from "../crud/common/crud-operation";
import { isNullOrUndefined } from "util";
import { StockNotesSentiment } from "../../common/stock-notes-sentiment.enum";
import { StockNotesActionTaken } from "../../common/stock-notes-action-taken.enum";
import { StockPriceQuoteService } from "../../service/crud/stock-price-quote.service";
import { StockNotesStateStore } from './stock-notes-state-store';
import { StockNotesController } from './stock-notes-controller';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';
import { CrudFormComponent } from '../crud/form/crud-form.component';
import { StockCompany } from '../../model/entity/stock-company';
import { StockSearchSelectedCompaniesComponent } from '../common/stock-search-selected-companies.component';
import { StockNotesSourceSelectionComponent } from '../common/stock-notes-source-selection.component';
import { StockCompanyPriceQuoteService } from '../../service/stock-company-price-quote.service';

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
    @ViewChild(StockSearchSelectedCompaniesComponent)
    protected stockSearchSelectedCompaniesComponent: StockSearchSelectedCompaniesComponent;

    @ViewChild(StockNotesSourceSelectionComponent)
    protected stockNotesSourceSelectionComponent: StockNotesSourceSelectionComponent;

    /**
     * Constructor.
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {StockPriceQuoteService} stockService
     * @param {StockNotesStateStore} stockNotesCrudStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCrudService} stockNotesCrudService
     * @param {StockCompanyPriceQuoteService} stockCompanyPriceQuoteService
     * @param {StockPriceQuoteService} stockPriceQuoteService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private stockService: StockPriceQuoteService,
                 private stockNotesCrudStateStore: StockNotesStateStore,
                 private stockNotesController: StockNotesController,
                 private stockNotesFactory: StockNotesFactory,
                 private stockNotesCrudService: StockNotesCrudService,
                 private stockCompanyPriceQuoteService: StockCompanyPriceQuoteService,
                 private stockPriceQuoteService: StockPriceQuoteService )
    {
        super( changeDetector,
               toaster,
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
     * Initialize the sub components.
     */
    public ngAfterViewInit(): void
    {
        this.log( 'ngAfterViewInit.override.begin' );
        super.ngAfterViewInit();
        if ( (this.isCrudUpdateOperation() || this.isCrudDeleteOperation()) &&
              !isNullOrUndefined( this.modelObject.tickerSymbol ))
        {
            this.stockSearchSelectedCompaniesComponent
                .loadCompany( this.modelObject.tickerSymbol );
        }
        if ( this.isCrudDeleteOperation() )
        {
            this.stockSearchSelectedCompaniesComponent
                .setDisabled( true );
        }
        this.enableDisableActionTakenFields();
        this.changeDetector
            .detectChanges();
        this.log( 'ngAfterViewInit.override.end' );
    }

    /**
     * Clear out the form.
     */
    protected resetForm(): void
    {
        const methodName = 'resetForm';
        this.log( methodName + '.begin' );
        super.resetForm();
        if ( this.stockSearchSelectedCompaniesComponent )
        {
            this.stockSearchSelectedCompaniesComponent.reset();
        }
        this.modelObject.notesDate = new Date();
        this.formGroup.controls['notesDate'].setValue( new Date() );
        this.log( methodName + '.end' );
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
            'stockSearch':       new FormControl(),
            'bullOrBear':        new FormControl( this.modelObject.bullOrBear ),
            'actionTaken':       new FormControl( this.modelObject.actionTaken ),
            'actionTakenShares': new FormControl( this.modelObject.actionTakenShares ),
            'actionTakenPrice':  new FormControl( this.modelObject.actionTakenPrice )
        } );
        return stockNoteForm;
    }

    /**
     * Override this method to set the local editable form field {@code tickerSymbols}
     * @param {StockNotes} modelObject
     */
    protected setFormValues( modelObject: StockNotes )
    {
        const methodName = "setFormValues";
        this.log( methodName + " modelObject: " + JSON.stringify( modelObject ));
        this.log( methodName + " crudOperation: " + CrudOperation.getName( this.crudOperation ) );
        if ( this.isCrudCreateOperation() )
        {
            if ( isNullOrUndefined( modelObject.actionTaken ))
            {
                modelObject.actionTaken = StockNotesActionTaken.NONE;
            }
            if ( isNullOrUndefined( modelObject.actionTakenShares ))
            {
                modelObject.actionTakenShares = 0;
            }
        }
        super.setFormValues( modelObject );
    }

    /**
     * This method is called just before the form is displayed
     */
    protected prepareToDisplay(): void
    {
        const methodName = "prepareToDisplay";
        this.log( methodName + '.begin' );
        super.prepareToDisplay();
        /*
         * Need to simulate the entry of the stocks for this stock note
         */
        this.modelObject
            .stocks
            .forEach( (stockNoteStock: StockNotesStock) =>
                      {
                          this.debug( methodName + " getting stock company: " + stockNoteStock.tickerSymbol );
                          this.stockCompanyPriceQuoteService
                              .getStockCompany( stockNoteStock.tickerSymbol )
                              .subscribe( (stockCompany: StockCompany) =>
                                          {
                                              this.stockSearchSelectedCompaniesComponent
                                                  .addCompany( stockCompany )
                                          }
                              );
                      } );
        this.log( methodName + '.end' );
    }

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    public onStockSelected( stockCompany: StockCompany )
    {
        this.log( "onStockSelected: " + JSON.stringify( stockCompany ) );
        this.modelObject.tickerSymbol = stockCompany.tickerSymbol;
        this.modelObject.stockPriceWhenCreated = stockCompany.lastPrice;
        this.setFormValue( 'tickerSymbol', stockCompany.tickerSymbol );
    }

    /**
     * Before saving, get the selected stock companies and add them to the stock note stock list.
     */
    protected prepareToSave(): void
    {
        let methodName = 'prepareToSave';
        this.log( methodName );
        this.stockSearchSelectedCompaniesComponent
            .getCompanies()
            .forEach( (stockCompany: StockCompany) =>
                      {
                          let stockNoteStock: StockNotesStock = new StockNotesStock();
                          stockNoteStock.tickerSymbol = stockCompany.tickerSymbol
                          stockNoteStock.stockPrice = stockCompany.lastPrice;
                          stockNoteStock.customerId = this.modelObject
                                                          .customerId;
                          this.modelObject
                              .stocks
                              .push( stockNoteStock );
                      });
        super.prepareToSave();
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
