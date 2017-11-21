import { Subject } from "rxjs";
import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObject } from "../../../model/entity/modelobject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { Subscription } from "rxjs/Subscription";
import { ModelObjectCrudOperationSubjectInfo } from "../dialog/modelobject-crudoperation-subject-info";
/**
 * This service provides communication from the CrudFormComponent's parent aka CrudFormComponent
 * to the CrudFormComponent.
 *
 * The methods contained herein return {@code Observable} so the form can implement the necessary
 * logic to fulfill the request from the CrudFormComponent.
 *
 * @param T The model object type
 *
 * Created by mike on 12/10/2016.
 */
export class CrudFormService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    private formDirtySubject: Subject<boolean> = new Subject<boolean>();
    private formTouchedSubject: Subject<boolean> = new Subject<boolean>();
    private formValidSubject: Subject<boolean> = new Subject<boolean>();
    private formResetSubject: Subject<void> = new Subject<void>();
    private formLogStateSubject: Subject<void> = new Subject<void>();
    private formPrepareToSaveSubject: Subject<void> = new Subject<void>();
    private formPrepareToDisplaySubject: Subject<void> = new Subject<void>();
    private createFormSubject: Subject<void> = new Subject<void>();
    private formModelObjectVersionUpdateSubject: Subject<T> = new Subject<T>();
    private modelObjectCrudOperationChangeSubject: BehaviorSubject<ModelObjectCrudOperationSubjectInfo> = new BehaviorSubject( null );


    constructor( protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( modelObjectFactory );
    }

    /*
     * O B S E R V E R   M E T H O D S
     */

    /**
     * The {@code CrudFormForm} will call this method and register to be notified and receive a new crud operation
     * and model object to display.
     */
    public subscribeToModelObjectCrudOperationChangedEvent( fn: ( ModelObjectCrudOperationSubjectInfo ) => any ): Subscription
    {
        this.debug( "subscribeToModelObjectCrudOperationChangedEvent" );
        return this.modelObjectCrudOperationChangeSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormForm} will call this method and register to the Observable
     * and perform the necessary work to resetForm the form
     */
    public subscribeToFormResetEvent( fn: () => any ): Subscription
    {
        this.debug( "subscribeToFormResetEvent" );
        return this.formResetSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormForm} will call this method to register for
     * dirty status changes of the form.
     */
    public subscribeToFormDirtyEvent( fn: ( boolean ) => any ): Subscription
    {
        this.debug( "subscribeToFormDirtyEvent" );
        return this.formDirtySubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormForm} will call this method to be notified on changes to the
     * touched status.
     */
    public subscribeToFormTouchedEvent( fn: ( boolean ) => any ): Subscription
    {
        this.debug( "subscribeToFormTouchedEvent" );
        return this.formTouchedSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormForm} will call this method to be notified when there are changes to the
     * form's valid status.
     */
    public subscribeToFormValidEvent( fn: ( boolean ) => any ): Subscription
    {
        this.debug( "subscribeToFormValidEvent" );
        return this.formValidSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudForm} will call this method and register to the Observable
     * and perform the necessary work to display the form state
     */
    public subscribeToFormLogStateRequest( fn: () => any ): Subscription
    {
        this.debug( "subscribeToFormLogState" );
        return this.formLogStateSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormComponent} will call this method to register to be notified that the user has clicked on
     * the save or add button.  This allows the form to perform any final processing on the modelObject before its saved.
     */
    public subscribeToFormPrepareToSaveEvent( fn: () => any ): Subscription
    {
        this.debug( "subscribeToFormPrepareToSaveEvent" );
        return this.formPrepareToSaveSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormComponent} will call this method to register to be notified right before the dialog containing
     * the form will be displayed.  This allows the form to perform any initialization before it is displayed.
     * This method is called after the model object and the crud operation have been set on the form.
     */
    public subscribeToFormPrepareToDisplayEvent( fn: () => any ): Subscription
    {
        this.debug( "subscribeToFormPrepareToDisplayEvent" );
        return this.formPrepareToDisplaySubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormComponent} will call this method to register to be notified that while the form was initializing,
     * the model object that the form was initially showing was a prior version and a new version of the model object is
     * provided for the form to update its components.
     * @param {(modelObject: T) => any} fn
     */
    public subscribeToFormModelObjectVersionUpdateEvent( fn: ( modelObject: T ) => any ): Subscription
    {
        this.debug( "subscribeToFormModelObjectVersionUpdateEvent" );
        return this.formModelObjectVersionUpdateSubject.asObservable().subscribe( fn );
    }

    /**
     * The {@code CrudFormComponent} will call this method to register to be notified when the form should perform
     * the form initialization logic.
     * @param {() => any} fn
     */
    public subscribeToCreateFormEvent( fn: () => any ): Subscription
    {
        this.debug( "subscribeToFormPerformInitializationEvent" );
        return this.createFormSubject.asObservable().subscribe( fn );
    }

    /*
     * N O T I F I E R   M E T H O D S
     */

    /**
     * The form container [@code CrudFormFormComponent) will call this method when to notify the form to resetForm.
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
     * The {@code CrudFormComponent} will call this method to notify the panel when the valid status has changed.
     * @param valid
     */
    public sendFormValidEvent( valid: boolean )
    {
        //this.debug( "sendFormValidEvent " + valid );
        this.tickThenRun( () => this.formValidSubject.next( valid ) );
    }

    /**
     * The {@code CrudFormComponent} will call this method to notify the form when the valid status has changed.
     */
    public sendFormLogStateRequest()
    {
        //this.debug( "sendFormLogStateRequest" + valid );
        this.tickThenRun( () => this.formLogStateSubject.next() );
    }

    /**
     * The {@code CrudFormButtonsComponent} will call this method to notify the form when the user has requested to
     * save the current model object.
     */
    public sendFormPrepareToSaveEvent()
    {
        this.debug( "sendFormPrepareToSaveEvent" );
        this.tickThenRun( () => this.formPrepareToSaveSubject.next() );
    }

    /**
     * The {@code CrudDialog} will call this method to notify the form right before the dialog containing the form
     * will be displayed.
     */
    public sendFormPrepareToDisplayEvent()
    {
        this.debug( "sendFormPrepareToDisplayEvent" );
        this.tickThenRun( () => this.formPrepareToDisplaySubject.next() );
    }

    /**
     * The {@code CrudFormButtonsComponent} will call this method to notify the form when the user has requested to
     * save the current model object.
     * @param modelObject The new model object version
     */
    public sendFormModelObjectVersionUpdateEvent( modelObject: T )
    {
        this.debug( "sendFormModelObjectVersionUpdateEvent: " + JSON.stringify( modelObject ) );
        this.tickThenRun( () => this.formModelObjectVersionUpdateSubject.next( modelObject ) );
    }

    /**
     * The {@code CrudFormDialogComponent} will call this method to notify the form that it needs to initialize the
     * form as it is about to be displayed.
     */
    public sendCreateFormEvent()
    {
        this.debug( "sendFormModelObjectVersionUpdateEvent: " );
        this.tickThenRun( () => this.createFormSubject.next() );
    }

    /**
     * This method is called by the dialog to send the model object and crud operation values in a single
     * message to the crud form.
     * @param {} subjectInfo
     */
    public sendModelObjectCrudOperationChangedEvent( subjectInfo: ModelObjectCrudOperationSubjectInfo )
    {
        this.debug( "sendModelObjectCrudOperationChangedEvent " + JSON.stringify( subjectInfo ) );
        this.modelObjectCrudOperationChangeSubject.next( subjectInfo );
        /*
         * Also set the individual values for model object and crud operation
         */
        this.sendModelObjectChangedEvent( subjectInfo.modelObject );
        this.sendCrudOperationChangedEvent( subjectInfo.crudOperation );
    }
}
