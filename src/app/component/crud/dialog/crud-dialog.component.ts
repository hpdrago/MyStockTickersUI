import { ToastsManager } from "ng2-toastr";
import { ModelObject } from "../../../model/entity/modelobject";
import { isNullOrUndefined } from "util";
import { DialogCloseEventType } from "../common/close-button-event";
import { CrudPanelComponent } from "../panel/crud-panel.component";
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudController } from '../common/crud-controller';
import { CrudStateStore } from '../common/crud-state-store';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';

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

    /**
     * Initialization method.
     */
    public ngOnInit()
    {
        this.log( "ngOnInit.begin" );
        this.subscribeToControllerEvents();
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
    protected subscribeToControllerEvents()
    {
        let methodName = 'subscribeTooControllerEvents';
        this.debug( methodName + ".begin" );
        this.addSubscription( methodName,
                              this.crudController
                                  .subscribeToTableEditButtonClickedEvent(() => this.setDisplayDialog() ));
        this.addSubscription( methodName,
                              this.crudController
                                  .subscribeToTableDeleteButtonClickedEvent(() => this.setDisplayDialog() ));
        this.addSubscription( methodName,
                              this.crudController
                                  .subscribeToTableAddButtonClickedEvent(() => this.setDisplayDialog() ));
        this.addSubscription( methodName,
                              this.crudController
                                  .subscribeToDialogCloseButtonClickedEvent(( event: DialogCloseEventType ) => this.onCloseButtonClick( event ) ));
        /*
        this.addSubscription( methodName,
                              this.crudController
                                  .subscribeToPanelContinuousAddButtonClickedEvent(() => this.onContinuousAddButtonClicked() ));
        this.addSubscription( methodName,
                              this.crudController
                                  .subscribeToPanelSaveButtonClickCompletedEvent( () => this.onPanelSaveButtonClickCompleted() ));
                                  */
        this.addSubscription( methodName,
                              this.crudController
                                  .subscribeFormReadyToDisplay( () => this.setDisplayDialog() ));
        this.debug( methodName + ".end" );
    }

    /**
     * This method is called upon the successful completion of a save which is our signal to close the dialog.
     * @param {T} modelObject
     */
    protected onModelObjectSaved( modelObject: T ): void
    {
        super.onModelObjectSaved( modelObject );
        this.closeDialog();
    }

    /**
     * This method is called upon the successful completion of a creating a new model object which is our signal to close the dialog.
     * @param {T} modelObject
     */
    protected onModelObjectCreated( modelObject: T ): void
    {
        super.onModelObjectCreated( modelObject );
        this.closeDialog();
    }

    /**
     * This method is called upon the successful completion of a delete which is our signal to close the dialog.
     * @param {T} modelObject
     */
    protected onModelObjectDeleted( modelObject: T ): void
    {
        super.onModelObjectDeleted( modelObject );
        this.closeDialog();
    }

    /**
     * Set the display dialog flag which will hide or display the dialog.
     *
     * @param displayDialog
     */
    protected setDisplayDialog(): void
    {
        this.debug( "setDisplayDialog.begin" );
        /*
        this.crudController
            .sendFormPrepareToDisplayEvent();
            */
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
    protected onPanelAddButtonClickCompletedEvent()
    {
        let methodName = 'onPanelAddButtonClickCompletedEvent';
        this.debug( methodName + ' ' + JSON.stringify( this.modelObject ) );
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
    protected onContinuousAddButtonClicked()
    {
        this.debug( "onContinuousAddButtonClicked " + JSON.stringify( this.modelObject ) );
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            //this.crudController.sendPanelContinuousAddButtonClickedEvent( this.modelObject );
        }
    }

    /**
     * This method is called when the save button is clicked.  All observers of this event will be notified.
     * @param modelObject
     */
    protected onPanelSaveButtonClickCompleted()
    {
        let methodName = 'onPanelSaveButtonClickCompleted';
        this.debug( methodName + " " + JSON.stringify( this.modelObject ) );
        if ( !isNullOrUndefined( this.modelObject ) )
        {
            this.onCloseButtonClick( DialogCloseEventType.SAVE_BUTTON );
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
        //this.resetsServiceSubscriptions();
        this.debug( methodName + ".end" );
    }

    /**
     * Notifies the services to reset all of their subscription subjects to initial values.
     */
    private resetsServiceSubscriptions()
    {
        //this.crudStateStore.resetSubjects();
    }

    /**
     * This method is called when a 409 HTTP Code is received from a rest call.
     */
    public getDuplicateKeyErrorMessage(): string
    {
        return "This entry already exists";
    }
}
