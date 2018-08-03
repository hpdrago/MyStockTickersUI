import { BaseComponent } from '../../common/base.component';
import { Component, Input } from '@angular/core';
import { ModelObject } from '../../../model/common/model-object';
import { CrudTableColumn } from './crud-table-column';
import { CrudTableColumnType } from './crud-table-column-type';
import { ToastsManager } from 'ng2-toastr';
import { isNullOrUndefined } from 'util';
import { BullOrBear } from '../../../common/bull-or-bear.enum';

/**
 * Handles the displaying of a model object generic property on a crud table.
 */
@Component
({
    selector: 'crud-table-column-by-data-type',
    template: `
        <div [ngSwitch]="column.dataType">
            <div *ngSwitchCase="CrudTableColumnType.STRING">
                {{getProperty( modelObject, column.field )}}
            </div>
            <div *ngSwitchCase="CrudTableColumnType.STAR_RATING">
                <p-rating [ngModel]="getProperty( modelObject, column.field )">
                </p-rating>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.DATE">
                <date [dateValue]="getProperty( modelObject, column.field )">
                </date>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.CURRENCY">
                <div style="text-align: right">
                    <currency [currencyValue]="getProperty( modelObject, column.field )">
                    </currency>
                </div>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.GAIN_LOSS_CURRENCY">
                <div style="text-align: right">
                    <gain-loss-currency [currencyValue]="getProperty( modelObject, column.field )">
                    </gain-loss-currency>
                </div>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.NOTES_SOURCE">
                {{modelObject[column.field]}}
            </div>
            <div *ngSwitchCase="CrudTableColumnType.COMMENTS">
                <stock-comments [stockNotesContainer]="modelObject">
                </stock-comments>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.NUMBER">
                <div style="text-align: right">
                    {{modelObject[column.field]}}
                </div>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.PERCENT">
                <div style="text-align: right">
                    <percent [percentValue]="getProperty( modelObject, column.field )">
                    </percent>
                </div>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.GAIN_LOSS_PERCENT">
                <gain-loss-percent [percentValue]="getProperty( modelObject, column.field )">
                </gain-loss-percent>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.MARKET_CAP">
                <millify-column [value]="getProperty( modelObject, column.field )">
                </millify-column>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.STOCK_ANALYST_CONSENSUS">
                <stock-analyst-consensus [tickerSymbol]="getProperty( modelObject, 'tickerSymbol' )">
                </stock-analyst-consensus>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.STOCK_ANALYST_PRICE_TARGETS">
                <stock-analyst-price-targets [tickerSymbol]="getProperty( modelObject, 'tickerSymbol' )">
                </stock-analyst-price-targets>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.BULL_OR_BEAR">
                {{BullOrBear.getName(getProperty( modelObject, column.field ))}}
            </div>
            <div *ngSwitchDefault>
                No switch case for data type {{column.dataType}}
            </div>
        </div>
    `
 })
export class CrudTableColumnByDataTypeComponent extends BaseComponent
{
    protected CrudTableColumnType = CrudTableColumnType;
    protected BullOrBear = BullOrBear;

    /**
     * The model object from which the property will be extracted.
     * The property is defined in {@code column}
     */
    @Input()
    protected modelObject: ModelObject<any>;

    /**
     * Contains the information about the property to be displayed.
     */
    @Input()
    protected column: CrudTableColumn;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    protected isValidProperty( object: any ): boolean
    {
        return !isNullOrUndefined( object );
    }
}
