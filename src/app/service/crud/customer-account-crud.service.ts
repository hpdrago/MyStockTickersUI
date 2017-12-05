/**
 * Created by mike on 11/11/2017
 */
import { Injectable } from "@angular/core";
import { CustomerAccount } from "../../model/entity/customer-account";
import { SessionService } from "../session.service";
import { CrudRestService } from "./crud-rest.serivce";
import { AppConfigurationService } from "../app-configuration.service";
import { Http } from "@angular/http";
import { CustomerAccountFactory } from "../../model/factory/customer-account.factory";

/**
 * This service handles all of the account related actions.
 */
@Injectable()
export class CustomerAccountCrudService extends CrudRestService<CustomerAccount>
{
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 private customerAccountFactory: CustomerAccountFactory )
    {
        super( http, sessionService, appConfig, customerAccountFactory );
    }

    protected getContextURL( modelObject: CustomerAccount ): string
    {
        return '/account';
    }

}
