import { Subject } from "rxjs";
import { ModelObject } from "../../../model/entity/modelobject";
import { DialogCloseEventType } from "../common/close-button-event";
import { Subscription } from "rxjs/Subscription";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { CrudPanelService } from "../panel/crud-panel.service";
import { CrudFormButtonsService } from "../form/crud-form-buttons.service";
import { CrudStateStore } from "../common/crud-state-store";

/**
 * This service defines the Observables for interacting with a CRUD dialog.
 * This service inherits general behaviour from the CrudPanelService.  A panel and a dialog both display a form.
 * The only difference is that the dialog is displayed modally and contains a close button.
 *
 * The following subjects are provided:
 *  - CloseButtonClicked
 *  - DisplayDialogRequest
 * Created by mike on 12/30/2016.
 */
export class CrudDialogService<T extends ModelObject<T>> extends CrudPanelService<T>
{
    protected closeButtonClickedSubject: Subject<DialogCloseEventType>;

    /**
     * Constructor.
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {CrudFormButtonsService<T extends ModelObject<T>>} crudFormButtonsService
     */
    constructor( protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudStateStore: CrudStateStore<T>,
                 protected crudFormButtonsService: CrudFormButtonsService<T> )
    {
        super( modelObjectFactory, crudStateStore, crudFormButtonsService );
    }

    /**
     * Create the dialog subjects.  Called from super class.
     */
    protected createSubjects(): void
    {
        super.createSubjects();
        this.closeButtonClickedSubject = new Subject<DialogCloseEventType>();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the close
     * button is clicked on the panel.
     * @return Subscription
     */
    public subscribeToCloseButtonClickedEvent( fn: ( event: DialogCloseEventType ) => any ): Subscription
    {
        var subscription: Subscription = this.closeButtonClickedSubject.asObservable().subscribe( fn );
        this.debug( "subscribeToCloseButtonClickedEvent subscribers: " + this.closeButtonClickedSubject.observers.length );
        return subscription;
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the close button.
     */
    public sendCloseButtonClickedEvent( event: DialogCloseEventType )
    {
        this.debug( "sendCloseButtonClickedEvent " + DialogCloseEventType.getName( event ) + " subscribers: "
            + this.closeButtonClickedSubject.observers.length );
        this.closeButtonClickedSubject.next( event );
    }
}
