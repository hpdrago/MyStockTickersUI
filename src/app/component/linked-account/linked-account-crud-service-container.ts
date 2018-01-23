import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";
import { LinkedAccount } from "../../model/entity/linked-account";
import { LinkedAccountFactory } from "../../model/factory/linked-account.factory";
import { LinkedAccountCrudService } from "../../service/crud/linked-account-crud.service";
import { CrudPanelService } from "../crud/panel/crud-panel.service";
import { CrudDialogService } from "../crud/dialog/crud-dialog.service";

/**
 * This is the service container for the LinkedAccount entity.
 */
@Injectable()
export class LinkedAccountCrudServiceContainer extends CrudServiceContainer<LinkedAccount>
{
    constructor( private linkedAccountFactory: LinkedAccountFactory,
                 private linkedAccountCrudService: LinkedAccountCrudService )
    {
        super( new ModelObjectChangeService<LinkedAccount>(), linkedAccountFactory, linkedAccountCrudService );
        this.crudDialogService = new CrudDialogService<LinkedAccount>( this.linkedAccountFactory, this.crudFormButtonsService );
    }
}
