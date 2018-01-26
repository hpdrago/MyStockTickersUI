import { Observable } from "rxjs";
import { CrudRestService } from "./crud-rest.serivce";
import { Http } from "@angular/http";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { Injectable } from "@angular/core";
import { StockSectorFactory } from "../../model/factory/stock-sector.factory";
import { StockSectorList } from "../../model/entity/stock-sectors.list";
import { RestErrorReporter } from '../rest-error-reporter';

/**
 * This class provides CRUD REST services for StockSectors
 *
 * Created by mike on 12/5/2016.
 */
@Injectable()
export class StockSectorCrudService extends CrudRestService<StockSectorList>
{
    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfigurationService
     * @param {restErrorReporter} restErrorReporter
     * @param {StockSectorFactory} stockSectorFactory
     */
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfigurationService: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockSectorFactory: StockSectorFactory )
    {
        super( http,
               sessionService,
               appConfigurationService,
               restErrorReporter,
               stockSectorFactory );
    }

    protected getContextBaseURL(): string
    {
        return '/stockSectors'
    }

    /**
     * Get the stock sector map
     * @returns {Observable<R>}
     */
    public getStockSectors(): Observable<StockSectorList>
    {
        return super.getModelObject( null );
    }

}
