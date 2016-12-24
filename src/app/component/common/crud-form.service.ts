import { Observable, Subject } from "rxjs";
import { ApplicationRef } from "@angular/core";
import { BaseCrudComponentService } from "./base-crud-component.service";
import { ModelObject } from "../../model/base-modelobject";
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
    protected clearFormSubject: Subject<void> = new Subject<void>();
    protected formDirtySubject: Subject<boolean> = new Subject<boolean>();
    protected formTouchedSubject: Subject<boolean> = new Subject<boolean>();
    protected formValidSubject: Subject<boolean> = new Subject<boolean>();

    constructor()
    {
        super();
    }

    /*
     * O B S E R V E R   M E T H O D S
     */

    /**
     * The {@code CrudFormForm} will call this method and register to the Observable
     * and perform the necessary work to reset the form
     *
     * @return {Observable<void>}
     */
    public handleReset(): Observable<void>
    {
        //this.logger.log( "handleReset" );
        return this.clearFormSubject.asObservable();
    }

    /**
     * The {@code CrudFormPanel} will call this method to register for
     * dirty status changes of the form.
     *
     * @return {Observable<boolean>}
     */
    public handleFormDirty(): Observable<boolean>
    {
        //this.logger.log( "handleFormDirty" );
        return this.formDirtySubject.asObservable();
    }

    /**
     * The {@code CrudFormPanel} will call this method to be notified on changes to the
     * touched status.
     *
     * @return {Observable<boolean>}
     */
    public handleFormTouched(): Observable<boolean>
    {
        //this.logger.log( "handleFormTouched" );
        return this.formTouchedSubject.asObservable();
    }

    /**
     * The {@code CrudFormPanel} will call this method to be notified when there are changes to the
     * form's valid status.
     * @return {Observable<boolean>}
     */
    public handleFormValid(): Observable<boolean>
    {
        //this.logger.log( "handleFormValid" );
        return this.formValidSubject.asObservable();
    }

    /*
     * N O T I F I E R   M E T H O D S
     */

    /**
     * The form container [@code CrudFormPanelComponent) will call this method when to notify the form to reset.
     */
    public sendReset()
    {
        this.logger.log( "sendReset" );
        this.tickThenRun( () => this.clearFormSubject.next() );
    }

    /**
     * The {@code CrudFormComponent} will call this method to notify the panel that the form's dirty status
     * has changed.
     *
     * @param dirty
     */
    public sendFormDirty( dirty: boolean )
    {
        //this.logger.log( "sendFormDirty " + dirty );
        this.tickThenRun( () => this.formDirtySubject.next( dirty ) );
    }

    /**
     * The {@code CrudFormComponent} will call this method to notify the panel when the touched status has changed.
     *
     * @param touched
     */
    public sendFormTouched( touched: boolean )
    {
        //this.logger.log( "sendFormTouched " + touched );
        this.tickThenRun( () => this.formTouchedSubject.next( touched ) );
    }

    /**
     * The {@code CrudFromComponent} will call this method to notify the panel when the valid status has changed.
     * @param valid
     */
    public sendFormValid( valid: boolean )
    {
        //this.logger.log( "sendFormValid " + valid );
        this.tickThenRun( () => this.formValidSubject.next( valid ) );
    }
}
