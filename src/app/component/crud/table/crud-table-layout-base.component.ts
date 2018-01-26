import { EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ModelObject } from '../../../model/common/model-object';
import { CrudTableColumn } from './crud-table-column';
import { BaseComponent } from '../../common/base.component';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableColumnSelectorDialogComponent } from './crud-table-column-selector-dialog.component';
import { CrudTableColumns } from './crud-table-columns';
import { CookieService } from 'ngx-cookie-service';
import { isNullOrUndefined } from 'util';

/**
 * This abstract base class defines the input and output parameters for the crud table.  As a standalone class, it
 * provide the ability for any crud table component to inherit and not have to redefine all of the these parameters.
 */
export abstract class CrudTableLayoutBaseComponent extends BaseComponent
{
    /******************************************************************************************************************
     *
     * I N P U T S
     *
     ******************************************************************************************************************/

    /**
     * Used to store the cookies for the table which includes the column customization.
     * Since this is a generic class, it is unaware of the application context.
     */
    @Input()
    protected cookieContext: string;

    @Input()
    protected buttonsTemplate: TemplateRef<any>;

    @Input()
    protected dialogTemplate: TemplateRef<any>;

    @Input()
    protected columnsTemplate: TemplateRef<any>;

    @Input()
    protected defaultColumnsTemplate: TemplateRef<any>;

    @Input()
    protected filterTemplate: TemplateRef<any>;

    @Input()
    protected modelObjectRows: any[];

    @Input()
    protected selection: any;

    @Input()
    protected loadingData: boolean;

    /**
     * Lazy loadingData flag.
     * @type {boolean}
     */
    @Input()
    protected lazy: boolean = true;

    @Input()
    protected paginator: boolean = true;

    @Input()
    protected selectedModelObject: ModelObject<any>;

    @Input()
    protected autoLayout: boolean = true;

    /**
     * Paginator # of page links
     * @type {number}
     */
    @Input()
    protected pageLinks: number = 3;

    /**
     * Paginator rows per page selection list.
     * @type {number[]}
     */
    @Input()
    protected rowsPerPageOptions: number[] = [20,30,40];

    /**
     * Paginator total records.
     */
    @Input()
    protected totalRecords: number;

    /**
     * Allow the user to resize the columns.
     * @type {boolean}
     */
    @Input()
    protected resizableColumns: boolean = true;

    /**
     * Allow the user eto recorder the columns.
     * @type {boolean}
     */
    @Input()
    protected reorderableColumns: boolean = true;

    @Input()
    protected responsive: boolean = true;

    @Input()
    protected rowsToDisplay: number = 20;

    /**
     * The field in the model object on which the selected row is based.
     * @type {string}
     */
    @Input()
    protected dataKey: string = "id";

    /**
     * These columns are set by the parent component and are the columns to display if there are no cookie columns defined.
     */
    @Input()
    protected defaultColumns: CrudTableColumn[];

    /**
     * A model object defines default columns and other columns.  The default columns come from the model object itself,
     * that is, columns for the primitive properties.  Whereas, the other columns, are those columns from other model
     * objects within the model object.  The combination of these two column arrays constitute the initial available columns.
     * The columns that are displayed {@code displayColumns} are either the default columns or the customized columns list
     * as contained in the {@code selectedColumns}.
     */
    @Input()
    protected additionalColumns: CrudTableColumn[];

    /**
     * These are the columns to be sent to/used by the turbo table.  They are defined as <any> because we are going to send it
     * our crudTableColumns of type CrudTableColumn whereas the turbo table expects a PrimeNg Column definition.  The
     * two types are compatible in these two contexts.
     * @type {any[]}
     */
    @Input()
    protected displayColumns: any[];

    /******************************************************************************************************************
     *
     * O U T P U T S
     *
     ******************************************************************************************************************/

    /*
    @Output()
    protected selectionChange = new EventEmitter<any>();
    */

    @Output()
    protected rowSelected = new EventEmitter<any>();

    /*
    @Output()
    protected rowUnselected = new EventEmitter<any>();
    */

