import { BaseCrudComponent } from '../common/base-crud.component';
import { ModelObject } from '../../../model/entity/modelobject';
import { ToastsManager } from 'ng2-toastr';
import { CrudStateStore } from '../common/crud-state-store';
import { CrudController } from '../common/crud-controller';
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';

/**
 * This is the base class for crud operation buttons.
 */
export abstract class CrudTableButtonComponent<T extends ModelObject<T>> extends BaseCrudComponent<T>
{
    private _selectedModelObject: T;
    private _showButton: boolean = true;
    private _buttonDisabled: boolean = false;
    private _buttonClass: string;
    private _buttonIcon: string;
    private _buttonLabel: string;

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
               crudRestService );
    }

    public ngOnInit()
    {
        super.ngOnInit();
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
        this.crudController
            .subscribeToTableSelectionChangeEvent( ( modelObject: T ) =>
                                                   {
                                                       this.handleTableSelectionChangeEvent( modelObject );
                                                   });

    }

    /**
     * This method is called when the number of model objects that were selected changes.
     * @param {[T]} modelObjects
     */
    private handleTableSelectionChangeEvent( modelObject: T )
    {
        this.debug( "handleTableSelectionChangeEvent modelObject: " + JSON.stringify( modelObject ));
        this._selectedModelObject = modelObject;
    }

    /**
     * Defines the CSS class for the button
     * @return {string}
     */
    protected getButtonClass(): string
    {
        return "crud-table-button";
    }

    /**
     * This method is called when the button is clicked.
     */
    protected abstract onButtonClick(): void;

    public get selectedModelObject(): T
    {
        return this._selectedModelObject;
    }

    public set selectedModelObject( value: T )
    {
        this._selectedModelObject = value;
    }

    public get showButton(): boolean
    {
        return this._showButton;
    }

    public set showButton( value: boolean )
    {
        this._showButton = value;
    }

    public get buttonDisabled(): boolean
    {
        return this._buttonDisabled;
    }

    public set buttonDisabled( value: boolean )
    {
        this._buttonDisabled = value;
    }

    public get buttonClass(): string
    {
        return this._buttonClass;
    }

    public set buttonClass( value: string )
    {
        this._buttonClass = value;
    }

    public get buttonIcon(): string
    {
        return this._buttonIcon;
    }

    public set buttonIcon( value: string )
    {
        this._buttonIcon = value;
    }

    public get buttonLabel(): string
    {
        return this._buttonLabel;
    }

    public set buttonLabel( value: string )
    {
        this._buttonLabel = value;
    }
}
