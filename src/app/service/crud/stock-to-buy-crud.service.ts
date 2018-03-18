import { Injectable } from "@angular/core";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { CrudRestService } from "./crud-rest.serivce";
import { StockToBuy } from "../../model/entity/stock-to-buy";
import { StockToBuyFactory } from "../../model/factory/stock-to-buy.factory";
import { isNullOrUndefined } from "util";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';

/**
 * This class provides all CRUD REST services for Stock To Buy.
 *
 * Created by mike on 10/17/2017.
 */
@Injectable()
export class StockToBuyCrudService extends CrudRestService<StockToBuy>
{
    private urlPath = "/stockToBuy"

    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {restErrorReporter} restErrorReporter
     * @param {StockToBuyFactory} stockToBuyFactory
     */
    constructor ( protected http: HttpClient,
                  protected sessionService: SessionService,
                  protected appConfig: AppConfigurationService,
                  protected restErrorReporter: RestErrorReporter,
                  protected stockToBuyFactory: StockToBuyFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               stockToBuyFactory );
    }

    protected getContextBaseURL(): string
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
