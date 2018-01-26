/**
 * Created by mike on 11/11/2017
 */
import { Injectable } from "@angular/core";
import { SessionService } from "../session.service";
import { CrudRestService } from "./crud-rest.serivce";
import { AppConfigurationService } from "../app-configuration.service";
import { LinkedAccount } from "../../model/entity/linked-account";
import { LinkedAccountFactory } from "../../model/factory/linked-account.factory";
import { RestErrorReporter } from '../rest-error-reporter';
import { KeyValuePairs } from '../../common/key-value-pairs';
import { Observable } from 'rxjs/Observable';
import { LoadingStatus } from '../../model/common/loading-status';
import { HttpClient } from '@angular/common/http';

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
    constructor( protected http: HttpClient,
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

    /**
     * Loads the updated linked account.
     * @param {LinkedAccount} linkedAccount
     * @return {Observable<Array<LinkedAccount>>}
     */
    public getUpdatedLinkedAccount( linkedAccount: LinkedAccount ): Observable<LinkedAccount>
    {
        let url = this.getCompleteURL( this.getContextURLFrom( "/getAccountOverview", linkedAccount ),
                                       this.getCustomerURL() );
        return this.httpRequestModelObject( url );
    }

    /**
     * Need to add the associate TradeIt account to the URL.
     * @param {LinkedAccount} linkedAccount
     * @return {KeyValuePairs<string, any>}
     */
    protected getContextURLKeyValues( linkedAccount: LinkedAccount ): KeyValuePairs<string, any>
    {
        let keyColumns: KeyValuePairs<string,any> = super.getContextURLKeyValues( linkedAccount );
        keyColumns.addPair( "tradeItAccountId", linkedAccount.tradeItAccountId );
        return keyColumns;
    }

    /**
     * Override the loadingData status modelObjectRows because we need to retrieve the updated linked account that contains the
     * account overview information.
     * @return {LoadingStatus}
     */
    protected getInitialLoadingStatus(): string
    {
        return LoadingStatus.getName( LoadingStatus.LOADING );
    }

    protected getContextBaseURL(): string
    {
        return '/linkedAccount';
    }
}
