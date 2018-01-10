/**
 * This is the base class for CRUD enabled tables.
 *
 * Created by mike on 12/8/2016.
 */

import { ModelObject } from "../../../model/entity/modelobject";
import { BaseCrudComponent } from "../common/base-crud.component";
import { OnInit, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudModelObjectEditMode } from "../common/crud-model-object-edit-mode";
import { CrudServiceContainer } from "../common/crud-service-container";
import { CrudOperation } from "../common/crud-operation";
import { isNullOrUndefined } from "util";
import { ModelObjectChangeEvent } from "../../../service/crud/model-object-change.event";
import { DataTable, LazyLoadEvent } from "primeng/primeng";
import { PaginationPage } from "../../../common/pagination";

/**
 * This is the base class for CRUD enabled tables.
 * <T> Defines the model object that is displayed within the table.
 *
 * Created by mike on 12/8/2016.
 */
export abstract class CrudTableComponent<T extends ModelObject<T>> extends BaseCrudComponent<T> implements OnInit
{
    /**
     * Defines how a model object is presented to the user either by a dialog or a panel.
     */
    //protected modelObjectEditMode: CrudModelObjectEditMode = CrudModelObjectEditMode.DIALOG;
    /**
     * The list of model objects displayed.
     * @type {Array}
     */
    protected rows: Array<T> = [];
    /**
     * totalRows is used to tell the paginator how many total rows are in the database so that it can accurately display
     * the page selection list and other pagination information.
     */
    protected totalRows: number;
    /**
     * This is a reference to the object in the table that is selected.  It is not the same object as the model object
     * and this variable must be separate from this.modelObject.
     */
    protected selectedModelObject: T;
    /**
     * This is true when the table is loading and false otherwise.
     * @type {boolean}
     */
    protected loading: boolean = false;
    /**
     * The last page load event
     */
    protected lastLoadEvent: LazyLoadEvent;

    @ViewChild(DataTable)
    protected dataTable: DataTable;

    constructor( protected lazyLoading: boolean,
                 protected toaster: ToastsManager,
                 protected crudServiceContainer: CrudServiceContainer<T> )
    {
        super( toaster );
        if ( !this.crudServiceContainer.modelObjectChangeService )
        {
            throw new Error( "modelObjectChangeService argument cannot be null" );
        }
        if ( !this.crudServiceContainer.modelObjectFactory )
        {
            throw new Error( "modelObjectFactory argument cannot be null" );
        }
        if ( !this.crudServiceContainer.crudRestService )
        {
            throw new Error( "crudRestService argument cannot be null" );
        }
        if ( !this.crudServiceContainer.crudFormService )
        {
            throw new Error( "crudFormService argument cannot be null" );
        }
        if ( !this.crudServiceContainer.crudFormButtonsService )
        {
            throw new Error( "crudFormButtonsService argument cannot be null" );
        }
        if ( !this.crudServiceContainer.crudTableService )
        {
            throw new Error( "crudTableService argument cannot be null" );
        }
    }

    /**
     * Initialize the table, subscribe to form and button events, and call the loadTable method
     */
    public ngOnInit()
    {
        this.debug( "ngOnInit.begin" );
        if ( this.crudServiceContainer.crudPanelService == null )
        {
            throw new Error( "crudPanelService cannot be null" );
        }
        this.subscribeToCrudFormButtonEvents();
        this.subscribeToCrudTableButtonEvents();
        this.subscribeToModelObjectChangeEvents();
        /*
         * Create a new object instance as it will most likely be nulled by subscribing to events
         */
        this.modelObject = this.crudServiceContainer.modelObjectFactory.newModelObject();
        if ( !this.lazyLoading )
        {
            this.loading = true;
            this.loadTable();
        }
        this.debug( "ngOnInit.end" );
    }

    /**
     * This event is triggered by the DataTable containing the stocks to request the load of a new page of stocks
     * @param event
     */
    protected lazyLoadTable( event: LazyLoadEvent ): void
    {
        this.debug( 'lazyLoadTable.begin' );
        this.crudServiceContainer
            .crudRestService
            .getPage( this.modelObject, event.first, event.rows )
            .subscribe( page =>
                        {
                            this.loading = false;
                            this.onPageLoad( page );
                            this.debug( 'lazyLoadTable.end' );
                        },
                        err =>
                        {
                            // Log errors if any
                            this.loading = false;
                            this.reportRestError( err );
                        } );
        this.lastLoadEvent = event;
    }

