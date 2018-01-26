import { ToastsManager } from "ng2-toastr";
import { ViewChild } from "@angular/core";
import { ModelObject } from "../../../model/entity/modelobject";
import { CrudTableRefreshButtonComponent } from './crud-table-refresh-button.component';
import { CrudTableAddButtonComponent } from './crud-table-add-button.component';
import { CrudTableEditButtonComponent } from './crud-table-edit-button.component';
import { CrudTableDeleteButtonComponent } from './crud-table-delete-button.component';
import { BaseCrudComponent } from '../common/base-crud.component';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudController } from '../common/crud-controller';
import { CrudStateStore } from '../common/crud-state-store';

/**
 * This is the base component class for the buttons on all CRUD enabled tables.
 * Four buttons are managed:
 *   - Delete button
 *   - Add button
 *   - Edit button
 *   - Refresh button
 *
 * Created by mike on 1/2/2017.
 */
export abstract class CrudTableButtonsComponent<T extends ModelObject<T>> extends BaseCrudComponent<T>
{
    @ViewChild(CrudTableRefreshButtonComponent)
    private _refreshButton: CrudTableRefreshButtonComponent<T>;

    @ViewChild(CrudTableAddButtonComponent)
    private _addButton: CrudTableAddButtonComponent<T>;

    @ViewChild(CrudTableEditButtonComponent)
    private _editButton: CrudTableEditButtonComponent<T>;

    @ViewChild(CrudTableDeleteButtonComponent)
    private _deleteButton: CrudTableDeleteButtonComponent<T>;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {CrudController<T extends ModelObject<T>>} crudController
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudRestService<T extends ModelObject<T>>} crudRestService
     */
    constructor( protected toaster: ToastsManager,
                 protected crudStateStore: CrudStateStore<T>,
                 protected crudController: CrudController<T>,
                 protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudRestService: CrudRestService<T> )
    {
        super( toaster,
               crudStateStore,
               crudController,
               modelObjectFactory,
               crudRestService )
    }

    protected get refreshButton(): CrudTableRefreshButtonComponent<T>
    {
        return this._refreshButton;
    }

    protected get addButton(): CrudTableAddButtonComponent<T>
    {
        return this._addButton;
    }

    protected get editButton(): CrudTableEditButtonComponent<T>
    {
        return this._editButton;
    }

    protected get deleteButton(): CrudTableDeleteButtonComponent<T>
    {
        return this._deleteButton;
    }

}
