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
import { RestErrorReporter } from '../rest-error-reporter';

/**
 * This service handles all of the linked account related CRUD actions.
 */
@Injectable()
export class LinkedAccountCrudService extends CrudRestService<LinkedAccount>
{
    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {restErrorReporter} restErrorReporter
     * @param {LinkedAccountFactory} linkedAccountFactory
     */
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 private linkedAccountFactory: LinkedAccountFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               linkedAccountFactory );
    }

    protected getContextBaseURL(): string
    {
        return '/linkedAccount';
    }
}
