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

/**
 * This service handles all of the account related actions.
 */
@Injectable()
export class TradeItAccountCrudService extends CrudRestService<TradeItAccount>
{
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 private customerAccountFactory: TradeItAccountFactory )
    {
        super( http, sessionService, appConfig, customerAccountFactory );
    }

    protected getContextBaseURL(): string
    {
        return '/tradeItAccount';
    }

}
