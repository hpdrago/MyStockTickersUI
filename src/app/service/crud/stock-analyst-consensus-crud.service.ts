import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { StockAnalystConsensusFactory } from "../../model/factory/stock-analyst-consensus.factory";
import { isNullOrUndefined } from "util";
import { PaginationURL } from "../../common/pagination-url";

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
                  protected appConfig: AppConfigurationService,
                  protected stockAnalystConsensusFactory: StockAnalystConsensusFactory )
    {
        super( http, sessionService, appConfig, stockAnalystConsensusFactory );
    }

    protected getContextURL( stockAnalysisConensus: StockAnalystConsensus ): string
    {
        return this.urlPath;
    }

    protected getReadModelObjectListUrl( stockAnalystConsensus: StockAnalystConsensus ): string
    {
        var url: string = super.getReadModelObjectListUrl( stockAnalystConsensus );
        if ( !isNullOrUndefined( stockAnalystConsensus.tickerSymbol ))
        {
            url += '/' + stockAnalystConsensus.tickerSymbol;
        }
        return url;
    }
}
