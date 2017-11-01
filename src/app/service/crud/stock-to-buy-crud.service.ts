import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { StockToBuyFactory } from "../../model/factory/stock-to-buy.factory";

/**
 * This class provides all CRUD REST services for Stock Summary.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockToBuyCrudService extends CrudRestService<StockToBuy>
{
    private urlPath = "/stockToBuy"

    constructor ( protected http: Http,
                  protected sessionService: SessionService,
                  protected appConfigurationService: AppConfigurationService,
                  protected stockToBuyFactory: StockToBuyFactory )
    {
        super( http, sessionService, appConfigurationService, stockToBuyFactory );
    }

    protected getCreateModelObjectUrl( baseUrl: string, stockToBuy: StockToBuy ): string
    {
        return baseUrl + `${this.urlPath}`;
    }

    protected getReadModelObjectUrl( baseUrl: string, stockToBuy: StockToBuy ): string
    {
        return baseUrl + this.urlPath + `/${stockToBuy.id}`;
    }

    protected getReadModelObjectListUrl( baseUrl: string, stockToBuy: StockToBuy ): string
    {
        return baseUrl + this.urlPath + `/customer/${stockToBuy.customerId}`;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, stockToBuy: StockToBuy ): string
    {
        return baseUrl + this.urlPath;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, stockToBuy: StockToBuy ): string
    {
        return baseUrl + this.urlPath + `/${stockToBuy.id}`;
    }

}