import { ReadRestService } from "./read-rest.service";
import { Http } from "@angular/http";
import { SessionService } from "../session.service";
import { AppConfigurationService } from "../app-configuration.service";
import { StockNotesCountFactory } from "../../model/factory/stock-note-count.factory";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { StockNoteCount } from "../../model/entity/stock-note-count";
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockNotesCountService extends ReadRestService<StockNoteCount>
{
    private contextUrl = "/stockNoteCounts"

    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfigurationService
     * @param {restErrorReporter} restErrorReporter
     * @param {StockNotesCountFactory} modelObjectFactory
     */
    constructor( protected http: HttpClient,
                 protected sessionService: SessionService,
                 protected appConfigurationService: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 protected modelObjectFactory: StockNotesCountFactory )
    {
        super( http,
               sessionService,
               appConfigurationService,
               restErrorReporter,
               modelObjectFactory );
    }

    protected getContextBaseURL(): string
    {
        return this.contextUrl;
    }

    public getStockNoteCounts( customerId: string ): Observable<Array<StockNoteCount>>
    {
        let methodName = "getStockNotes";
        this.logger.debug( `${methodName} customerId: ${customerId}` );
        var stockNoteCount: StockNoteCount = this.modelObjectFactory.newModelObject();
        stockNoteCount.customerId = customerId;
        return super.getModelObjectList( stockNoteCount );
    }

}