    /**
     * A new stock page has been received
     * @param stocksPage
     */
    protected onPageLoad( page: PaginationPage<T> ): void
    {
        this.debug( "onPageLoad.begin totalElements: " + page.totalElements +
                    " totalPages: " + page.totalPages );
        this.totalRows = page.totalElements;
        var rows: T[] = this.crudServiceContainer
                            .modelObjectFactory
                            .newModelObjectArray( page.content );
        this.onTableLoad( rows );
        this.debug( 'onPageLoad.end: totalElements: ' + this.rows.length );
    }

    /**
     * This method is called when the refresh button is clicked.
     * By default, it simply calls the {@code loadTable} method.
     */
    public refreshTable(): void
    {
        this.debug( "refreshTable.begin" );
        /*
         * Need to clear out any values for the model object or the table might be filtered based on its contents
         */
        this.setModelObject( this.crudServiceContainer.modelObjectFactory.newModelObject() );
        this.selectedModelObject = null;
        if ( this.lazyLoading )
        {
            this.lazyLoadTable( this.lastLoadEvent );
        }
        else
        {
            this.loadTable();
        }
        this.crudServiceContainer
            .crudTableService
            .sendTableSelectionChangeEvent( this.selectedModelObject );
        this.debug( "refreshTable.end" );
    }

    protected getRowsPerPage(): number
    {
        return 20;
    }

    /**
     * This method is called from {@code ngOnInit} and can be overridden by subclasses to load the table with the
     * model objects.
     */
    protected loadTable(): void
    {
        this.debug( "loadTable.begin" );
        if ( this.lazyLoading )
        {
            this.debug( "loadTable lazyLoading=true" );
            //this.lastLoadEvent.first = 0;
            //this.lastLoadEvent = this.getRowsPerPage();
            this.lazyLoadTable( this.lastLoadEvent );
        }
        else
        {
            this.loading = true;
            this.crudServiceContainer
                .crudRestService
                .getModelObjectList( this.modelObject )
                .subscribe( ( modelObjects: T[] ) =>
                            {
                                this.loading = false;
                                this.onTableLoad( modelObjects );
                                this.debug( "loadTable.end" );
                            },
                            error =>
                            {
                                this.loading = false;
                                this.reportRestError( error );
                            } );

        }
    }

    /**
     * This method is called after the modelObjects have been retrieved from the database
     * @param {T[]} modelObjects
     */
    protected onTableLoad( modelObjects: T[] ): void
    {
        this.debug( "onTableLoad.begin" );
        if ( !isNullOrUndefined( modelObjects ) && modelObjects.length > 0 )
        {
            this.rows = modelObjects;
            this.debug( "loaded " + this.rows.length + " rows" );
        }
        else
        {
            this.rows = [];
            this.debug( "loaded 0 rows" );
        }
        this.debug( "onTableLoad.end" );
    }

    /**
     * This method will subscribe to events generated by the parent {@code CrudTableComponent}
     * to the injected {@code CrudFormButtonsService}
     */
    protected subscribeToCrudFormButtonEvents(): void
    {
        this.addSubscription(
            this.crudServiceContainer
                .crudFormButtonsService
                .subscribeToSaveButtonClickCompletedEvent(
                    ( modelObject: T ) => this.onUserModifiedModelObject( modelObject ) ) );
        this.addSubscription(
            this.crudServiceContainer
                .crudFormButtonsService
                .subscribeToAddButtonClickCompletedEvent(
                    ( modelObject: T ) => this.onUserCreatedModelObject( modelObject ) ) );
        this.addSubscription(
            this.crudServiceContainer
                .crudFormButtonsService
                .subscribeToDeleteButtonClickCompletedEvent(
                    ( modelObject: T ) => this.onUserDeletedModelObject( modelObject ) ) );
    }

    /**
     * Subscribe to actions from the CRUD table buttons
     */
    protected subscribeToCrudTableButtonEvents(): void
    {
        this.addSubscription(
            this.crudServiceContainer
                .crudTableButtonsService
                .subscribeToAddButtonClickedEvent( ( modelObject: T ) => this.showFormToAdd( modelObject ) ) );
        this.addSubscription(
            this.crudServiceContainer
                .crudTableButtonsService
                .subscribeToEditButtonClickedEvent( ( modelObject: T ) => this.showFormToEdit( modelObject ) ) );
        this.addSubscription(
            this.crudServiceContainer
                .crudTableButtonsService
                .subscribeToDeleteButtonClickedEvent( ( modelObject: T ) => this.showFormToDelete( modelObject ) ) );
        this.addSubscription( this.crudServiceContainer
                                  .crudTableButtonsService
                                  .subscribeToRefreshButtonClickedEvent( ( modelObject: T ) => this.refreshTable() ) );
    }

