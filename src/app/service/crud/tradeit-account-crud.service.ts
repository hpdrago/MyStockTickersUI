/**
 * Created by mike on 11/11/2017
 */
import { Injectable } from "@angular/core";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { SessionService } from "../session.service";
import { CrudRestService } from "./crud-rest.serivce";
import { AppConfigurationService } from "../app-configuration.service";
import { Http } from "@angular/http";
import { TradeItAccountFactory } from "../../model/factory/tradeit-account.factory";
import { RestErrorReporter } from '../rest-error-reporter';

/**
 * This service handles all of the account related actions.
 */
@Injectable()
export class TradeItAccountCrudService extends CrudRestService<TradeItAccount>
{
    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {restErrorReporter} restErrorReporter
     * @param {TradeItAccountFactory} customerAccountFactory
     */
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 private customerAccountFactory: TradeItAccountFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               customerAccountFactory );
    }

    protected getContextBaseURL(): string
    {
        return '/tradeItAccount';
    }

}
