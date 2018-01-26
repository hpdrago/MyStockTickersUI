import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { StockAnalystConsensusFactory } from "../../model/factory/stock-analyst-consensus.factory";
import { KeyValuePairs } from "../../common/key-value-pairs";
import { RestErrorReporter } from '../rest-error-reporter';

/**
 * This class provides all CRUD REST services for Stock Summary.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockAnalystConsensusCrudService extends CrudRestService<StockAnalystConsensus>
{
    private urlPath = "/stockAnalystConsensus"

    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {restErrorReporter} restErrorReporter
     * @param {StockAnalystConsensusFactory} stockAnalystConsensusFactory
     */
    constructor ( protected http: Http,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected restErrorReporter: RestErrorReporter,
                  protected stockAnalystConsensusFactory: StockAnalystConsensusFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               stockAnalystConsensusFactory );
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
    protected getContextURLKeyValues( stockAnalystConsensus: StockAnalystConsensus ): KeyValuePairs<string,any>
    {
        let keyColumns: KeyValuePairs<string,any> = new KeyValuePairs<string, any>();
        if ( stockAnalystConsensus.tickerSymbol )
        {
            keyColumns.addPair( "tickerSymbol", stockAnalystConsensus.tickerSymbol );
        }
        return keyColumns;
    }
}