    /**
     * Creates a new model object by calling the model object factory to create the model object.
     * This method is called when the user has clicked the add button.
     * @return {T}
     */
    protected newModelObject(): T
    {
        return this.crudServiceContainer.modelObjectFactory.newModelObject();
    }

    /**
     * Converts an event object into a model object.  The event object is just a JSON structure not a full class object
     * instance.
     * @param event
     * @return {T}
     */
    protected newModelObjectFromEvent( event ): T
    {
        if ( event.data )
        {
            return this.crudServiceContainer.modelObjectFactory.newModelObjectFromJSON( event.data );
        }
        else
        {
            return this.crudServiceContainer.modelObjectFactory.newModelObjectFromJSON( event );
        }
    }

    /**
     * This method is called when the user clicks on the add button.
     * A dialog will be displayed to allow the user to add a new model object.
     */
    protected showFormToAdd( modelObject: T ): void
    {
        this.debug( "showFormToAdd" );
        this.setModelObject( modelObject );
        this.setCrudOperation( CrudOperation.CREATE );
        this.displayModelObject();
    }

    /**
     * This method is called when the user clicks on the Edit button or double clicks on a row in the table.
     * A dialog will be displayed to allow the user to edit the selected model object.
     * @param modelObject
     */
    protected showFormToEdit( modelObject: T ): void
    {
        this.debug( "showFormToEdit " + JSON.stringify( modelObject ) );
        if ( !isNullOrUndefined( modelObject ) )
        {
            this.debug( "showFormToEdit" );
            this.setCrudOperation( CrudOperation.UPDATE );
            this.setModelObject( modelObject );
            this.displayModelObject();
        }
    }

    /**
     * This method is called when the user wants to delete a modelObject.
     * @param modelObject
     */
    protected showFormToDelete( modelObject: T ): void
    {
        this.debug( "showFormToDelete " + JSON.stringify( modelObject ) );
        if ( !isNullOrUndefined( modelObject ) )
        {
            this.debug( "showFormToDelete" );
            this.setCrudOperation( CrudOperation.DELETE );
            this.setModelObject( modelObject );
            this.displayModelObject();
        }
    }

    /**
     * Base on whether the model object is displayed in a form on a panel or a dialog,
     * it will perform the necessary work to display the model object to the user.
     */
    protected displayModelObject(): void
    {
        this.debug( "displayModelObject: " + JSON.stringify( this.modelObject ) );
        /*
         * if the user is modifying the model object, we need to check that they have the latest version of the data.
         */
        if ( this.isCrudUpdateOperation() )
        {
            this.checkModelObjectVersion();
        }
        this.crudServiceContainer
            .crudPanelService
            .sendDisplayFormRequestEvent( this.modelObject, this.crudOperation );
    }

    /**
     * Need to make sure that the model object that the user wants to update is the most current version.
     * Get the current model object and determine if they are different.  If so, then update the table
     * and update the form.
     *
     * This is an asynchronous call.
     */
    protected checkModelObjectVersion()
    {
        this.debug( "checkModelObjectVersion.begin" );
        this.crudServiceContainer.crudRestService
            .getModelObject( this.modelObject )
            .subscribe( modelObject => {
                            this.log( "Checking model object version: " + JSON.stringify( modelObject ) );
                            if ( this.modelObject.isDifferentVersion( modelObject ) )
                            {
                                this.log( "The version is different. Updating table and form" );
                                let index = this.indexOf( modelObject );
                                /*
                                 * Update the table
                                 */
                                this.updateModelObjectTableRow( index, modelObject );
                                /*
                                 * notify the form of the change.
                                 */
                                this.crudServiceContainer
                                    .crudFormService
                                    .sendFormModelObjectVersionUpdateEvent( modelObject );
                            }
                            this.debug( "checkModelObjectVersion.end" );
                        },
                        error => {
                            this.reportRestError( error );
                        } );
    }

