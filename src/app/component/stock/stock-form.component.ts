import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Stock } from "../../model/stock";
import { CrudOperation } from "../../common/crud-operation";
import { StockExchangeService } from "../../service/stock-exchange.service";
import { SelectItem, Message } from "primeng/primeng";
import { StockService } from "../../service/stock.service";
import { SessionService } from "../../service/session.service";
import { Logger } from "../../service/logger.service";

/**
 * Created by mike on 10/8/2016.
 */
@Component(
{
    selector:    'stock-form',
    templateUrl: 'stock-form.component.html',
    styleUrls:   ['stock-form.component.css'],
    providers:   [Logger]
})
export class StockFormComponent implements OnInit, OnChanges
{
    @Input()
    private stock: Stock;
    @Input()
    private crudOperation: CrudOperation;
    @Output()
    private buttonSave: EventEmitter<any> = new EventEmitter();
    @Output()
    private buttonAdd: EventEmitter<any> = new EventEmitter();
    private stockExchanges: SelectItem[];

    private msgs: Message[] = [];
    private stockForm: FormGroup;
    private submitted: boolean;

    constructor( private formBuilder: FormBuilder,
                 private stockExchangeService: StockExchangeService,
                 private stockService: StockService,
                 private session: SessionService,
                 private logger: Logger )
    {
        this.stock = new Stock( '', '', '', 0, false );
        this.logger.setClassName( StockFormComponent.name );
    }

    /**
     * Determines if the Save button is disabled.
     * @returns {boolean} true if updating a stock and the input data is valid,
     *                    false otherwise
     */
    private isSaveButtonDisabled()
    {
        var disabled = true;
        if ( this.crudOperation == CrudOperation.UPDATE )
        {
            disabled = !this.stockForm.valid;
        }
        return disabled;
    }

    /**
     * Determines if the Add button is disabled.
     * @returns {boolean} true if adding a stock and the input data is valid,
     *                    false otherwise
     */
    private isAddButtonDisabled()
    {
        var disabled = true;
        if ( this.crudOperation == CrudOperation.INSERT )
        {
            disabled = !this.stockForm.valid;
        }
        return disabled;
    }

    /**
     * Initialize the class
     */
    public ngOnInit(): void
    {
        this.stockExchanges = this.stockExchangeService.get().getSelectItems();
        //alert( JSON.stringify( this.stockExchanges ) );
        this.stockForm = this.formBuilder.group(
        {
            'tickerSymbol':  new FormControl( '', Validators.required ),
            'companyName':   new FormControl( '', Validators.required ),
            'stockExchange': new FormControl( '', Validators.required )
        } );
    }

    /**
     * This method is called for changes to the input data
     * @param changes
     */
    public ngOnChanges( changes: {[propertyName: string]: SimpleChange} )
    {
        var stockChange = changes['stock'];
        this.logger.log( "stockChange: " + stockChange );
        var curStock  = stockChange.currentValue;
        var prevStock = stockChange.previousValue;
        for (let propName in changes)
        {
            this.logger.log( "property that changed: " + propName );
            let chng = changes[propName];
            this.logger.log( "chng: " + chng );
            let cur  = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
            this.logger.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
            switch ( propName )
            {
                case 'stock':
                    this.logger.log( "stock changes" );
                    break;
            }
        }
        if ( curStock )
        {
            if ( this.isReadOnly( curStock ) )
            {
                this.disableInputs();
            }
            else
            {
                this.enableInputs();
            }
        }
    }

    /**
     * Disables the input fields
     */
    private disableInputs(): void
    {
        this.stockForm.controls["tickerSymbol"].disable();
        this.stockForm.controls["companyName"].disable();
        this.stockForm.controls["stockExchange"].disable();
    }

    /**
     * Enable the input fields
     */
    private enableInputs(): void
    {
        this.stockForm.controls["tickerSymbol"].enable();
        this.stockForm.controls["companyName"].enable();
        this.stockForm.controls["stockExchange"].enable();
    }

    /**
     * Determines if the stock should be read only and not able to be edited
     * @param stock
     * @returns {boolean}
     */
    private isReadOnly( stock: Stock ): boolean
    {
        var isReadOnly = true;
        if ( this.crudOperation == CrudOperation.INSERT )
        {
            isReadOnly = false;
        }
        else if ( this.stock )
        {
            isReadOnly = this.stockService.canEditOrDelete( stock,
                                                            this.session.getLoggedInUserId() );
        }
        this.logger.log( "isReadOnly: " + isReadOnly );
        return isReadOnly;
    }

    /**
     * Determines if the ticker symbol is invalid
     * @returns {boolean}
     */
    private isTickerSymbolInvalid(): boolean
    {
        return !this.stockForm.controls['tickerSymbol'].valid &&
               this.stockForm.controls['tickerSymbol'].dirty;
    }

    /**
     * Determines if the company name is invalid
     * @returns {boolean}
     */
    private isCompanyNameInvalid(): boolean
    {
        return !this.stockForm.controls['companyName'].valid &&
               this.stockForm.controls['companyName'].dirty;
    }

    /**
     * Determines if the stock exchange is invalid
     * @returns {boolean}
     */
    private isStockExchangeInvalid(): boolean
    {
        return !this.stockForm.controls['stockExchange'].valid &&
               this.stockForm.controls['stockExchange'].dirty;
    }

    /**
     * The user wants to save the stock
     */
    private saveButtonClick()
    {
        this.logger.log( "saveButtonClicked " + JSON.stringify( this.stock ));
        this.stockService.updateStock( this.stock );
        this.buttonSave.emit( this.stock );
        this.stockForm.reset();
    }

    /**
     * The user wants to add a new stock
     */
    private addButtonClick()
    {
        this.logger.log( "addButtonClicked " + JSON.stringify( this.stock ));
        this.stockService.addStock( this.stock );
        this.buttonAdd.emit( this.stock );
        this.stockForm.reset();
    }

    private onSubmit()
    {
        this.logger.log( "onSubmit " + JSON.stringify( this.stock ));
        this.submitted = true;
        this.msgs = [];
        this.msgs.push( { severity: 'info', summary: 'Success', detail: 'Form Submitted' } );
    }

    get diagnostic()
    {
        return JSON.stringify( this.stockForm.value );
    }
}