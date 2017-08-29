import { Subject, Observable } from "rxjs";
import { ModelObject } from "../../model/class/modelobject";
import { Injectable } from "@angular/core";
import { BaseCrudComponentService } from "./base-crud-component.service";
import { DisplayDialogRequestSubjectInfo } from "./display-dialog-request-subject-info";
import { CrudOperation } from "./crud-operation";

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
    protected displayDialogRequestSubject: Subject<DisplayDialogRequestSubjectInfo> = new Subject<DisplayDialogRequestSubjectInfo>();
    protected closeButtonClickedSubject: Subject<void> = new Subject<void>();

    /**
     * This method must be implemented to return an instance of a DisplayDialogRequestSubjectInfo that contains
     * the model object and the crud operation to be sent to the dialog.
     */
    protected createDisplayDialogRequestSubjectInfo( modelObject: T, crudOperation: CrudOperation  ): DisplayDialogRequestSubjectInfo
    {
        var subjectInfo: DisplayDialogRequestSubjectInfo = new DisplayDialogRequestSubjectInfo();
        subjectInfo.modelObject = modelObject;
        subjectInfo.crudOperation = crudOperation;
        return subjectInfo;
    }

    /**
     * Handle the request to display the dialog
     * @return {Observable<DisplayDialogRequestSubjectInfo<T>>}
     */
    public subscribeToDisplayDialogRequestEvent(): Observable<DisplayDialogRequestSubjectInfo>
    {
        this.log( "subscribeToDisplayDialogRequestEvent" );
        return this.displayDialogRequestSubject.asObservable();
    }

    /**
     * Sends a request to display the CRUD dialog
     */
    public sendDisplayDialogRequestEvent( modelObject: T, crudOperation: CrudOperation )
    {
        var subjectInfo: DisplayDialogRequestSubjectInfo = this.createDisplayDialogRequestSubjectInfo( modelObject, crudOperation );
        this.log( "sendDisplayDialogRequestEvent " + JSON.stringify( subjectInfo ));
        this.tickThenRun( () => this.displayDialogRequestSubject.next( subjectInfo ));
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
