import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { CrudFormComponent } from "../crud/form/crud-form.component";
import { ToastsManager } from "ng2-toastr";
import { Stock } from "../../model/entity/stock";
import { CrudOperation } from "../crud/common/crud-operation";
import { StockFactory } from '../../model/factory/stock.factory';
import { StockController } from './stock-controller';
import { StockStateStore } from './stock-crud-state-store';
import { StockCrudService } from '../../service/crud/stock-crud.service';

/**
 * Created by mike on 10/8/2016.
 */
@Component(
{
    selector:    'stock-form',
    templateUrl: './stock-form.component.html'
})
export class StockFormComponent extends CrudFormComponent<Stock>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {FormBuilder} formBuilder
     * @param {StockStateStore} stockStateStore
     * @param {StockController} stockController
     * @param {StockFactory} stockFactory
     * @param {StockCrudService} stockCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private formBuilder: FormBuilder,
                 private stockStateStore: StockStateStore,
                 private stockController: StockController,
                 private stockFactory: StockFactory,
                 private stockCrudService: StockCrudService )
    {
        super( toaster,
               stockStateStore,
               stockController,
               stockFactory,
               stockCrudService );
    }

    /**
     * Create the stock form.  This is called by the super class
     * @return {FormGroup}
     * @override
     */
    protected createFormGroup(): FormGroup
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
    protected readOnlyFields(): Array<string>
    {
        return ['tickerSymbol'];
    }

    /**
     * Determines if the stock stockExchange is invalid
     * @returns {boolean}
     */
   /* private isStockExchangeInvalid(): boolean
    {
        //return !this.formGroup.controls['stockExchange'].valid &&
        //       this.formGroup.controls['stockExchange'].dirty;
    }*/

}
