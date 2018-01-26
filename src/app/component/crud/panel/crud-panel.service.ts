import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObject } from "../../../model/entity/modelobject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { CrudFormButtonsService } from "../form/crud-form-buttons.service";
import { CrudOperation } from "../common/crud-operation";
import { ModelObjectCrudOperationSubjectInfo } from "../dialog/modelobject-crudoperation-subject-info";
import { Subscription } from "rxjs/Subscription";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subject } from "rxjs/Subject";

/**
 * This is the base service for CRUD Panel operations.
 */
export class CrudPanelService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    protected displayDialogRequestSubject: BehaviorSubject<ModelObjectCrudOperationSubjectInfo> =
        new BehaviorSubject<ModelObjectCrudOperationSubjectInfo>( null );

    protected cancelButtonClickedSubject: Subject<void> = new Subject<void>();

    /**
     * Constructor
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudFormButtonsService<T extends ModelObject<T>>} crudFormButtonsService
     */
    constructor( protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudFormButtonsService: CrudFormButtonsService<T> )
    {
        super( modelObjectFactory );
    }

    /**
     * Creates the panel service subjects.  Called from super class.
     */
    protected createSubjects(): void
    {
        super.createSubjects();
        this.displayDialogRequestSubject = new BehaviorSubject<ModelObjectCrudOperationSubjectInfo>( null );
    }

    /**
     * Store default values in the behaviour subjects so that we don't get the current values next time through.
     */
    public resetSubjects(): void
    {
        let methodName = "resetSubjects";
        this.debug( methodName + ".begin" )
        super.resetSubjects();
        this.displayDialogRequestSubject.next( null );
        this.debug( methodName + ".end" )
    }

    /**
     * Subscribe to the cancel button clicked event.
     * @param {() => any} fn
     * @returns {Subscription}
     */
    public subscribeToCancelButtonClickedEvent( fn: () => any ): Subscription
    {
        this.debug( "subscribeToDisplayFormRequestEvent" );
        return this.cancelButtonClickedSubject.asObservable().subscribe( fn );
    }

    /**
     * Notifies all subscribers that the cancel button was clicked.
     */
    public sendCancelButtonClickedEvent()
    {
        this.debug( "sendCancelButtonClickedEvent" );
        this.cancelButtonClickedSubject.next();
    }

    /**
     * Override to forward model object change event to the buttons.
     * @param {T} modelObject
     */
    public sendModelObjectChangedEvent( modelObject: T ): void
    {
        super.sendModelObjectChangedEvent( modelObject );
        this.crudFormButtonsService.sendModelObjectChangedEvent( modelObject );
    }

    /**
     * Override to forward the crud operation change event to the buttons.
     * @param {CrudOperation} crudOperation
     */
    public sendCrudOperationChangedEvent( crudOperation: CrudOperation ): void
    {
        super.sendCrudOperationChangedEvent( crudOperation );
        this.crudFormButtonsService.sendCrudOperationChangedEvent( crudOperation );
    }

    /**
     * This method must be implemented to return an instance of a ModelObjectCrudOperationSubject that contains
     * the model object and the crud operation to be sent to the dialog.
     */
    protected createDisplayFormRequestSubjectInfo( modelObject: T, crudOperation: CrudOperation  ): ModelObjectCrudOperationSubjectInfo
    {
        this.debug( "createDisplayFormRequestSubjectInfo crudOperation: " + crudOperation + " " + JSON.stringify( modelObject ));
        var subjectInfo: ModelObjectCrudOperationSubjectInfo = new ModelObjectCrudOperationSubjectInfo();
        subjectInfo.modelObject = modelObject;
        subjectInfo.crudOperation = crudOperation;
        return subjectInfo;
    }

    /**
     * Handle the request to display the form
     */
    public subscribeToDisplayFormRequestEvent( fn: ( DisplayDialogRequestSubjectInfo ) => any ): Subscription
    {
        this.debug( "subscribeToDisplayFormRequestEvent" );
        return this.displayDialogRequestSubject.asObservable().subscribe( fn );
    }

    /**
     * Sends a request to display the CRUD form
     */
    public sendDisplayFormRequestEvent( modelObject: T, crudOperation: CrudOperation )
    {
        var subjectInfo: ModelObjectCrudOperationSubjectInfo = this.createDisplayFormRequestSubjectInfo( modelObject, crudOperation );
        this.debug( "sendDisplayFormRequestEvent " + JSON.stringify( subjectInfo ) + " to " +
            this.displayDialogRequestSubject.observers.length + " observers" );
        this.displayDialogRequestSubject.next( subjectInfo )
    }

}
