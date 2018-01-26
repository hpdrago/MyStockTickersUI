import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { StockCompany } from '../../model/entity/stock-company';
import { StockSearchComponent } from '../common/stock-search.component';
import { CrudTableLayoutBaseComponent } from '../crud/table/crud-table-layout-base.component';
import { ToastsManager } from 'ng2-toastr';
import { CookieService } from 'ngx-cookie-service';
import { CrudTableColumn } from '../crud/table/crud-table-column';
import { CrudTableColumnSelectorDialogComponent } from '../crud/table/crud-table-column-selector-dialog.component';
import { CrudTableLayoutComponent } from '../crud/table/crud-table-layout.component';

/**
 * Component for all stock related CRUD Tables.
 */
@Component
({
    selector: 'stock-model-object-table-component',
    templateUrl: './stock-model-object-table-layout.component.html'
 })
export class StockModelObjectTableLayoutComponent extends CrudTableLayoutBaseComponent
{
    @ViewChild(StockSearchComponent)
    protected stockSearchComponent: StockSearchComponent

    /**
     * Column customizer.
     */
    @ViewChild(CrudTableLayoutComponent)
    protected crudTableLayoutComponent: CrudTableLayoutComponent;

    @Output()
    protected stockSelected: EventEmitter<StockCompany> = new EventEmitter<StockCompany>();

    @Output()
    protected resetButtonClicked: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CookieService} cookieService
     */
    public constructor( protected toaster: ToastsManager,
                        protected cookieService: CookieService )
    {
        super( toaster,
               cookieService );
    }

    /**
     * This method is called when the user selects a stock company to filter the table.
     * @param {StockCompany} stockCompany
     */
    protected onStockSelected( stockCompany: StockCompany )
    {
        this.stockSelected
            .emit( stockCompany );
    }

    /**
     * This method id called when the reset button is clicked on the stock company search filter.
      */
    protected onResetButtonClick()
    {
        this.resetButtonClicked
            .emit();
    }

    /**
     * Need to provide the reference of the column customizer dialog to the base class.
     * @return {CrudTableColumnSelectorDialogComponent}
     */
    protected getCrudTableColumnSelectorDialogComponent(): CrudTableColumnSelectorDialogComponent
    {
        return this.crudTableLayoutComponent
                   .crudTableColumnSelectorDialogComponent;
    }
}
