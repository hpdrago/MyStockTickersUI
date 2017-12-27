import { BaseCrudComponentService } from "../common/base-crud-component.service";
import { ModelObject } from "../../../model/entity/modelobject";
import { ModelObjectFactory } from "../../../model/factory/model-object.factory";
import { CrudFormButtonsService } from "../form/crud-form-buttons.service";
import { CrudOperation } from "../common/crud-operation";
import { ModelObjectCrudOperationSubjectInfo } from "../dialog/modelobject-crudoperation-subject-info";
import { Subscription } from "rxjs/Subscription";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

/**
 * This is the base service for CRUD Panel operations.
 */
export class CrudPanelService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    protected displayDialogRequestSubject: BehaviorSubject<ModelObjectCrudOperationSubjectInfo> =
        new BehaviorSubject<ModelObjectCrudOperationSubjectInfo>( null );

    constructor( protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudFormButtonsService: CrudFormButtonsService<T> )
    {
        super( modelObjectFactory );
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
        this.debug( "sendDisplayFormRequestEvent " + JSON.stringify( subjectInfo ));
        this.tickThenRun( () => this.displayDialogRequestSubject.next( subjectInfo ));
    }

}
