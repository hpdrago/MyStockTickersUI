import { Subject, Observable } from "rxjs";
import { ModelObject } from "../../model/class/modelobject";
import { Injectable } from "@angular/core";
import { BaseCrudComponentService } from "./base-crud-component.service";

/**
 * This service defines the Observables for interacting with a CRUD dialog.
 *
 * The following subjects are provided:
 *  - CloseButtonClicked
 *  - DisplayDialogRequest
 * Created by mike on 12/30/2016.
 */
@Injectable()
export abstract class CrudDialogService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    protected displayDialogRequestSubject: Subject<void> = new Subject<void>();
    protected closeButtonClickedSubject: Subject<void> = new Subject<void>();

    /**
     * Handle the request to display the dialog
     * @return {Observable<void>}
     */
    public subscribeToDisplayDialogRequestEvent(): Observable<void>
    {
        this.log( "subscribeToDisplayDialogRequestEvent" );
        return this.displayDialogRequestSubject.asObservable();
    }

    /**
     * Sends a request to display the CRUD dialog
     */
    public sendDisplayDialogRequestEvent()
    {
        this.log( "sendDisplayDialogRequestEvent" );
        this.tickThenRun( () => this.displayDialogRequestSubject.next() );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the close
     * button is clicked on the panel.
     * @return {Observable<void>}
     */
    public subscribeToCloseButtonClickedEvent(): Observable<void>
    {
        this.log( "subscribeToCloseButtonClickedEvent" );
        return this.closeButtonClickedSubject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the close button.
     */
    public sendCloseButtonClickedEvent()
    {
        this.log( "sendCloseButtonClickedEvent" );
        this.tickThenRun( () => this.closeButtonClickedSubject.next() );
    }

}
