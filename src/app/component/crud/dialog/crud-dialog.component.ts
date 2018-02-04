import { ToastsManager } from "ng2-toastr";
import { ModelObject } from "../../../model/entity/modelobject";
import { isNullOrUndefined } from "util";
import { DialogCloseEventType } from "../common/close-button-event";
import { CrudPanelComponent } from "../panel/crud-panel.component";
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudController } from '../common/crud-controller';
import { CrudStateStore } from '../common/crud-state-store';

/**
 * This is the base class for Modal dialogs that provide CRUD operations on a model object.
 *
 * Created by mike on 12/30/2016.
 */
export class CrudDialogComponent<T extends ModelObject<T>> extends CrudPanelComponent<T>
{
    /**
     * Controls the visibility of the dialog
     */
    protected displayDialog: boolean;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {CrudController<T extends ModelObject<T>>} crudController
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     */
    constructor( protected toaster: ToastsManager,
                 protected crudStateStore: CrudStateStore<T>,
                 protected crudController: CrudController<T>,
                 protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( toaster,
               crudStateStore,
               crudController,
               modelObjectFactory );
    }

    /**
     * Initialization method.
     */
    public ngOnInit()
    {
        this.log( "ngOnInit.begin" );
        this.subscribeToCrudDialogServiceEvents();
        this.subscribeToCrudFormButtonsServiceEvents();
        // Tell everyone that we are done
        super.ngOnInit();
        this.log( "ngOnInit.end" );
    }

    /**
     * This method is called when the dialog is destroyed.
     */
    public ngOnDestroy(): void
    {
        let methodName = "ngOnDestroy";
        this.debug( methodName + ".begin" );
        super.ngOnDestroy();
        this.resetsServiceSubscriptions();
        this.debug( methodName + ".end" );
    }

    /**
     * Subscribe to the events that will be initiated by the parent container.
     */
    protected subscribeToCrudDialogServiceEvents()
    {
        this.log( "subscribeToCrudDialogServiceEvents.begin" );
        this.addSubscription(
            this.crudController
            .subscribeToCloseButtonClickedEvent(( event: DialogCloseEventType ) => this.onCloseButtonClick( event ) ));
        this.addSubscription(
            this.crudController
            .subscribeToDisplayFormRequestEvent( () => this.setDisplayDialog() ));
        this.log( "subscribeToCrudDialogServiceEvents.end" );
    }

    /**
     * Subscribe to the events that will be initiated by the parent container.
     */
    protected subscribeToCrudFormButtonsServiceEvents()
    {
        this.log( "subscribeToCrudFormButtonsServiceEvents.begin" );
        this.addSubscription(
            this.crudController
                .subscribeToAddButtonClickedEvent( ( modelObject ) => this.onAddButtonClicked( modelObject ) ));
        this.addSubscription(
            this.crudController
                .subscribeToContinuousAddButtonClickedEvent(( modelObject ) => this.onContinuousAddButtonClicked( modelObject ) ));
        this.addSubscription(
            this.crudController
                .subscribeToSaveButtonClickedEvent( ( modelObject ) => this.onSaveButtonClicked( modelObject ) ));
        this.addSubscription(
            this.crudController
                .subscribeToDeleteButtonClickedEvent(( modelObject ) => this.onDeleteButtonClicked( modelObject ) ));
        this.log( "subscribeToCrudFormButtonsServiceEvents.end" );
    }

    /**
     * Set the display dialog flag which will hide or display the dialog.
     *
     * @param displayDialog
     */
    protected setDisplayDialog(): void
    {
        this.debug( "setDisplayDialog.begin" );
        this.crudController
            .sendFormPrepareToDisplayEvent();
        this.displayDialog = true;
        this.debug( "setDisplayDialog.end" );
    }

    /**
     * This method is called when the Close button is clicked.
     * It will close the dialog and emit a {@code closeButtonClick} event
     */
    protected onCloseButtonClick( event: DialogCloseEventType ): void
    {
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.debug( "onCloseButtonClick " + JSON.stringify( event ) );
            this.closeDialog();
        }
    }

    /**
     * This method is called when the Add button (labeled "Save") is clicked.
     *
     * @param modelObject
     */
    protected onAddButtonClicked( modelObject: T )
    {
        this.debug( "onAddButtonClick " + JSON.stringify( modelObject ) );
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.onCloseButtonClick( DialogCloseEventType.ADD_BUTTON );
        }
    }

    /**
     * This method is called when the Add and continue button (labeled "Save & Add another") is clicked.
     *
     * @param modelObject
     */
    protected onContinuousAddButtonClicked( modelObject: T )
    {
        this.debug( "onContinuousAddButtonClicked " + JSON.stringify( modelObject ) );
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.crudStateStore.sendModelObjectChangedEvent( this, this.modelObjectFactory.newModelObject() );
        }
    }

    /**
     * This method is called when the save button is clicked.  All observers of this event will be notified.
     * @param modelObject
     */
    protected onSaveButtonClicked( modelObject: any )
    {
        this.debug( "onSaveButtonClick " + JSON.stringify( modelObject ) );
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.onCloseButtonClick( DialogCloseEventType.SAVE_BUTTON );
        }
    }

    /**
     * This method is called when the delete button is clicked.  All observers of this event will be notified.
     * @param modelObject
     */
    protected onDeleteButtonClicked( modelObject: T )
    {
        this.debug( "onDeleteButtonClick " + JSON.stringify( modelObject ) );
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.closeDialog();
        }
    }

    /**
     * Performs all of the work necessary to close the dialog.
     */
    protected closeDialog(): void
    {
        let methodName = "closeDialog";
        this.debug( methodName + ".begin" );
        this.displayDialog = false;
        this.resetsServiceSubscriptions();
        this.debug( methodName + ".end" );
    }

    /**
     * Notifies the services to reset all of their subscription subjects to initial values.
     */
    private resetsServiceSubscriptions()
    {
        this.crudStateStore.resetSubjects();
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     */
    public getDuplicateKeyErrorMessage(): string
    {
        return "This entry already exists";
    }
}
