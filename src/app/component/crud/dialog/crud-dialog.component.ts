import { ModelObject } from "../../../model/entity/modelobject";
import { ToastsManager } from "ng2-toastr";
import { CrudDialogService } from "./crud-dialog.service";
import { CrudOperation } from "../common/crud-operation";
import { CrudFormService } from "../form/crud-form.service";
import { CrudFormButtonsService } from "../form/crud-form-buttons.service";
import { BaseCrudComponent } from "../common/base-crud.component";
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
        this.crudFormService.subscribeToComponentInitializedEvent( ()=> this.formInitialized() );
        this.crudFormButtonsService.subscribeToComponentInitializedEvent( ()=> this.formButtonsInitialized() );
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
        this.crudFormButtonsService.sendModelObjectChangedEvent( this.modelObject,   );
    }

    /**
     * Subscribe to the events that will be initiated by the parent container.
     */
    protected subscribeToCrudDialogServiceEvents()
    {
        this.log( "subscribeToCrudDialogServiceEvents.begin" );
        this.crudDialogService.subscribeToCloseButtonClickedEvent(() => this.onCloseButtonClick() );
        this.crudDialogService.subscribeToDisplayDialogRequestEvent(( subjectInfo: DisplayDialogRequestSubjectInfo ) => this.setDisplayDialog( subjectInfo ) );
        this.crudDialogService.subscribeToCrudOperationChangeEvent(( crudOperation: CrudOperation ) => this.crudOperationChanged( crudOperation ) );
        this.crudDialogService.subscribeToModelObjectChangedEvent(( modelObject: T ) => this.modelObjectChanged( modelObject ) );
        this.crudFormButtonsService.subscribeToAddButtonClickedEvent( ( modelObject ) => this.onAddButtonClicked( modelObject ) )
        this.crudFormButtonsService.subscribeToHandleDeleteButtonClickedEvent(( modelObject ) => this.onDeleteButtonClicked( modelObject ) )
        this.log( "subscribeToCrudDialogServiceEvents.end" );
    }

    /**
     * Set the display dialog flag which will hide or display the dialog.
     *
     * @param displayDialog
     */
    protected setDisplayDialog( subjectInfo: DisplayDialogRequestSubjectInfo ): void
    {
        this.debug( "setDisplayDialog.begin " + JSON.stringify( subjectInfo ) );
        this.setModelObject( subjectInfo.modelObject );
        this.setCrudOperation( subjectInfo.crudOperation );
        /*
         * Tell the buttons and form of the changes
         */
        this.debug( "Sending events to Form" );
        this.crudFormService.sendCrudOperationChangedEvent( subjectInfo.crudOperation );
        this.crudFormService.sendModelObjectChangedEvent( subjectInfo.modelObject );
        this.debug( "Sending events to Form Buttons" );
        this.crudFormButtonsService.sendCrudOperationChangedEvent( subjectInfo.crudOperation );
        this.crudFormButtonsService.sendModelObjectChangedEvent( subjectInfo.modelObject );
        this.displayDialog = true;
        this.debug( "setDisplayDialog.end" );
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
