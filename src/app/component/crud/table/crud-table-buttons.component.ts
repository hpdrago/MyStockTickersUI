import { ToastsManager } from "ng2-toastr";
import { CrudServiceContainer } from "../common/crud-service-container";
import { Component } from "@angular/core";
import { ModelObject } from "../../../model/entity/modelobject";
import { BaseCrudComponent } from "../common/base-crud.component";
import { isNullOrUndefined } from "util";

/**
 * This is the base component class for the buttons on all CRUD enabled tables
 *
 * inputs: ['crudTableButtonsService']
 *
 * Created by mike on 1/2/2017.
 */
@Component({
               selector:    'crud-table-buttons',
               styleUrls:   ['./crud-table-buttons.component.css'],
               templateUrl: './crud-table-buttons.component.html'
           })
export abstract class CrudTableButtonsComponent<T extends ModelObject<T>> extends BaseCrudComponent<T>
{
    constructor( protected toaster: ToastsManager,
                 protected crudServiceContainer: CrudServiceContainer<T> )
    {
        super( toaster );
        this.subscribeToCrudTableEvents()
    }

    /**
     * Subscribe to table row selection events
     */
    private subscribeToCrudTableEvents()
    {
        this.debug( "subscribeToCrudTableEvents" );
        /*
         * We need to know when the table selections change so that we can enable/disable buttons
         */
        this.crudServiceContainer.crudTableService
            .subscribeToTableSelectionChangeEvent( ( modelObject: T ) =>
                                                   {
                                                       this.handleTableSelectionChangeEvent( modelObject );
                                                   });

    }

    /**
     * This method is called when the number of model objects that were selected changes.
     * @param {[T]} selectedModelObjects
     */
    private handleTableSelectionChangeEvent( selectedModelObject: T )
    {
        this.debug( "handleTableSelectionChangeEvent modelObject: " + JSON.stringify( selectedModelObject ));
        this.modelObject = selectedModelObject;
    }

    public ngOnInit()
    {
        this.debug( "ngOnInit.begin" );
        if ( !this.crudServiceContainer.crudTableButtonsService )
        {
            throw new Error( "crudTableButtonsService has not been set by Input value" );
        }
        this.crudServiceContainer
            .crudTableButtonsService
            .subscribeToModelObjectChangedEvent(( modelObject: T) => this.modelObjectChanged( modelObject ) );
        this.debug( "ngOnInit.end" );
    }

    /**
     * Returns the default Add button label
     * @return {string}
     */
    protected getAddButtonLabel(): string
    {
        return "Add";
    }

    /**
     * Determines if the add button should be shown.
     * @return {boolean} true by default
     */
    protected isShowAddButton(): boolean
    {
        return true;
    }

    /**
     * Determines if the Add button should be disabled.
     * It should be disabled when no portfolio is selected
     * @returns {boolean}
     */
    protected isAddButtonDisabled(): boolean
    {
        return false;
    }

    /**
     * This method is called when the Add button is clicked.
     * It will notify the button service that the button was clicked.
     */
    protected onAddButtonClick(): void
    {
        this.debug( "onAddButtonClick " );
        this.crudServiceContainer
            .crudTableButtonsService
            .sendAddButtonClickedEvent();
    }

    /**
     * Returns the default Delete button label
     * @return {string}
     */
    protected getDeleteButtonLabel(): string
    {
        return "Delete";
    }

    /**
     * Determines if the add button should be shown.
     * @return {boolean} true by default
     */
    protected isShowDeleteButton(): boolean
    {
        return true;
    }

    /**
     * Determines if the Delete button should be disabled.
     * It should be disabled when no portfolio is selected
     * @returns {boolean}
     */
    protected isDeleteButtonDisabled(): boolean
    {
        return isNullOrUndefined( this.modelObject );
    }

    /**
     * This method is called when the Delete button is clicked.
     * It will notify the button service that the button was clicked.
     */
    protected onDeleteButtonClick(): void
    {
        this.debug( "onDeleteButtonClick " + JSON.stringify( this.modelObject ));
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.crudServiceContainer
                .crudTableButtonsService.sendDeleteButtonClickedEvent( this.modelObject );
        }
    }

    /**
     * Defines the CSS class for the Add button
     * @return {string}
     */
    protected getAddButtonClass(): string
    {
        return "crud-table-button";
    }

    /**
     * Defines the CSS class for the Delete button
     * @return {string}
     */
    protected getDeleteButtonClass(): string
    {
        return "crud-table-button";
    }

    /**
     * Defines the icon to be used for the Add button
     * @return {string} defaults to fa-plus
     */
    protected getAddButtonIcon(): string
    {
        return "fa-plus";
    }

    /**
     * Defines the icon to be used for the Delete button
     * @return {string} defaults to fa-trash
     */
    protected getDeleteButtonIcon(): string
    {
        return "fa-trash";
    }
}
