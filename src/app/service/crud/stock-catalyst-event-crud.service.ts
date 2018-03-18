import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { StockCatalystEventFactory } from "../../model/factory/stock-catalyst-event.factory";
import { KeyValuePairs } from "../../common/key-value-pairs";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';

/**
 * This class provides all CRUD REST services for Stock Catalyst Events.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockCatalystEventCrudService extends CrudRestService<StockCatalystEvent>
{
    private urlPath = "/stockCatalystEvent"

    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {restErrorReporter} restErrorReporter
     * @param {StockCatalystEventFactory} stockCatalystEventFactory
     */
    constructor ( protected http: HttpClient,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected restErrorReporter: RestErrorReporter,
                  protected stockCatalystEventFactory: StockCatalystEventFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               stockCatalystEventFactory );
    }

    protected getContextBaseURL(): string
    {
        return this.urlPath;
    }

    /**
     * Check for the ticker symbol being set.
     * @param {StockNotes} stockNotes
     * @returns {string}
     */
    protected getContextURLKeyValues( stockCatalystEvent: StockCatalystEvent ): KeyValuePairs<string,any>
    {
        let keyColumns: KeyValuePairs<string,any> = new KeyValuePairs<string, any>();
        if ( stockCatalystEvent.tickerSymbol )
        {
            keyColumns.addPair( "tickerSymbol", stockCatalystEvent.tickerSymbol );
        }
        return keyColumns;
    }
}
