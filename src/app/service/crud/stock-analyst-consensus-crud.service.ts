import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { StockAnalystConsensusFactory } from "../../model/factory/stock-analyst-consensus.factory";
import { isNullOrUndefined } from "util";

/**
 * This class provides all CRUD REST services for Stock Summary.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockAnalystConsensusCrudService extends CrudRestService<StockAnalystConsensus>
{
    private urlPath = "/stockAnalystConsensus"

    constructor ( protected http: Http,
                  protected sessionService: SessionService,
                  protected appConfigurationService: AppConfigurationService,
                  protected stockAnalystConsensusFactory: StockAnalystConsensusFactory )
    {
        super( http, sessionService, appConfigurationService, stockAnalystConsensusFactory );
    }

    protected getCreateModelObjectUrl( baseUrl: string, stockAnalystConsensus: StockAnalystConsensus ): string
    {
        return baseUrl + `${this.urlPath}`;
    }

    protected getReadModelObjectUrl( baseUrl: string, stockAnalystConsensus: StockAnalystConsensus ): string
    {
        return baseUrl + this.urlPath + `/${stockAnalystConsensus.id}`;
    }

    protected getReadModelObjectListUrl( baseUrl: string, stockAnalystConsensus: StockAnalystConsensus ): string
    {
        var url: string = baseUrl + this.urlPath + `/customer/${stockAnalystConsensus.customerId}`;
        if ( !isNullOrUndefined( stockAnalystConsensus.tickerSymbol ))
        {
            url += '/' + stockAnalystConsensus.tickerSymbol;
        }
        return url;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, stockAnalystConsensus: StockAnalystConsensus ): string
    {
        return baseUrl + this.urlPath;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, stockAnalystConsensus: StockAnalystConsensus ): string
    {
        return baseUrl + this.urlPath + `/${stockAnalystConsensus.id}`;
    }

}