    /**
     * This method is called when the user has completed editing a model object.  The model object in the table
     * will be updated with the new values from {@code modelObject}.
     *
     * @param modelObject
     */
    protected onUserModifiedModelObject( modelObject: T ): void
    {
        this.debug( 'onUserModifiedModelObject ' + JSON.stringify( modelObject ) );
        this.setModelObject( modelObject );
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.selectedModelObject = modelObject;
            this.updateModelObjectInTable( modelObject, true );
            this.crudServiceContainer
                .crudTableService
                .sendTableContentChangeEvent();
            this.crudServiceContainer
                .crudTableService
                .sendTableRowUpdatedChangeEvent( this.modelObject );
        }
        this.setModelObject( modelObject );
    }

    /**
     * This method will find the model object in the table and update it contents of the model if found.
     * @param {T} modelObject
     * @param {boolean} addIfNotFound When true, if the model object is not found in the table it will be added to the
     *        table.
     */
    protected updateModelObjectInTable( modelObject: T, addIfNotFound: boolean )
    {
        var index = this.indexOf( modelObject );
        if ( index == -1 )
        {
            if ( addIfNotFound )
            {
                this.addModelObjectToTable( modelObject );
            }
        }
        else
        {
            this.updateModelObjectTableRow( index, modelObject );
        }
    }

    /**
     * This method is called when the user has created a new model object that needs to be added to the table.
     */
    protected onUserCreatedModelObject( modelObject: T ): void
    {
        this.debug( 'onUserCreatedModelObject ' + JSON.stringify( modelObject ) );
        //this.setModelObject( modelObject );
        if ( !isNullOrUndefined( modelObject ) )
        {
            this.addModelObjectToTable( modelObject );
            this.crudServiceContainer
                .crudTableService
                .sendTableContentChangeEvent();
            this.crudServiceContainer
                .crudTableService
                .sendTableRowAddedChangeEvent( modelObject );
        }
    }

    /**
     * Adds rows to the table
     * @param {T[]} newRows
     */
    protected addRows( newRows: T[] ): void
    {
        this.debug( "addRows" );
        this.rows = [...newRows, ...this.rows];
    }

    /**
     * This method is called when a model object is added to the table.  This happens when a user adds a new
     * entry to the table.
     * @param {T} modelObject The model object to be added to the table.
     */
    protected addModelObjectToTable( modelObject: T ): void
    {
        this.debug( "addModelObjectToTable " + JSON.stringify( this.modelObject ) );
        /*
         * A new array must be created to trigger a change event
         */
        this.rows = [modelObject, ...this.rows];
    }

    /**
     * Updates the model object in the table.  This method calles {@code updateModelObjectTableRow( index, modelObject )}
     * after determining the row of the model object.
     * @param {T} modelObject
     * @param {Error} errorBack is a callback function that will be called when the model object cannot be found in table
     */
    protected updateModelObjectRow( modelObject: T, errorBack?: ( Error ) => any )
    {
        this.debug( 'updateModelObjectTableRow' + JSON.stringify( modelObject ) );
        let rowIndex = this.indexOf( modelObject );
        if ( rowIndex == -1 )
        {
            errorBack(
                new RangeError( "row was not found for model object key: " + JSON.stringify( this.modelObject ) ) );
        }
        else
        {
            this.updateModelObjectTableRow( rowIndex, modelObject );
        }
    }

    /**
     * This method is called when a user updates the model object and the table needs to be updated to reflect the
     * user's changes.
     * @param {number} rowIndex
     * @param {T} modelObject
     */
    protected updateModelObjectTableRow( rowIndex: number, modelObject: T ): void
    {
        this.debug( 'updateModelObjectTableRow index: ' + rowIndex + " " + JSON.stringify( modelObject ) );
        this.rows[rowIndex] = modelObject;
        /*
         * A new array must be created to trigger a change event
         */
        this.rows = [...this.rows]
    }

    /**
     * this method is called when the user clicks on the Delete button on the stock form.
     */
    protected onUserDeletedModelObject( modelObject: T ): void
    {
        this.debug( 'onUserDeletedModelObject' + JSON.stringify( modelObject ) );
        //this.setModelObject( modelObject );
        if ( !isNullOrUndefined( modelObject ) )
        {
            this.removeModelObjectFromTable( modelObject );
            this.crudServiceContainer
                .crudTableService
                .sendTableContentChangeEvent();
            this.crudServiceContainer
                .crudTableService
                .sendTableRowDeletedChangeEvent( modelObject );
        }
    }

    /**
     * This method removes the modelObject from the table if it is found
     * @param {T} modelObject
     * @return true if the modelObject was found and removed.  returns false otherwise.
     */
    protected removeModelObjectFromTable( modelObject: T ): boolean
    {
        this.debug( "removeModelObjectFromTable " + JSON.stringify( this.modelObject ) );
        var index = this.indexOf( modelObject );
        if ( index == -1 )
        {
            return false;
        }
        {
            /*
             * A new array must be created to trigger a change event
             */
            this.rows = this.rows.slice( index + 1 ).concat( this.rows.slice( 0, index ) );
            //this.setModelObject( null );
            return true;
        }
    }

    /**
     * this method is called when the user selects a row in the stock table
     * @param modelObject
     */
    protected onRowSelect( event ): void
    {
        this.debug( "onRowSelect " + JSON.stringify( event ) );
        if ( event.data )
        {
            this.selectedModelObject = event.data;
        }
        else
        {
            this.selectedModelObject = event;
        }
        this.setModelObject( this.newModelObjectFromEvent( event ) );
        this.crudServiceContainer
            .crudTableService
            .sendTableSelectionChangeEvent( this.modelObject );
        /*
         * If a panel is used to display the selected contents, then notify the panel
         */
        /*
        if ( this.modelObjectEditMode == CrudModelObjectEditMode.PANEL )
        {
            this.showFormToEdit( this.modelObject );
        }
        */
    }

    /**
     * This method is called when the user unselects the rows
     * @param event
     */
    protected onRowUnSelect( event ): void
    {
        this.debug( "onRowUnSelect " + JSON.stringify( event ) );
        this.setModelObject( this.newModelObjectFromEvent( event ) );
        this.crudServiceContainer
            .crudTableService
            .sendTableSelectionChangeEvent( null );
    }

    /**
     * This method is called when the user double clicks on a row in the table.
     * @param event
     */
    protected onRowDoubleClick( event ): void
    {
        var methodName = "onRowDoubleClick";
        this.debug( methodName + " " + JSON.stringify( event ) );
        this.setModelObject( this.newModelObjectFromEvent( event ) );
        this.showFormToEdit( this.modelObject );
    }

    /**
     * Determines the index of a model object in the rows array
     * @returns {number} -1 if not found
     */
    protected indexOf( targetModelObject: T ): number
    {
        if ( targetModelObject )
        {
            for ( var i = 0; i < this.rows.length; i++ )
            {
                var modelObject = this.rows[i];
                if ( targetModelObject.isEqualPrimaryKey( modelObject ) )
                {
                    return i;
                }
            }
        }
        return -1;
    }

    /**
     * Set the model object and notify the buttons of the model object change.
     * @param modelObject
     * @return {undefined}
     */
    public setModelObject( modelObject: T ): void
    {
        super.setModelObject( modelObject );
        this.crudServiceContainer
            .crudTableButtonsService
            .sendModelObjectChangedEvent( modelObject );
    }

    /**
     * Subscribe to model object changes.  The model objects displayed in this table could be modified by other
     * components.  When that occurs, this class will be notified.
     */
    protected subscribeToModelObjectChangeEvents()
    {
        this.debug( "subscribeToModelObjectChangeEvents" );
        this.crudServiceContainer
            .modelObjectChangeService
            .subscribeToModelObjectChangeEvent( ( modelObjectChangeEvent ) =>
                                                    this.onModelObjectChangeEvent( modelObjectChangeEvent ) );
    }

    /**
     * This method is called when a modelObject of type T is changed.  This method will determine if the event is
     * from itself or another component and if so, make any necessary changes.
     * @param {ModelObjectChangeEvent<T extends ModelObject<T>>} modelObjectChangeEvent
     */
    protected onModelObjectChangeEvent( modelObjectChangeEvent: ModelObjectChangeEvent<T> )
    {
        var methodName = "onModelObjectChangeEvent";
        this.debug( methodName + ".begin object: " + JSON.stringify( modelObjectChangeEvent.modelObject ) );
        this.debug( methodName + " sender: " + (<any>modelObjectChangeEvent.sender).constructor.name );
        /*
         * Ignore if generated form this component
         */
        if ( modelObjectChangeEvent.sender === this ||
            modelObjectChangeEvent.sender === this.crudServiceContainer.crudTableService )
        {
            this.debug( methodName + " received our own change...ignoring" );
        }
        else
        {
            switch ( modelObjectChangeEvent.crudOperation )
            {
                case CrudOperation.CREATE:
                    this.addModelObjectToTable( modelObjectChangeEvent.modelObject );
                    break;
                case CrudOperation.DELETE:
                    this.removeModelObjectFromTable( modelObjectChangeEvent.modelObject );
                    break;
                case CrudOperation.UPDATE:
                    this.updateModelObjectInTable( modelObjectChangeEvent.modelObject, false );
                    break;
            }
        }
        this.debug( methodName + ".end" );
    }

    /**
     * Truncates {@code notes} to the max length defined by the return value from {@code getNotesSize()} which defaults
     * to 250 chars.
     * @param {string} notes
     * @return {string}
     */
    protected truncateNotes( notes: string )
    {
        return notes == null ? "" : notes.substring( 0, Math.min( this.getNotesSize(), notes.length ) );
    }

    /**
     * Defines the max number of characters to display in a notes/comments field.
     * @return {number}
     */
    protected getNotesSize(): number
    {
        return 250;
    }
}
