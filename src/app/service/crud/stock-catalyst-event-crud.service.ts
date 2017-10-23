import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { StockCatalystEventFactory } from "../../model/factory/stock-catalyst-event.factory";

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
                  protected appConfigurationService: AppConfigurationService,
                  protected stockCatalystEventFactory: StockCatalystEventFactory )
    {
        super( http, sessionService, appConfigurationService, stockCatalystEventFactory );
    }

    protected getCreateModelObjectUrl( baseUrl: string, stockCatalystEvent: StockCatalystEvent ): string
    {
        return baseUrl + `${this.urlPath}`;
    }

    protected getReadModelObjectUrl( baseUrl: string, stockCatalystEvent: StockCatalystEvent ): string
    {
        return baseUrl + this.urlPath + `/${stockCatalystEvent.id}`;
    }

    protected getReadModelObjectListUrl( baseUrl: string, stockCatalystEvent: StockCatalystEvent ): string
    {
        return baseUrl + this.urlPath + `/customer/${stockCatalystEvent.customerId}`;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, stockCatalystEvent: StockCatalystEvent ): string
    {
        return baseUrl + this.urlPath;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, stockCatalystEvent: StockCatalystEvent ): string
    {
        return baseUrl + this.urlPath + `/${stockCatalystEvent.id}`;
    }

}
