import { Injectable } from "@angular/core";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';
import { KeyValuePairs } from '../../common/key-value-pairs';
import { GainsLosses } from '../../model/entity/gains-losses';
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { Observable } from 'rxjs/Observable';
import { StringDTO } from '../../model/entity/string-d-t-o';

/**
 * This class provides all CRUD REST services for StockCompany To Buy.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class GainsLossesCrudService extends CrudRestService<GainsLosses>
{
    private urlPath = "/gainsLosses";

    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {restErrorReporter} restErrorReporter
     * @param {GainsLossesFactory} gainsLossesFactory
     */
    constructor ( protected http: HttpClient,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected restErrorReporter: RestErrorReporter,
                  protected gainsLossesFactory: GainsLossesFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               gainsLossesFactory );
    }

    protected getContextBaseURL(): string
    {
        return this.urlPath;
    }

    /**
     * Modify the url parameters based on gainsLosses key fields.
     * @param {GainsLosses} gainsLosses
     * @return {KeyValuePairs<string, any>}
     */
    protected getContextURLKeyValues( gainsLosses: GainsLosses ): KeyValuePairs<string,any>
    {
        let keyColumns: KeyValuePairs<string,any> = new KeyValuePairs<string, any>();
        keyColumns.addPair( "tickerSymbol", gainsLosses.tickerSymbol );
        return keyColumns;
    }

    /**
     * Get the URL to upload a file.
     * @return {string}
     */
    public getImportURL(): string
    {
        return this.getCompleteURL( this.getContextBaseURL() + '/import',
                                    this.getCustomerURL() );
    }

    /**
     * Get the import results.
     * @return {Observable<string>}
     */
    public getImportResults(): Observable<StringDTO>
    {
        let methodName = 'getImportResults';
        this.log( methodName )
        let url = this.getCompleteURL( this.getContextBaseURL() + '/importResults',
                                                 this.getCustomerURL() );
        return this.http
                   .get<StringDTO>( url );
    }
}
