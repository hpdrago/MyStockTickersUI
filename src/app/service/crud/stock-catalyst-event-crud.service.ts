import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { StockCatalystEventFactory } from "../../model/factory/stock-catalyst-event.factory";
import { isNullOrUndefined } from "util";
import { PaginationURL } from "../../common/pagination-url";

/**
 * This class provides all CRUD REST services for Stock Catalyst Events.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockCatalystEventCrudService extends CrudRestService<StockCatalystEvent>
{
    private urlPath = "/stockCatalystEvent"

    constructor ( protected http: Http,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected stockCatalystEventFactory: StockCatalystEventFactory )
    {
        super( http, sessionService, appConfig, stockCatalystEventFactory );
    }

    protected getContextURL( stockCatalystEvent: StockCatalystEvent ): string
    {
        return this.urlPath;
    }

    protected getReadModelObjectListUrl( stockCatalystEvent: StockCatalystEvent ): string
    {
        var url: string = super.getReadModelObjectListUrl( stockCatalystEvent );
        if ( !isNullOrUndefined( stockCatalystEvent.tickerSymbol ) )
        {
            url += '/' + stockCatalystEvent.tickerSymbol;
        }
        return url;
    }
}
