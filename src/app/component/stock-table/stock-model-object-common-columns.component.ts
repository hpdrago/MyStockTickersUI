import { BaseComponent } from '../common/base.component';
import { Component, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableColumnCachedDataType } from '../crud/table/crud-table-column-cached-data-type';
import { StockModelObject } from '../../model/common/stock-model-object';
import { CrudTableColumn } from '../crud/table/crud-table-column';

@Component
({
    selector: 'stock-model-object-common-columns',
    templateUrl: './stock-model-object-common-columns.component.html'
})
export class StockModelObjectCommonColumnsComponent extends BaseComponent
{
    @Input()
    protected column: CrudTableColumn;

    @Input()
    protected modelObject: StockModelObject<any>;

    protected CrudTableColumnCachedDataType = CrudTableColumnCachedDataType;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }
}
