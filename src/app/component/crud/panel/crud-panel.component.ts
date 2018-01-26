import { ToastsManager } from "ng2-toastr";
import { ModelObject } from "../../../model/entity/modelobject";
import { BaseCrudComponent } from "../common/base-crud.component";
import { OnInit } from "@angular/core";
import { CrudOperation } from "../common/crud-operation";
import { CrudStateStore } from '../common/crud-state-store';
import { CrudController } from '../common/crud-controller';
import { ModelObjectFactory } from '../../../model/factory/model-object.factory';
import { CrudRestService } from '../../../service/crud/crud-rest.serivce';

/**
 * This is a Panel class that contains a CRUD Form component {@code CrudFormComponent}
 *
 * @param <T> Read Model Type and Search Criteria
 *
 * Created by mike on 11/27/2016.
 */
export abstract class CrudPanelComponent<T extends ModelObject<T>>
    extends BaseCrudComponent<T>
    implements OnInit
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {CrudController<T extends ModelObject<T>>} crudController
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudRestService<T extends ModelObject<T>>} crudRestService
     */
    constructor( protected toaster: ToastsManager,
                 protected crudStateStore: CrudStateStore<T>,
                 protected crudController: CrudController<T>,
                 protected modelObjectFactory: ModelObjectFactory<T>,
                 protected crudRestService: CrudRestService<T> )
    {
        super( toaster,
               crudStateStore,
               crudController,
               modelObjectFactory,
               crudRestService );
    }

    /**
     * Initialize the class
     */
    public ngOnInit()
    {
        this.log( "CrudPanelComponent.ngOnInit.begin" );
        super.ngOnInit();
        this.subscribeToCrudPanelServiceEvents();
        this.log( "CurdPanelComponent.ngOnInit.end" );
    }

    /**
     * This method is called to set the model object and crud operation.
     * @param {T} modelObject
     * @param {CrudOperation} crudOperation
     */
    //protected displayModelObject( modelObject: T, crudOperation: CrudOperation )
    protected displayModelObject()
    {
        //this.setModelObject( modelObject );
        //this.setCrudOperation( crudOperation );
        //var subjectInfo: ModelObjectCrudOperationSubjectInfo = new ModelObjectCrudOperationSubjectInfo();
        //subjectInfo.crudOperation = crudOperation;
        //subjectInfo.modelObject = modelObject;

        /*
         * Tell the buttons and form of the changes
         */
        //this.debug( "Sending crud operation and modelObject to Form" );
        //this.crudServiceContainer
        //    .crudFormService
        //    .sendModelObjectCrudOperationChangedEvent( subjectInfo );
        //this.debug( "Sending crud operation and modelObject to the form buttons" );
        //this.crudServiceContainer
        //    .crudFormButtonsService
        //    .sendCrudOperationChangedEvent( subjectInfo.crudOperation );
        //this.crudServiceContainer
        //    .crudFormButtonsService
        //    .sendModelObjectChangedEvent( subjectInfo.modelObject );
        /*
        this.crudController
            .sendFormPrepareToDisplayEvent();
            */
    }

    /**
     * Subscribes to the events received from the CrudFormButtonsService
     */
    protected subscribeToCrudPanelServiceEvents(): void
    {
        let methodName = 'subscribeToCrudPanelServiceEvents';
        this.debug( methodName + ".begin" );
        this.addSubscription( 'subscribeToCancelButtonClickedEvent',
            this.crudController
                .subscribeToPanelCancelButtonClickedEvent( () => this.cancelButtonClicked() ));
        this.debug( methodName + ".end" );
    }

    protected onSubmit(): void
    {
        this.debug( "onSubmit " + JSON.stringify( this.modelObject ));
    }

    /**
     * This method is called when the cancel button is clicked.
     */
    protected cancelButtonClicked()
    {
        this.debug( "cancelButtonClicked" );
        this.resetCrudOperationAndModelObject();
    }

    protected resetPanel()
    {
    }
}
