import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { LinkedAccount } from "../../model/entity/linked-account";
import { LinkedAccountFactory } from "../../model/factory/linked-account.factory";
import { LinkedAccountCrudService } from "../../service/crud/linked-account-crud.service";
import { CrudDialogService } from "../crud/dialog/crud-dialog.service";

/**
 * This is the service container for the LinkedAccount entity.
 */
@Injectable()
export class LinkedAccountCrudServiceContainer extends CrudServiceContainer<LinkedAccount>
{
    /**
     * Constructor.
     * @param {LinkedAccountFactory} linkedAccountFactory
     * @param {LinkedAccountCrudService} linkedAccountCrudService
     */
    constructor( private linkedAccountFactory: LinkedAccountFactory,
                 private linkedAccountCrudService: LinkedAccountCrudService )
    {
        super( linkedAccountFactory, linkedAccountCrudService );
        this.crudDialogService = new CrudDialogService<LinkedAccount>( this.linkedAccountFactory,
                                                                       this.crudStateStore,
                                                                       this.crudFormButtonsService );
    }
}
