import { StockSectorList } from "../model/stock-sectors.list";
import { Observable } from "rxjs";
import { CrudRestService } from "./crud-rest.serivce";
import { Http } from "@angular/http";
import { SessionService } from "./session.service";
import { AppConfigurationService } from "./app-configuration.service";
import { Injectable } from "@angular/core";

/**
 * This class provides CRUD REST services for StockSectors
 *
 * Created by mike on 12/5/2016.
 */
@Injectable()
export class StockSectorCrudService extends CrudRestService<StockSectorList>
{
    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfigurationService: AppConfigurationService )
    {
        super( http, sessionService, appConfigurationService );
    }

    protected getReadModelObjectListUrl( baseUrl: string, modelObject: StockSectorList ): string
    {
        return  baseUrl + '/stockSectors';
    }
    protected getCreatedModelObjectUrl( baseUrl: string,  modelObject: StockSectorList ): string
    {
        return undefined;
    }

    protected getReadModelObjectUrl( baseUrl: string,  modelObject: StockSectorList ): string
    {
        return baseUrl + '/stockSectors';
    }

    protected getUpdateModelObjectUrl( baseUrl: string,  modelObject: StockSectorList ): string
    {
        return undefined;
    }

    protected getDeleteModelObjectUrl( baseUrl: string,  modelObject: StockSectorList ): string
    {
        return undefined;
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