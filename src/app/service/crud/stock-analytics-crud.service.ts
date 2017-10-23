import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockAnalytics } from "../../model/entity/stock-analytics";
import { StockAnalyticsFactory } from "../../model/factory/stock-analytics.factory";

/**
 * This class provides all CRUD REST services for Stock Summary.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockAnalyticsCrudService extends CrudRestService<StockAnalytics>
{
    private urlPath = "/stockAnalytics"

    constructor ( protected http: Http,
                  protected sessionService: SessionService,
                  protected appConfigurationService: AppConfigurationService,
                  protected stockAnalyticsFactory: StockAnalyticsFactory )
    {
        super( http, sessionService, appConfigurationService, stockAnalyticsFactory );
    }

    protected getCreateModelObjectUrl( baseUrl: string, stockAnalytics: StockAnalytics ): string
    {
        return baseUrl + `${this.urlPath}`;
    }

    protected getReadModelObjectUrl( baseUrl: string, stockAnalytics: StockAnalytics ): string
    {
        return baseUrl + this.urlPath + `/${stockAnalytics.id}`;
    }

    protected getReadModelObjectListUrl( baseUrl: string, stockAnalytics: StockAnalytics ): string
    {
        return baseUrl + this.urlPath + `/customer/${stockAnalytics.customerId}`;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, stockAnalytics: StockAnalytics ): string
    {
        return baseUrl + this.urlPath;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, stockAnalytics: StockAnalytics ): string
    {
        return baseUrl + this.urlPath + `/${stockAnalytics.id}`;
    }

}
