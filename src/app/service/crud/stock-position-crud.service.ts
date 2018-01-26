/**
 * Created by mike on 11/11/2017
 */
import { Injectable } from "@angular/core";
import { SessionService } from "../session.service";
import { CrudRestService } from "./crud-rest.serivce";
import { AppConfigurationService } from "../app-configuration.service";
import { Http } from "@angular/http";
import { StockPosition } from '../../model/entity/stock-position';
import { StockPositionFactory } from '../../model/factory/stock-position-factory';
import { KeyValuePairs } from '../../common/key-value-pairs';
import { RestErrorReporter } from '../rest-error-reporter';
import { HttpClient } from '@angular/common/http';
import { RankCalculator } from '../../common/rank-calculator';
import { Observable } from 'rxjs/Observable';

/**
 * This service handles all of the stock position related actions.
 */
@Injectable()
export class StockPositionCrudService extends CrudRestService<StockPosition>
{
    /**
     * Used to calculate the rank for each stock from a set of stocks
     * @type {RankCalculator}
     */
    private rankCalculator: RankCalculator = new RankCalculator();

    /**
     * Constructor.
     * @param {Http} http
     * @param {SessionService} sessionService
     * @param {AppConfigurationService} appConfig
     * @param {restErrorReporter} restErrorReporter
     * @param {StockPositionFactory} stockPositionFactory
     */
    constructor( protected http: HttpClient,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 protected restErrorReporter: RestErrorReporter,
                 private stockPositionFactory: StockPositionFactory )
    {
        super( http,
               sessionService,
               appConfig,
               restErrorReporter,
               stockPositionFactory  );
    }

    /**
     * The context of all stockPosition URL's
     * @return {string}
     */
    protected getContextBaseURL(): string
    {
        return '/stockPosition';
    }

    /**
     * Check for the ticker symbol being set.
     * @param {StockNotes} stockNotes
     * @returns {string}
     */
    protected getContextURLKeyValues( stockPosition: StockPosition ): KeyValuePairs<string,any>
    {
        let keyColumns: KeyValuePairs<string,any> = super.getContextURLKeyValues( stockPosition );
        keyColumns.addPair( "linkedAccountId", stockPosition.linkedAccountId );
        keyColumns.addPair( "tradeItAccountId", stockPosition.tradeItAccountId );
        return keyColumns;
    }

    /**
     * Retrieves the stock positions.
     * @param {StockPosition} modelObject
     * @return {Observable<Array<StockPosition>>}
     */
    public getModelObjectList( modelObject: StockPosition ): Observable<Array<StockPosition>>
    {
        return super.getModelObjectList( modelObject )
                    .map( (stockPositions: Array<StockPosition>) =>
                    {
                        this.rankCalculator
                            .calculateRank(stockPositions)
                        return stockPositions;
                    });
    }
}
