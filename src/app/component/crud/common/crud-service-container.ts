import { CrudDialogService } from "../dialog/crud-dialog.service";
import { CrudFormService } from "../form/crud-form.service";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { CrudRestService } from "../../../service/crud/crud-rest.serivce";
import { ModelObject } from "../../../model/entity/modelobject";
import { CrudTableButtonsService } from "../table/crud-table-buttons.service";
import { CrudFormButtonsService } from "../form/crud-form-buttons.service";
import { CrudTableService } from "../table/crud-table.service";
import { ModelObjectChangeService } from "../../../service/crud/model-object-change.service";

/**
 * This is a container class for all of the CRUD services and the model object factory.
 * These classes comprise all of the necessary services for all of the CRUD components.
 */
export abstract class CrudServiceContainer<T extends ModelObject<T>>
{
    constructor( private _modelObjectChangeService: ModelObjectChangeService<T>,
                 private _modelObjectFactory: ModelObjectFactory<T>,
                 private _crudRestService: CrudRestService<T>,
                 private _crudTableService?: CrudTableService<T>,
                 private _crudTableButtonsService?: CrudTableButtonsService<T>,
                 private _crudFormButtonsService?: CrudFormButtonsService<T>,
                 private _crudDialogService?: CrudDialogService<T>,
                 private _crudFormService?: CrudFormService<T>, )
    {
        if ( !_crudTableService )
        {
            this._crudTableService = new CrudTableService<T>( _modelObjectFactory,
                                                              _modelObjectChangeService );
        }
        if ( !_crudTableButtonsService )
        {
            this._crudTableButtonsService = new CrudTableButtonsService<T>( _modelObjectFactory );
        }
        if ( !_crudFormButtonsService )
        {
            this._crudFormButtonsService = new CrudFormButtonsService<T>( _modelObjectFactory );
        }
        if ( !_crudDialogService )
        {
            this._crudDialogService = new CrudDialogService<T>( _modelObjectFactory );
        }
        if ( !_crudFormService )
        {
            this._crudFormService = new CrudFormService<T>( _modelObjectFactory );
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

    public get modelObjectChangeService(): ModelObjectChangeService<T>
    {
        return this._modelObjectChangeService;
    }

    public set modelObjectChangeService( value: ModelObjectChangeService<T> )
    {
        this._modelObjectChangeService = value;
    }
}
