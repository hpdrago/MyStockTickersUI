import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { Component, Input } from '@angular/core';
import { StockCompany } from '../../model/entity/stock-company';

/**
 * This company displays the stock company name for a ticker symbol.
 * It works with the stock company cache to get the company name.
 */
@Component(
{
    selector: 'stock-company-name',
    template: ` <stock-company [tickerSymbol]="tickerSymbol"
                               (stockCompanyChange)="onStockCompanyChange($event)">
                    <div *ngIf="stockCompany">
                        {{stockCompany.companyName}}
                    </div>
                </stock-company>
    `
})
export class StockCompanyNameComponent extends BaseComponent
{
    /**
     * Need to the ticker symbol of the company to display.
     */
    @Input()
    protected tickerSymbol: string;

    /**
     * The stock company instance.
     */
    protected stockCompany: StockCompany;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    /**
     * This method is called to set the stock company object from the {@code StockCompanyComponent}.
     * @param {StockCompany} stockCompany
     */
    protected onStockCompanyChange( stockCompany: StockCompany )
    {
        this.log( 'onStockCompanyChange ' + JSON.stringify( stockCompany ));
        this.stockCompany = stockCompany;
    }
}
