import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { StockToBuyFactory } from "../../model/factory/stock-to-buy.factory";
import { isNullOrUndefined } from "util";
import { PaginationURL } from "../../common/pagination-url";

/**
 * This class provides all CRUD REST services for Stock To Buy.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockToBuyCrudService extends CrudRestService<StockToBuy>
{
    private urlPath = "/stockToBuy"

    constructor ( protected http: Http,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected stockToBuyFactory: StockToBuyFactory )
    {
        super( http, sessionService, appConfig, stockToBuyFactory );
    }

    protected getContextURL( stockToBuy: StockToBuy ): string
    {
        return this.urlPath;
    }

    protected getReadModelObjectListUrl( stockToBuy: StockToBuy ): string
    {
        var url: string = super.getReadModelObjectListUrl( stockToBuy );
        if ( !isNullOrUndefined( stockToBuy.tickerSymbol ) )
        {
            url += '/' + stockToBuy.tickerSymbol;
        }
        return url;
    }
}
