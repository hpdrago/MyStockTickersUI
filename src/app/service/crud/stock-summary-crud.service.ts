import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockSummary } from "../../model/entity/stock-summary";
import { StockSummaryFactory } from "../../model/factory/stock-summary.factory";

/**
 * This class provides all CRUD REST services for Stock Summary.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockSummaryCrudService extends CrudRestService<StockSummary>
{
    private urlPath = "/stockSummary"

    constructor ( protected http: Http,
                  protected sessionService: SessionService,
                  protected appConfigurationService: AppConfigurationService,
                  protected stockSummaryFactory: StockSummaryFactory )
    {
        super( http, sessionService, appConfigurationService, stockSummaryFactory );
    }

    protected getCreateModelObjectUrl( baseUrl: string, stockSummary: StockSummary ): string
    {
        return baseUrl + `${this.urlPath}`;
    }

    protected getReadModelObjectUrl( baseUrl: string, stockSummary: StockSummary ): string
    {
        return baseUrl + this.urlPath + `/${stockSummary.id}`;
    }

    protected getReadModelObjectListUrl( baseUrl: string, stockSummary: StockSummary ): string
    {
        return baseUrl + this.urlPath + `/customer/${stockSummary.customerId}`;
    }

    protected getUpdateModelObjectUrl( baseUrl: string, stockSummary: StockSummary ): string
    {
        return baseUrl + this.urlPath;
    }

    protected getDeleteModelObjectUrl( baseUrl: string, stockSummary: StockSummary ): string
    {
        return baseUrl + this.urlPath + `/${stockSummary.id}`;
    }

}
