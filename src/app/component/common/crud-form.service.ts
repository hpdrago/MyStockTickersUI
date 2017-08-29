import { Observable, Subject } from "rxjs";
import { ApplicationRef } from "@angular/core";
import { BaseCrudComponentService } from "./base-crud-component.service";
import { ModelObject } from "../../model/class/modelobject";
/**
 * This service provides communication from the CrudFormComponent's parent aka CrudPanelComponent
 * to the CrudFormComponent.
 *
 * The methods contained herein return {@code Observable} so the form can implement the necessary
 * logic to fulfill the request from the CrudPanelComponent.
 *
 * @param T The model object type
 *
 * Created by mike on 12/10/2016.
 */
export abstract class CrudFormService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    protected formDirtySubject: Subject<boolean> = new Subject<boolean>();
    protected formTouchedSubject: Subject<boolean> = new Subject<boolean>();
    protected formValidSubject: Subject<boolean> = new Subject<boolean>();
    protected formResetSubject: Subject<void> = new Subject<void>();

    constructor()
    {
        super();
    }

    /*
     * O B S E R V E R   M E T H O D S
     */

    /**
     * The {@code CrudFormForm} will call this method and register to the Observable
     * and perform the necessary work to resetForm the form
     *
     * @return {Observable<void>}
     */
    public subscribeToFormResetEvent(): Observable<void>
    {
        this.logger.debug( "handleReset" );
        return this.formResetSubject.asObservable();
    }

    /**
     * The {@code CrudFormPanel} will call this method to register for
     * dirty status changes of the form.
     *
     * @return {Observable<boolean>}
     */
    public subscribeToFormDirtyEvent(): Observable<boolean>
    {
        this.logger.debug( "subscribeToFormDirtyEvent" );
        return this.formDirtySubject.asObservable();
    }

    /**
     * The {@code CrudFormPanel} will call this method to be notified on changes to the
     * touched status.
     *
     * @return {Observable<boolean>}
     */
    public subscribeToFormTouchedEvent(): Observable<boolean>
    {
        this.logger.debug( "subscribeToFormTouchedEvent" );
        return this.formTouchedSubject.asObservable();
    }

    /**
     * The {@code CrudFormPanel} will call this method to be notified when there are changes to the
     * form's valid status.
     * @return {Observable<boolean>}
     */
    public subscribeToFormValidEvent(): Observable<boolean>
    {
        this.logger.debug( "subscribeToFormValidEvent" );
        return this.formValidSubject.asObservable();
    }

    /*
     * N O T I F I E R   M E T H O D S
     */

    /**
     * The form container [@code CrudFormPanelComponent) will call this method when to notify the form to resetForm.
     */
    public sendFormResetEvent()
    {
        this.logger.debug( "sendFormResetEvent" );
        this.tickThenRun( () => this.formResetSubject.next() );
    }

    /**
     * The {@code CrudFormComponent} will call this method to notify the panel that the form's dirty status
     * has changed.
     *
     * @param dirty
     */
    public sendFormDirtyEvent( dirty: boolean )
    {
        this.logger.debug( "sendFormDirtyEvent " + dirty );
        this.tickThenRun( () => this.formDirtySubject.next( dirty ) );
    }

    /**
     * The {@code CrudFormComponent} will call this method to notify the panel when the touched status has changed.
     *
     * @param touched
     */
    public sendFormTouchedEvent( touched: boolean )
    {
        this.logger.debug( "sendFormTouchedEvent " + touched );
        this.tickThenRun( () => this.formTouchedSubject.next( touched ) );
    }

    /**
     * The {@code CrudFromComponent} will call this method to notify the panel when the valid status has changed.
     * @param valid
     */
    public sendFormValidEvent( valid: boolean )
    {
        this.logger.debug( "sendFormValidEvent " + valid );
        this.tickThenRun( () => this.formValidSubject.next( valid ) );
    }

}
