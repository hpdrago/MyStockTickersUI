import { Component } from "@angular/core";
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Stock } from "../../model/class/stock";
import { CrudOperation } from "../common/crud-operation";
import { CrudFormComponent } from "../common/crud-form.component";
import { StockFactory } from "../../model/factory/stock.factory";
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
                 protected stockFactory: StockFactory )
    {
        super( toaster, stockFactory );
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
            case CrudOperation.CREATE:
                isReadOnly = false;
                break;

            case CrudOperation.UPDATE:
                /*
                isReadOnly = !this.stockCrudService.canEditOrDelete( stock,
                                                                 this.session.getLoggedInUserId() );
                                                                 */
                break;

            case CrudOperation.DELETE:
                /*
                isReadOnly = !this.stockCrudService.canEditOrDelete( stock,
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
        return !this.formGroup.controls['tickerSymbol'].valid &&
               this.formGroup.controls['tickerSymbol'].dirty;
    }

    /**
     * Determines if the company name is invalid
     * @returns {boolean}
     */
    public isCompanyNameInvalid(): boolean
    {
        return !this.formGroup.controls['companyName'].valid &&
               this.formGroup.controls['companyName'].dirty;
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
        //return !this.formGroup.controls['stockExchange'].valid &&
        //       this.formGroup.controls['stockExchange'].dirty;
    }*/

}
