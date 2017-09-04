import { Subject } from "rxjs";
import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObject } from "../../../model/entity/modelobject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
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
export class CrudFormService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    private formDirtySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
    private formTouchedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
    private formValidSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>( false );
    private formResetSubject: Subject<void> = new Subject<void>();

    constructor( protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( modelObjectFactory );
    }

    /*
     * O B S E R V E R   M E T H O D S
     */

    /**
     * The {@code CrudFormForm} will call this method and register to the Observable
     * and perform the necessary work to resetForm the form
     */
    public subscribeToFormResetEvent( fn: () => any )
    {
        this.debug( "subscribeToFormResetEvent" );
        this.formResetSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormPanel} will call this method to register for
     * dirty status changes of the form.
     */
    public subscribeToFormDirtyEvent( fn: ( boolean ) => any )
    {
        this.debug( "subscribeToFormDirtyEvent" );
        this.formDirtySubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormPanel} will call this method to be notified on changes to the
     * touched status.
     */
    public subscribeToFormTouchedEvent( fn: ( boolean ) => any )
    {
        this.debug( "subscribeToFormTouchedEvent" );
        return this.formTouchedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormPanel} will call this method to be notified when there are changes to the
     * form's valid status.
     */
    public subscribeToFormValidEvent( fn: ( boolean ) => any )
    {
        this.debug( "subscribeToFormValidEvent" );
        return this.formValidSubject.asObservable().subscribe( fn );
    }

    /*
     * N O T I F I E R   M E T H O D S
     */

    /**
     * The form container [@code CrudFormPanelComponent) will call this method when to notify the form to resetForm.
     */
    public sendFormResetEvent()
    {
        //this.debug( "sendFormResetEvent" );
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
        //this.debug( "sendFormDirtyEvent " + dirty );
        this.tickThenRun( () => this.formDirtySubject.next( dirty ) );
    }

    /**
     * The {@code CrudFormComponent} will call this method to notify the panel when the touched status has changed.
     *
     * @param touched
     */
    public sendFormTouchedEvent( touched: boolean )
    {
        //this.debug( "sendFormTouchedEvent " + touched );
        this.tickThenRun( () => this.formTouchedSubject.next( touched ) );
    }

    /**
     * The {@code CrudFromComponent} will call this method to notify the panel when the valid status has changed.
     * @param valid
     */
    public sendFormValidEvent( valid: boolean )
    {
        //this.debug( "sendFormValidEvent " + valid );
        this.tickThenRun( () => this.formValidSubject.next( valid ) );
    }

}
