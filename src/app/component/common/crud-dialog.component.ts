import { ModelObject } from "../../model/class/modelobject";
import { ToastsManager } from "ng2-toastr";
import { CrudDialogService } from "./crud-dialog.service";
import { CrudOperation } from "./crud-operation";
import { CrudFormService } from "./crud-form.service";
import { CrudFormButtonsService } from "./crud-form-buttons.service";
import { BaseCrudComponent } from "./base-crud.component";
import { DisplayDialogRequestSubjectInfo } from "./display-dialog-request-subject-info";

/**
 * This is the base class for Modal dialogs that provide CRUD operations on a model object.
 *
 * Created by mike on 12/30/2016.
 */
export class CrudDialogComponent<T extends ModelObject<T>> extends BaseCrudComponent<T>
{
    /**
     * Controls the visibility of the dialog
     */
    protected displayDialog: boolean;

    constructor( protected toaster: ToastsManager,
                 protected crudDialogService: CrudDialogService<T>,
                 protected crudFormService: CrudFormService<T>,
                 protected crudFormButtonsService: CrudFormButtonsService<T>,
                 protected continuousAdd ?: boolean )
    {
        super( toaster );
        if ( !this.crudDialogService )
        {
            throw new Error( "crudDialogService argument cannot be null" );
        }
        if ( !this.crudFormService )
        {
            throw new Error( "crudFormService argument cannot be null" );
        }
        if ( !this.crudFormButtonsService )
        {
            throw new Error( "crudFormButtonsService argument cannot be null" );
        }
    }

    public ngOnInit()
    {
        this.log( "ngOnInit.begin" );
        this.subscribeToCrudDialogServiceEvents();
        this.crudFormService.subscribeToComponentInitializedEvent().subscribe( ()=> this.formInitialized() );
        this.crudFormButtonsService.subscribeToComponentInitializedEvent().subscribe( ()=> this.formButtonsInitialized() );
        // Tell everyone that we are done
        this.crudDialogService.sendComponentInitializedEvent();
        this.log( "ngOnInit.end" );
    }

    /**
     * This method is called when the dialog receives notification that the form has completed initializing.
     * We will then send the model object and crud operation back to the form that we have received previously via
     * the display dialog event.
     */
    private formInitialized()
    {
        this.debug( "formInitialized sending model object and crud operation to form" );
        this.crudFormService.sendCrudOperationChangedEvent( this.crudOperation );
        this.crudFormService.sendModelObjectChangedEvent( this.modelObject );
    }

    /**
     * This method is called when the dialog receives notification that the form buttons has completed initializing.
     * We will then send the model object and crud operation back to the form that we have received previously via
     * the display dialog event.
     */
    private formButtonsInitialized()
    {
        this.debug( "formButtonsInitialized sending model object and crud operation to form buttons" );
        this.crudFormButtonsService.sendCrudOperationChangedEvent( this.crudOperation );
        this.crudFormButtonsService.sendModelObjectChangedEvent( this.modelObject );
    }

    /**
     * Subscribe to the events that will be initiated by the parent container.
     */
    protected subscribeToCrudDialogServiceEvents()
    {
        this.log( "subscribeToCrudDialogServiceEvents.begin" );
        this.crudDialogService.subscribeToCloseButtonClickedEvent().subscribe( () => this.onCloseButtonClick() );
        this.crudDialogService.subscribeToDisplayDialogRequestEvent().subscribe( ( subjectInfo: DisplayDialogRequestSubjectInfo ) => this.setDisplayDialog( subjectInfo ) );
        this.crudDialogService.subscribeToCrudOperationChangeEvent().subscribe(
            (crudOperation: CrudOperation) => this.crudOperationChanged( crudOperation ) );
        this.crudDialogService.subscribeToModelObjectChangedEvent().subscribe( ( modelObject: T) => this.modelObjectChanged( modelObject ));
        this.crudFormButtonsService.subscribeToAddButtonClickedEvent().subscribe( ( modelObject ) => this.onAddButtonClicked( modelObject ) )
        this.crudFormButtonsService.subscribeToHandleDeleteButtonClickedEvent().subscribe( ( modelObject ) => this.onDeleteButtonClicked( modelObject ) )
        this.log( "subscribeToCrudDialogServiceEvents.end" );
    }

    /**
     * Set the display dialog flag which will hide or display the dialog.
     *
     * @param displayDialog
     */
    protected setDisplayDialog( subjectInfo: DisplayDialogRequestSubjectInfo ): void
    {
        this.debug( "setDisplayDialog " + JSON.stringify( subjectInfo ) );
        this.setModelObject( subjectInfo.modelObject );
        this.setCrudOperation( subjectInfo.crudOperation );
        this.displayDialog = true;
    }

    /**
     * This method is called when the Close button is clicked.
     * It will close the dialog and emit a {@code closeButtonClick} event
     */
    protected onCloseButtonClick(): void
    {
        this.debug( "onCloseButtonClick" );
        this.displayDialog = false;
    }

    /**
     * This method is called when the Add button (labeled "Save") is clicked.
     *
     * @param modelObject
     */
    protected onAddButtonClicked( modelObject: T )
    {
        this.debug( "onAddButtonClick " + JSON.stringify( modelObject ) );
        if ( !this.isContinuousAdd() )
        {
            this.onCloseButtonClick();
        }
    }

    private onDeleteButtonClicked( modelObject: T )
    {
        this.debug( "onDeleteButtonClick " + JSON.stringify( modelObject ) );
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
