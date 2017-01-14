import { CrudPanelComponent } from "./crud-panel.component";
import { ModelObject } from "../../model/base-modelobject";
import { ToastsManager } from "ng2-toastr";
import { CrudDialogService } from "./crud-dialog.service";
import { Input } from "@angular/core";
import { CrudOperation } from "./crud-operation";
import { CrudFormService } from "./crud-form.service";
import { CrudPanelButtonsService } from "./crud-panel-buttons.service";
/**
 * This is the base class for Modal dialogs that provide CRUD operations on a model object.
 *
 * inputs: ['crudDialogService', 'crudFormService', 'crudPanelButtonsService', 'continuousAdd']
 *
 * Created by mike on 12/30/2016.
 */
export class CrudDialogComponent<T extends ModelObject<T>> extends CrudPanelComponent<T>
{
    /**
     * The CRUD dialog service is passed as an {@code Input} parameter from the parent container.
     */
    @Input()
    protected crudDialogService: CrudDialogService<T>;

    @Input()
    protected crudFormService: CrudFormService<T>;

    @Input()
    protected crudPanelButtonsService: CrudPanelButtonsService<T>;

    @Input()
    protected continuousAdd: boolean = false;

    /**
     * Controls the visibility of the dialog
     */
    protected displayDialog: boolean;

    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    public ngOnInit()
    {
        if ( !this.crudDialogService )
        {
            throw new Error( "crudDialogService has not been set by Input value" );
        }
        if ( !this.crudFormService )
        {
            throw new Error( "crudFormService has not been set by Input value" );
        }
        if ( !this.crudPanelButtonsService )
        {
            throw new Error( "crudPanelButtonsService has not been set by Input value" );
        }
        this.subscribeToCrudDialogServiceEvents();
    }

    /**
     * Subscribe to the events that will be initiated by the parent container.
     */
    protected subscribeToCrudDialogServiceEvents()
    {
        this.crudDialogService.handleCloseButtonClicked().subscribe( () => this.onCloseButtonClick() );
        this.crudDialogService.handleDisplayDialogRequest().subscribe( () => this.setDisplayDialog( true ) );
        this.crudDialogService.handleCrudOperationChanged().subscribe(
            (crudOperation: CrudOperation) => this.crudOperationChanged( crudOperation ) );
        this.crudDialogService.handleModelObjectChanged().subscribe( (modelObject: T) => this.modelObjectChanged( modelObject ));
        this.crudPanelButtonsService.handleAddButtonClicked().subscribe( ( modelObject ) => this.onAddButtonClicked( modelObject ) )
        this.crudPanelButtonsService.handleDeleteButtonClicked().subscribe( ( modelObject ) => this.onDeleteButtonClicked( modelObject ) )
    }

    /**
     * Set the display dialog flag which will hide or display the dialog.
     *
     * @param displayDialog
     */
    protected setDisplayDialog( displayDialog: boolean ): void
    {
        this.logger.debug( "setDisplayDialog " + displayDialog );
        this.displayDialog = displayDialog;
    }

    /**
     * This method is called when the Close button is clicked.
     * It will close the dialog and emit a {@code closeButtonClick} event
     */
    protected onCloseButtonClick(): void
    {
        this.logger.debug( "onCloseButtonClick" );
        this.displayDialog = false;
    }

    /**
     * This method is called when the Add button (labeled "Save") is clicked.
     *
     * @param modelObject
     */
    protected onAddButtonClicked( modelObject: T )
    {
        this.logger.debug( "onAddButtonClick " + JSON.stringify( modelObject ) );
        if ( !this.isContinuousAdd() )
        {
            this.onCloseButtonClick();
        }
    }

    private onDeleteButtonClicked( modelObject: T )
    {
        this.logger.debug( "onDeleteButtonClick " + JSON.stringify( modelObject ) );
        this.displayDialog = false;
    }

    /**
     * Determines if the form is reset and the user is allowed to continuously add model objects.
     * @return {boolean} if false, the dialog is closed after the model object has been added.
     */
    protected isContinuousAdd()
    {
        return this.continuousAdd;
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     */
    protected getDuplicateKeyErrorMessage(): string
    {
        return "This entry already exists";
    }
}
