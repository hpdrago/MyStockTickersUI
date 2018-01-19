/**
 * Created by mike on 11/11/2017
 */
import { Injectable } from "@angular/core";
import { SessionService } from "../session.service";
import { CrudRestService } from "./crud-rest.serivce";
import { AppConfigurationService } from "../app-configuration.service";
import { Http } from "@angular/http";
import { LinkedAccount } from "../../model/entity/linked-account";
import { LinkedAccountFactory } from "../../model/factory/linked-account.factory";

/**
 * This service handles all of the linked account related CRUD actions.
 */
@Injectable()
export class LinkedAccountCrudService extends CrudRestService<LinkedAccount>
{
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 private linkedAccountFactory: LinkedAccountFactory )
    {
        super( http, sessionService, appConfig, linkedAccountFactory );
    }

    protected getContextBaseURL(): string
    {
        return '/linkedAccount';
    }
}
