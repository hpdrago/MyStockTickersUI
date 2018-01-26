import { CrudDialogService } from "../dialog/crud-dialog.service";
import { CrudFormService } from "../form/crud-form.service";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { CrudRestService } from "../../../service/crud/crud-rest.serivce";
import { ModelObject } from "../../../model/entity/modelobject";
import { CrudTableButtonsService } from "../table/crud-table-buttons.service";
import { CrudFormButtonsService } from "../form/crud-form-buttons.service";
import { CrudTableService } from "../table/crud-table.service";
import { CrudPanelService } from "../panel/crud-panel.service";
import { BaseClass } from "../../../common/base-class";
import { ToastsManager } from "ng2-toastr";
import { CrudStateStore } from "./crud-state-store";

/**
 * This is a container class for all of the CRUD services and the model object factory.
 * These classes comprise all of the necessary services for all of the CRUD components.
 */
export abstract class CrudServiceContainer<T extends ModelObject<T>> extends BaseClass
{
    private _crudPanelService: CrudPanelService<T>;
    private _crudDialogService: CrudDialogService<T>;
    private _crudStateStore: CrudStateStore<T>;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {ModelObjectChangeService<T extends ModelObject<T>>} _modelObjectChangeService
     * @param {ModelObjectFactory<T extends ModelObject<T>>} _modelObjectFactory
     * @param {CrudRestService<T extends ModelObject<T>>} _crudRestService
     * @param {CrudTableService<T extends ModelObject<T>>} _crudTableService
     * @param {CrudTableButtonsService<T extends ModelObject<T>>} _crudTableButtonsService
     * @param {CrudFormButtonsService<T extends ModelObject<T>>} _crudFormButtonsService
     * @param {CrudFormService<T extends ModelObject<T>>} _crudFormService
     */
    constructor( private _modelObjectFactory: ModelObjectFactory<T>,
                 private _crudRestService: CrudRestService<T>,
                 private _crudTableService?: CrudTableService<T>,
                 private _crudTableButtonsService?: CrudTableButtonsService<T>,
                 private _crudFormButtonsService?: CrudFormButtonsService<T>,
                 private _crudFormService?: CrudFormService<T> )
    {
        super();
        this._crudStateStore = new CrudStateStore<T>();
        if ( !_crudTableService )
        {
            this._crudTableService = new CrudTableService<T>( _modelObjectFactory, this._crudStateStore );
        }
        if ( !_crudTableButtonsService )
        {
            this._crudTableButtonsService = new CrudTableButtonsService<T>( _modelObjectFactory, this._crudStateStore );
        }
        if ( !_crudFormButtonsService )
        {
            this._crudFormButtonsService = new CrudFormButtonsService<T>( _modelObjectFactory, this._crudStateStore );
        }
        if ( !_crudFormService )
        {
            this._crudFormService = new CrudFormService<T>( _modelObjectFactory, this._crudStateStore );
        }
    }

    public get crudTableService(): CrudTableService<T>
    {
        return this._crudTableService;
    }

    public set crudTableService( crudTableService: CrudTableService<T> )
    {
        this._crudTableService = crudTableService;
    }

    public get crudTableButtonsService(): CrudTableButtonsService<T>
    {
        return this._crudTableButtonsService;
    }

    public set crudTableButtonsService( crudTableButtonsService: CrudTableButtonsService<T> )
    {
        this._crudTableButtonsService = crudTableButtonsService;
    }

    public get crudFormButtonsService(): CrudFormButtonsService<T>
    {
        return this._crudFormButtonsService;
    }

    public set crudFormButtonsService( crudFormButtonsService: CrudFormButtonsService<T> )
    {
        this._crudFormButtonsService = crudFormButtonsService;
    }

    public get crudDialogService(): CrudDialogService<T>
    {
        return this._crudDialogService;
    }

    public set crudDialogService( crudDialogService: CrudDialogService<T> )
    {
        this._crudDialogService = crudDialogService;
    }

    public get crudPanelService(): CrudPanelService<T>
    {
        return this._crudPanelService;
    }

    public set crudPanelService( crudPanelService: CrudPanelService<T> )
    {
        this._crudPanelService = crudPanelService;
    }

    public get crudFormService(): CrudFormService<T>
    {
        return this._crudFormService;
    }

    public set crudFormService( crudFormService: CrudFormService<T> )
    {
        this._crudFormService = crudFormService;
    }

    public get modelObjectFactory(): ModelObjectFactory<T>
    {
        return this._modelObjectFactory;
    }

    public set modelObjectFactory( modelObjectFactory: ModelObjectFactory<T> )
    {
        this._modelObjectFactory = modelObjectFactory;
    }

    public get crudRestService(): CrudRestService<T>
    {
        return this._crudRestService;
    }

    public set crudRestService( crudRestService: CrudRestService<T> )
    {
        this._crudRestService = crudRestService;
    }

    public get crudStateStore(): CrudStateStore<T>
    {
        return this._crudStateStore;
    }
}
