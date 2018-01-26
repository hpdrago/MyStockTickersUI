import { BaseComponent } from '../../common/base.component';
import { Component, Input } from '@angular/core';
import { ModelObject } from '../../../model/common/model-object';
import { CrudTableColumn } from './crud-table-column';
import { CrudTableColumnType } from './crud-table-column-type';
import { ToastsManager } from 'ng2-toastr';
import * as _ from "lodash";
import { isNullOrUndefined } from 'util';

/**
 * Handles the displaying of a model object generic property on a crud table.
 */
@Component
({
    selector: 'crud-table-display-column',
    template: `
        <div [ngSwitch]="column.dataType">
            <div *ngSwitchCase="CrudTableColumnType.CURRENCY">
                <currency [currencyValue]="getProperty( modelObject, column.field )">
                </currency>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.NOTES_SOURCE">
                {{modelObject[column.field]}}
            </div>
            <div *ngSwitchCase="CrudTableColumnType.COMMENTS">
                <stock-comments [stockNotesContainer]="modelObject">
                </stock-comments>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.NUMBER">
                "No Def for NUMBER"
            </div>
            <div *ngSwitchCase="CrudTableColumnType.PERCENT">
                <percent [percentValue]="getProperty( modelObject, column.field )">
                </percent>
            </div>
            <div *ngSwitchCase="CrudTableColumnType.STRING">
                {{getProperty( modelObject, column.field )}}
            </div>
        </div>
    `
 })
export class CrudTableDisplayColumnComponent extends BaseComponent
{
    protected CrudTableColumnType = CrudTableColumnType;

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

    /**
     * Using Lodash to extract a property from an object where the property can include a full dot path to other objects.
     * @param object
     * @param {string} property
     * @return {undefined}
     */
    protected getProperty( object: any, property: string ): any
    {
        let value = _.get( object, property );
        this.debug( "getProperty object: " + JSON.stringify( object ) );
        this.debug( "getProperty object: property: " + property + " value: " + value );
        return value;
    }

    protected isValidProperty( object: any ): boolean
    {
        return !isNullOrUndefined( object );
    }
}
