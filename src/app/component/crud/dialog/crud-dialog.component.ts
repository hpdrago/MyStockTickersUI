import { ToastsManager } from "ng2-toastr";
import { ModelObject } from "../../../model/common/model-object";
import { isNullOrUndefined } from "util";
import { DialogCloseEventType } from "../common/close-button-event";
import { CrudPanelComponent } from "../panel/crud-panel.component";
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudController } from '../common/crud-controller';
import { CrudStateStore } from '../common/crud-state-store';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';
import { ChangeDetectorRef, Input } from '@angular/core';

/**
 * This is the base class for Modal dialogs that provide CRUD operations on a model object.
 *
 * Created by mike on 12/30/2016.
 */
export abstract class CrudDialogComponent<T extends ModelObject<T>> extends CrudPanelComponent<T>
{
    /**
     * Controls the visibility of the dialog
     */
    @Input()
    protected displayDialog: boolean;

    /**
     * Controls the display of the close button.
     * @type {boolean}
     */
    @Input()
    protected showCloseButton: boolean = true;

    /**
     * Controls the display of the add button.
     * @type {boolean}
     */
    @Input()
    protected showAddButton: boolean = true;

    /**
     * Controls the display of the continuous add button.
     * @type {boolean}
     */
    @Input()
    protected showContinuousAddButton: boolean = false;

    /**
     * Controls the diplay of the dialog as modal.  Defaults to true.
     */
    @Input()
    protected modal: boolean = true;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {CrudController<T extends ModelObject<T>>} crudController
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudRestService<T extends ModelObject<T>>} crudRestService
     */
    protected constructor( protected changeDetector: ChangeDetectorRef,
                           protected toaster: ToastsManager,
                           protected crudStateStore: CrudStateStore<T>,
                           protected crudController: CrudController<T>,
                           protected modelObjectFactory: ModelObjectFactory<T>,
                           protected crudRestService: CrudRestService<T> )
    {
        super( changeDetector,
               toaster,
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
        super.ngOnInit();
        this.log( "ngOnInit.end" );
    }

    public ngAfterViewInit(): void
    {
        super.ngAfterViewInit();
        this.subscribeToControllerEvents();
    }

    /**
     * Determines if all of the required data/gui components are initialized in order for the form to function.
     * @return {boolean}
     */
    public isInitialized()
    {
        return !isNullOrUndefined( this.crudOperation ) &&
               !isNullOrUndefined( this.modelObject ) &&
               !this.isCrudNoneOperation();
    }

    /**
     * This method is called when the dialog is destroyed.
     */
    public ngOnDestroy(): void
    {
        const methodName = "ngOnDestroy";
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
        const methodName = 'subscribeTooControllerEvents';
        this.debug( methodName + ".begin" );
        this.addSubscription( 'subscribeToFormReadyToDisplay',
                              this.crudController
                                  .subscribeToFormReadyToDisplay( () => this.setDisplayDialog() ));
        this.addSubscription( 'subscribeToDialogDisplayEvent',
                              this.crudController
                                  .subscribeToDialogDisplayEvent( () => this.setDisplayDialog() ));
        this.debug( methodName + ".end" );
    }

    /**
     * This method is called upon the successful completion of a save which is our signal to close the dialog.
     * @param {T} modelObject
     */
    protected onModelObjectSaved( modelObject: T ): void
    {
        super.onModelObjectSaved( modelObject );
        if ( !this.showContinuousAddButton )
        {
            this.closeDialog();
        }
    }

    /**
     * This method is called upon the successful completion of a creating a new model object which is our signal to close the dialog.
     * @param {T} modelObject
     */
    protected onModelObjectCreated( modelObject: T ): void
    {
        super.onModelObjectCreated( modelObject );
        if ( !this.showContinuousAddButton )
        {
            this.closeDialog();
        }
    }

    /**
     * This method is called upon the successful completion of a delete which is our signal to close the dialog.
     * @param {T} modelObject
     */
    protected onModelObjectDeleted( modelObject: T ): void
    {
        super.onModelObjectDeleted( modelObject );
        if ( !this.showContinuousAddButton )
        {
            this.closeDialog();
        }
    }

    /**
     * Set the display dialog flag which will hide or display the dialog.
     *
     * @param displayDialog
     */
    protected setDisplayDialog(): void
    {
        this.debug( "setDisplayDialog.begin" );
        this.tickThenRun( () =>
                          {
                              this.debug( "setting displayDialog to true" );
                              this.displayDialog = true
                          } );
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
        const methodName = 'onPanelAddButtonClickCompletedEvent';
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
        const methodName = 'onPanelSaveButtonClickCompleted';
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
        const methodName = "closeDialog";
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