    @Output()
    protected lazyLoadTable = new EventEmitter<any>();

    @Output()
    protected onLazyLoadEvent = new EventEmitter<any>();

    /*
    @Output()
    protected onRowDoubleClick;// = new EventEmitter<any>();
    */

    /**
     * Emitter when a model object is selected.
     * @type {EventEmitter<ModelObject<any>>}
     */
    @Output()
    protected selectedModelObjectChange = new EventEmitter<ModelObject<any>>();

    /**
     * New selected columns is emitted when the user customizes the columns for the table.
     * @type {EventEmitter<CrudTableColumns>}
     */
    @Output()
    protected displayColumnsChange = new EventEmitter<CrudTableColumn[]>();

    /**
     * Name of the cookie to store the user's selected column.
     */
    private selectedColumnsCookieName: string;

    /**
     * Column definitions for the crudTableColumns that are selected/displayed.
     * @type {any[]}
     */
    protected selectedColumns: CrudTableColumns = new CrudTableColumns( [] );

    /**
     * Column definitions for crudTableColumns that have not been selected to be displayed and thus are available.
     * @type {CrudTableColumns}
     */
    protected availableColumns: CrudTableColumns = new CrudTableColumns( [] );

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CookieService} cookieService
     */
    protected constructor( protected toaster: ToastsManager,
                           protected cookieService: CookieService )
    {
        super( toaster );
    }

    /**
     * Initialize the table, subscribe to form and button events, and call the loadTable method
     */
    public ngOnInit()
    {
        this.debug( "ngOnInit.begin" );
        this.loadColumns();
    }

    /**
     * Loads the columns that will be displayed on the table.  The defaults values from the {@code defaultColumns} and
     * {@code additionalColumns} are used unless there are cookie overrides for these values from customization done by the
     * user.
     */
    protected loadColumns(): void
    {
        const methodName = 'loadColumns';
        this.setCookieNames();
        if ( this.cookieService.check( this.selectedColumnsCookieName ) )
        {
            this.log( methodName + ' got selected crudTableColumns from cookie' );
            this.selectedColumns = this.restoreSelectedColumns();
        }
        else
        {
            this.selectedColumns
                .addAllFromArray( this.defaultColumns );
        }

        /*
         * Recalculate the available columns by adding all other columns and then removing selected columns.
         * We re-calculate them instead of storing them in a cookie because the columns contained within the model
         * object may change in the future.
         */
        this.availableColumns = new CrudTableColumns( this.additionalColumns );
        this.availableColumns
            .removeColumns( this.selectedColumns );
        this.log( methodName + ' available columns: ' + JSON.stringify( this.availableColumns ));
        this.log( methodName + ' selected columns: ' + JSON.stringify( this.selectedColumns ));
        this.displayColumns = this.selectedColumns
                                  .toArray();
        this.tickThenRun( () =>
                          {
                            this.displayColumnsChange
                                .emit( this.displayColumns );

                          });
        this.log( methodName + ' displayColumns: ' + JSON.stringify( this.displayColumns ));
    }

    /**
     * This method is called when the user clicks on the customize columns table button.
     */
    protected customizeColumns(): void
    {
        const methodName = 'customizeColumns';
        this.log( methodName );
        /*
         * Subscribe to the OK button being clicked to customize the column layout.
         */
        if ( isNullOrUndefined( this.getCrudTableColumnSelectorDialogComponent() ))
        {
            throw new ReferenceError( "Please include an @ViewChild(CrudTableColumnSelectorDialogComponent" );
        }
        this.addSubscription( 'columnsCustomizedEvent',
                              this.getCrudTableColumnSelectorDialogComponent()
                                  .subscribeToOkButtonClicked( () => this.columnsCustomized() ) );
        /*
         * Pass the column lists to the dialog.
         */
        this.getCrudTableColumnSelectorDialogComponent()
            .selectedColumns = this.selectedColumns.toColumnArray();
        this.getCrudTableColumnSelectorDialogComponent()
            .availableColumns = this.availableColumns.toColumnArray();
        /*
         * Display the dialog.
         */
        this.getCrudTableColumnSelectorDialogComponent()
            .displayDialog = true;
    }

    /**
     * This method is called when the use has clicked the ok button on the customize column dialog.
     */
    protected columnsCustomized(): void
    {
        const methodName = 'columnsCustomized';
        this.log( methodName + ' selectedColumns ' + JSON.stringify( this.getCrudTableColumnSelectorDialogComponent()
                                                                         .selectedColumns ));
        this.log( methodName + ' availableColumns ' + JSON.stringify( this.getCrudTableColumnSelectorDialogComponent()
                                                                          .availableColumns ));
        this.selectedColumns = new CrudTableColumns( this.getCrudTableColumnSelectorDialogComponent()
                                                         .selectedColumns );
        this.availableColumns = new CrudTableColumns( this.getCrudTableColumnSelectorDialogComponent()
                                                          .availableColumns );
        /*
         * save the results as cookies for now.  Later, we'll allow the user to add a name and store different
         * column settings and we'll store it in the DB so the user doesn't have to redefine.
         */
        this.cookieService
            .set( this.selectedColumnsCookieName, JSON.stringify( this.selectedColumns ));
        this.displayColumns = this.selectedColumns
                                  .toArray();
        /*
         * Send the columns back to the parent component so that the table is updated dynamically.
         */
        this.displayColumnsChange
            .emit( this.displayColumns );
    }

    /**
     * Sets the cookie names.
     */
    protected setCookieNames()
    {
        if ( isNullOrUndefined( this.cookieContext ) )
        {
            throw ReferenceError( 'input variable cookieContext is not set' );
        }
        this.selectedColumnsCookieName = this.cookieContext + '.SelectedColumns';
    }

    /**
     * Subclasses must create a ViewChild component and provide the reference to this parent class.
     * @return {CrudTableColumnSelectorDialogComponent}
     */
    protected abstract getCrudTableColumnSelectorDialogComponent(): CrudTableColumnSelectorDialogComponent;

    /**
     * Extracts user's selected columns from the cookie.
     */
    private restoreSelectedColumns()
    {
        const methodName = 'restoreSelectedColumns';
        this.logMethodBegin( methodName );
        let cookieColumns: CrudTableColumns = CrudTableColumns.fromJSON( this.cookieService.get( this.selectedColumnsCookieName ) );
        /*
         * Loop through these columns and add columns to the selected columns list by colId in case the column definition
         * has changed since the columns were saved.
         *
         * First, get a list of all of the available columns which includes the columns that were passed in as default
         * and other columns.
         */
        let allColumns = new CrudTableColumns( [] );
        allColumns.addAllFromArray( this.defaultColumns );
        allColumns.addAllFromArray( this.additionalColumns );
        let returnColumns = new CrudTableColumns( [] );
        cookieColumns.toArray()
                     .forEach( cookieColumn =>
                               {
                                   let allColumn: CrudTableColumn = allColumns.getColumn( cookieColumn.colId );
                                   if ( isNullOrUndefined( allColumn ))
                                   {
                                       this.logError( 'Could not find column ' + cookieColumn.colId + ' in the all columns list' );
                                   }
                                   else
                                   {
                                       returnColumns.addColumn( allColumn );
                                   }
                               })
        this.debug( methodName + '.end ' + JSON.stringify( returnColumns.toArray() ));
        return returnColumns;
    }

    /**
     * This method is call by the PrimeNG table to load the table.
     */
    protected onLazyLoad()
    {
        const methodName = 'onLazyLoad';
        this.debug( methodName );
        this.onLazyLoadEvent.emit();
    }

    /**
     * This method is called when the row is selected.
     * The selected model object will be emitted to the parent component.
     * @param modelObject
     */
    protected onRowSelect( modelObject: any )
    {
        const methodName = 'onRowSelect';
        this.debug( methodName + ' ' + JSON.stringify( modelObject ));
        this.rowSelected.emit( modelObject );
    }
}
