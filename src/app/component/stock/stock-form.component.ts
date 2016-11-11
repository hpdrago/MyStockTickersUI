import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Stock } from "../../model/stock";
import { CrudOperation } from "../../common/crud-operation";
import { StockExchangeService } from "../../service/stock-exchange.service";
import { SelectItem, Message } from "primeng/primeng";
import { StockService } from "../../service/stock.service";
import { SessionService } from "../../service/session.service";
import { Logger } from "../../service/logger.service";
import { RestException } from "../../common/RestException";

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
    private crudOperation: CrudOperation = CrudOperation.NONE;
    @Output()
    private onStockSave: EventEmitter<any> = new EventEmitter();
    @Output()
    private onStockAdd: EventEmitter<any> = new EventEmitter();
    @Output()
    private onStockDelete: EventEmitter<any> = new EventEmitter();
    //private stockExchanges: SelectItem[];

    private messages: Message[] = [];
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
        this.stockForm = this.formBuilder.group(
        {
            'tickerSymbol':  new FormControl( '', Validators.required ),
            'companyName':   new FormControl( '', Validators.required )
        } );
    }

    /**
     * Initialize the class
     */
    public ngOnInit(): void
    {
        this.logger.log( "ngOnInit" );
        //this.stockExchanges = this.stockExchangeService.get().getSelectItems();
        //alert( JSON.stringify( this.stockExchanges ) );
        //'stockExchange': new FormControl( '', Validators.required )
    }

    /**
     * This method is called for changes to the input data
     * @param changes
     */
    public ngOnChanges( changes: {[propertyName: string]: SimpleChange} )
    {
        var methodName = "ngOnChanges";
        var stockChanges = changes['stock'];
        this.logger.log( methodName + " crudOperation: " + this.crudOperation );
        var curStock  = stockChanges.currentValue;
        var prevStock = stockChanges.previousValue;
        for (let propName in changes)
        {
            this.logger.log( methodName + " property that changed: " + propName );
            let chng = changes[propName];
            this.logger.log( methodName + " change: " + chng );
            let cur  = JSON.stringify(chng.currentValue);
            let prev = JSON.stringify(chng.previousValue);
            this.logger.log( methodName + ` ${propName}: currentValue = ${cur}, previousValue = ${prev}`);
            switch ( propName )
            {
                case 'stock':
                    this.logger.log( methodName + " stock changes" );
                    break;
            }
        }
        if ( this.isReadOnly( curStock ) )
        {
            this.disableInputs();
        }
        else
        {
            this.enableInputs();
        }
    }

    /**
     * Determines if the stock should be read only -- not able to be edited
     * @param stock
     * @returns {boolean}
     */
    private isReadOnly( stock: Stock ): boolean
    {
        var isReadOnly = true;
        switch ( this.crudOperation )
        {
            case CrudOperation.INSERT:
                isReadOnly = false;
                break;

            case CrudOperation.UPDATE:
                isReadOnly = !this.stockService.canEditOrDelete( stock,
                                                                 this.session.getLoggedInUserId() );
                break;

            case CrudOperation.DELETE:
                isReadOnly = !this.stockService.canEditOrDelete( stock,
                                                                 this.session.getLoggedInUserId() );
                break;
        }
        /*
        this.logger.log( "isReadOnly: " + isReadOnly +
                         " crudOperation: " + this.crudOperation +
                         " stock: " + JSON.stringify( stock ));*/
        return isReadOnly;
    }

    /**
     * Disables the input fields
     */
    private disableInputs(): void
    {
        this.stockForm.controls["tickerSymbol"].disable();
        this.stockForm.controls["companyName"].disable();
        //this.stockForm.controls["stockExchange"].disable();
    }

    /**
     * Enable the input fields
     */
    private enableInputs(): void
    {
        if ( this.crudOperation != CrudOperation.NONE &&
             this.crudOperation != CrudOperation.DELETE )
        {
            this.stockForm.controls["tickerSymbol"].enable();
            this.stockForm.controls["companyName"].enable();
            //this.stockForm.controls["stockExchange"].enable();
        }
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
   /* private isStockExchangeInvalid(): boolean
    {
        //return !this.stockForm.controls['stockExchange'].valid &&
        //       this.stockForm.controls['stockExchange'].dirty;
    }*/

    /**
     * The user wants to save the stock
     */
    private onSaveButtonClick()
    {
        var methodName = "onSaveButtonClick";
        this.logger.log( methodName + " " + JSON.stringify( this.stock ));
        this.stockService.updateStock( this.stock )
                         .subscribe( () =>
                                     {
                                         this.logger.log( methodName + " add successful" );
                                         this.onStockAdd.emit( this.stock );
                                         this.stockForm.reset();
                                     },
                                     err => this.error( err )
                         );
    }

    /**
     * The user wants to add a new stock
     */
    private onAddButtonClick()
    {
        var methodName = "onAddButtonClick";
        this.logger.log( methodName + " " + JSON.stringify( this.stock ));
        this.stockService.addStock( this.stock )
                         .subscribe( () =>
                                     {
                                         this.logger.log( methodName + " save successful" );
                                         this.onStockSave.emit( this.stock );
                                         this.stockForm.reset();
                                     },
                                     err =>
                                     {
                                         this.error( err )
                                     }
                         );
    }

    /**
     * The user wants to delete a new stock
     */
    private onDeleteButtonClick()
    {
        var methodName = "onDeleteButtonclick";
        this.logger.log( methodName + " " + JSON.stringify( this.stock ));
        this.stockService.deleteStock( this.stock )
            .subscribe( () =>
                        {
                            this.logger.log( methodName + " delete successful" );
                            this.onStockDelete.emit( this.stock );
                            this.stockForm.reset();
                        },
                        err =>
                        {
                            this.error( err )
                        }
            );
    }

    /**
     * Determines if the Save Button should be shown
     * @returns {boolean}
     */
    private isShowSaveButton(): boolean
    {
        return this.crudOperation != CrudOperation.INSERT &&
               this.crudOperation != CrudOperation.NONE
    }

    /**
     * Determines if the Delete Button should be shown
     * @returns {boolean}
     */
    private isShowDeleteButton(): boolean
    {
        return this.crudOperation != CrudOperation.INSERT &&
               this.crudOperation != CrudOperation.NONE;
    }

    /**
     * Determines if the Add Button should be shown
     * @returns {boolean}
     */
    private isShowAddButton(): boolean
    {
        return this.crudOperation == CrudOperation.INSERT;
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
     * Determines if the Save button is disabled.
     * @returns {boolean} true if adding a stock and the input data is valid,
     *                    false otherwise
     */
    private isSaveButtonDisabled()
    {
        var disabled = true;
        if ( this.crudOperation == CrudOperation.UPDATE &&
             !this.isReadOnly( this.stock ))
        {
            disabled = !this.stockForm.valid;
        }
        return disabled;
    }

    /**
     * Determines if the Delete button is disabled.
     * @returns {boolean} true if adding a stock and the input data is valid,
     *                    false otherwise
     */
    private isDeleteButtonDisabled()
    {
        var disabled = true;
        if ( this.crudOperation == CrudOperation.UPDATE &&
             !this.isReadOnly( this.stock ))
        {
            disabled = !this.stockForm.valid;
        }
        return disabled;
    }

    private onSubmit()
    {
        this.logger.log( "onSubmit " + JSON.stringify( this.stock ));
        this.submitted = true;
        this.messages = [];
        this.messages.push( { severity: 'info', summary: 'Success', detail: 'Form Submitted' } );
    }

    /**
     * General error handling.  Logs a message to the console and adds a message to the growl component.
     * @param message
     */
    private error( error: any ): void
    {
        var exception: RestException = new RestException( error );
        this.messages.push( { severity: 'error', summary: 'Failure', detail: exception.getMessage() } );
    }

    get diagnostic()
    {
        return JSON.stringify( this.stockForm.value );
    }
}