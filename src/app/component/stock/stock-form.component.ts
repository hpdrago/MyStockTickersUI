import { Component } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Stock } from "../../model/stock";
import { CrudOperation } from "../common/crud-operation";
import { SessionService } from "../../service/session.service";
import { CrudFormComponent } from "../common/crud-form.component";
import { StockFactory } from "../../model/stock-factory";
import { StockFormService } from "./stock-form.service";
import { StockCrudService } from "../../service/stock-crud.service";
import { ToastsManager } from "ng2-toastr";

/**
 * Created by mike on 10/8/2016.
 */
@Component(
{
    selector:    'stock-form',
    templateUrl: './stock-form.component.html',
    inputs: ['crudFormService']
})
export class StockFormComponent extends CrudFormComponent<Stock>
{
    constructor( protected toaster: ToastsManager,
                 private formBuilder: FormBuilder,
                 private session: SessionService,
                 private stockService: StockCrudService,
                 protected stockFormService: StockFormService,
                 protected stockFactory: StockFactory )
    {
        super( toaster, stockFormService, stockFactory );
    }

    /**
     * Create the stock form.  This is called by the super class
     * @return {FormGroup}
     * @override
     */
    protected createCrudForm(): FormGroup
    {
        var stockForm: FormGroup = this.formBuilder.group(
        {
            'tickerSymbol':  new FormControl( '', Validators.required ),
            'companyName':   new FormControl( '', Validators.required )
        } );
        return stockForm;
    }

    /**
     * Determines if the stock should be read only -- not able to be edited
     * @param stock
     * @returns {boolean}
     * @override
     */
    protected isModelObjectReadOnly( stock: Stock ): boolean
    {
        var isReadOnly = true;
        switch ( this.crudOperation )
        {
            case CrudOperation.INSERT:
                isReadOnly = false;
                break;

            case CrudOperation.UPDATE:
                /*
                isReadOnly = !this.stockService.canEditOrDelete( stock,
                                                                 this.session.getLoggedInUserId() );
                                                                 */
                break;

            case CrudOperation.DELETE:
                /*
                isReadOnly = !this.stockService.canEditOrDelete( stock,
                                                                 this.session.getLoggedInUserId() );
                                                                 */
                break;
        }
        return isReadOnly;
    }

    /**
     * Determines if the ticker symbol is invalid
     * @returns {boolean}
     */
    public isTickerSymbolInvalid(): boolean
    {
        return !this.crudForm.controls['tickerSymbol'].valid &&
               this.crudForm.controls['tickerSymbol'].dirty;
    }

    /**
     * Determines if the company name is invalid
     * @returns {boolean}
     */
    public isCompanyNameInvalid(): boolean
    {
        return !this.crudForm.controls['companyName'].valid &&
               this.crudForm.controls['companyName'].dirty;
    }

    /**
     * The tickerSymbol field is the primary key for a Stock.
     * @return {[string]}
     * @override
     */
    protected primaryKeyFields(): Array<string>
    {
        return ['tickerSymbol'];
    }

    /**
     * Determines if the stock exchange is invalid
     * @returns {boolean}
     */
   /* private isStockExchangeInvalid(): boolean
    {
        //return !this.crudForm.controls['stockExchange'].valid &&
        //       this.crudForm.controls['stockExchange'].dirty;
    }*/

}