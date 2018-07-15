import { AfterViewInit, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { ModelObject } from '../../../model/common/model-object';
import { CrudTableColumn } from './crud-table-column';
import { BaseComponent } from '../../common/base.component';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableColumnSelectorDialogComponent } from './crud-table-column-selector-dialog.component';
import { CrudTableColumns } from './crud-table-columns';
import { CookieService } from 'ngx-cookie-service';
import { isNullOrUndefined } from 'util';
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudController } from '../common/crud-controller';

/**
 * This abstract base class defines the input and output parameters for the crud table.  As a standalone class, it
 * provide the ability for any crud table component to inherit and not have to redefine all of the these parameters.
 */
export abstract class CrudTableLayoutBaseComponent extends BaseComponent implements AfterViewInit
{
    /**
     * Column customizer.
     */
    @ViewChild(CrudTableColumnSelectorDialogComponent)
    protected crudTableColumnSelectorDialogComponent: CrudTableColumnSelectorDialogComponent;

    /**
     * I N P U T S
     */
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
    protected crudTableColumns: CrudTableColumn[];

    @Input()
    protected selection: any;

    @Input()
    protected loading: boolean;

    @Input()
    protected lazy: boolean = true;

    @Input()
    protected paginator: boolean = true;

    @Input()
    protected selectedModelObject: ModelObject<any>;

    @Input()
    protected autoLayout: boolean = true;

    @Input()
    protected pageLinks: number = 3;

    @Input()
    protected rowsPerPageOptions: number[] = [20,30,40];

    @Input()
    protected totalRecords: number;

    @Input()
    protected resizableColumns: boolean = true;

    @Input()
    protected reorderableColumns: boolean = true;

    @Input()
    protected responsive: boolean = true;

    @Input()
    protected rowsToDisplay: number = 20;

    @Input()
    protected dataKey: string = "id";

    /**
     * O U T P U T
     */
    @Output()
    protected selectionChange = new EventEmitter<any>();

    @Output()
    protected onRowSelect = new EventEmitter<any>();

    @Output()
    protected onRowUnSelect = new EventEmitter<any>();

    @Output()
    protected lazyLoadTable = new EventEmitter<any>();

    @Output()
    protected onRowDoubleClick = new EventEmitter<any>();

    @Output()
    protected selectedModelObjectChange = new EventEmitter<ModelObject<any>>();

    /**
     * These are the crudTableColumns to be sent to the turbo table.  They are defined as <any> because we are going to send it
     * our crudTableColumns of type CrudTableColumn.
     * @type {any[]}
     */
    protected columns: any[] = [];

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

    private selectedColumnsCookieName: string;
    private availableColumnsCookieName: string;

    private _modelObjectFactory: ModelObjectFactory<any>;
    private _crudController: CrudController<any>;


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
    }

    /**
     * View init completed.
     */
    public ngAfterViewInit()
    {
        /*
         * Subscribe to the OK button being clicked to customize the column layout.
         */
        if ( !isNullOrUndefined( this.crudTableColumnSelectorDialogComponent ))
        {
            this.addSubscription( 'columnsCustomizedEvent',
                                  this.crudTableColumnSelectorDialogComponent
                                      .subscribeToOkButtonClicked( () => this.columnsCustomized() ) );
        }
    }

    /**
     * Load all of the crudTableColumns for type table.  This is based on the type of model object.
     */
    protected loadColumns(): void
    {
        const methodName = 'loadColumns';
        let modelObject: ModelObject<any> = this._modelObjectFactory
                                                .newModelObject();
        let crudTableColumns: CrudTableColumns = modelObject.getCrudTableColumns();
        this.selectedColumnsCookieName = this.getClassName() + ".SelectedColumns";
        this.availableColumnsCookieName = this.getClassName() + ".AvailableColumns";
        if ( !isNullOrUndefined( crudTableColumns ) )
        {
            if ( this.cookieService.check( this.selectedColumnsCookieName ) )
            {
                this.log( methodName + ' got selected crudTableColumns from cookie' );
                this.selectedColumns = CrudTableColumns.fromJSON( this.cookieService.get( this.selectedColumnsCookieName ) );
            }
            else
            {
                this.selectedColumns.addAll( modelObject.getCrudTableColumns() )
            }
            if ( this.cookieService.check( this.availableColumnsCookieName ))
            {
                this.log( methodName + ' got available crudTableColumns from cookie' );
                this.availableColumns = CrudTableColumns.fromJSON( this.cookieService.get( this.selectedColumnsCookieName ) );
            }
            else
            {
                this.availableColumns.addAll( modelObject.getOtherCrudTableColumns() );
            }
            this.columns = this.selectedColumns
                               .toArray();
        }
    }


    /**
     * This method is called when the user clicks on the customize table button.
     */
    protected customizeColumns(): void
    {
        const methodName = 'customizeColumns';
        this.log( methodName );
        this.crudTableColumnSelectorDialogComponent
            .selectedColumns = this.selectedColumns.toColumnArray();
        this.crudTableColumnSelectorDialogComponent
            .availableColumns = this.availableColumns.toColumnArray();
        this.crudTableColumnSelectorDialogComponent
            .displayDialog = true;
    }

    /**
     * This method is called when the use has clicked the ok button on the customize column dialog.
     */
    protected columnsCustomized(): void
    {
        const methodName = 'columnsCustomized';
        this.log( methodName + ' selectedColumns ' + JSON.stringify( this.crudTableColumnSelectorDialogComponent
                                                                         .selectedColumns ));
        this.log( methodName + ' availableColumns ' + JSON.stringify( this.crudTableColumnSelectorDialogComponent
                                                                          .availableColumns ));
        this.selectedColumns = new CrudTableColumns( this.crudTableColumnSelectorDialogComponent
                                                         .selectedColumns );
        this.availableColumns = new CrudTableColumns( this.crudTableColumnSelectorDialogComponent
                                                          .availableColumns );
        /*
         * save the results as cookies for now.  Later, we'll allow the user to add a name and store different
         * column settings and we'll store it in the DB so the user doesn't have to redefine.
         */
        this.cookieService
            .set( this.selectedColumnsCookieName, JSON.stringify( this.selectedColumns ));
        this.cookieService
            .set( this.availableColumnsCookieName, JSON.stringify( this.availableColumns ));
        this.columns = this.selectedColumns
                           .toArray();
    }

    /**
     * Set the model object factory.
     * @param {ModelObjectFactory<any>} modelObjectFactory
     */
    public set modelObjectFactory( modelObjectFactory: ModelObjectFactory<any> )
    {
        const methodName = 'setModelObjectFactory';
        this.log( methodName )
        this._modelObjectFactory = modelObjectFactory;
        this.loadColumns();
    }

    /**
     * Set crud controller.
     * @param {CrudController<any>} crudController
     */
    public set crudController( crudController: CrudController<any> )
    {
        const methodName = 'setCrudController';
        this.log( methodName )
        this._crudController = crudController;
        /*
         * Subscribe to customize button click
         */
        this.addSubscription( 'subscribeToCustomizeButtonClickedEvent',
                              this._crudController
                                  .subscribeToCustomizeButtonClickedEvent( () => this.customizeColumns() ) );
    }
}
