import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Injectable } from '@angular/core';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { StockAnalystConsensusCrudService } from '../../service/crud/stock-analyst-consensus-crud.service';
import { Observable } from 'rxjs/Observable';
import { StockAnalystConsensusCache } from '../../service/cache/stock-analyst-consensus-cache';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class StockAnalystConsensusActionHandler extends CrudActionHandler<StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockAnalystConsensusCrudService} stockAnalystConsensusCrudService
     * @param {StockAnalystConsensusCache} stockAnalystConsensusCache
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockAnalystConsensusCrudService: StockAnalystConsensusCrudService,
                 protected stockAnalystConsensusCache: StockAnalystConsensusCache )
    {
        super( toaster,
               restErrorReporter,
               stockAnalystConsensusCrudService );
    }

    /**
     * Adds the model object to the database and also adds to the cache.
     * @param {StockAnalystConsensus} stockAnalystConsensus
     * @return {Observable<StockAnalystConsensus>}
     */
    public addModelObject( stockAnalystConsensus: StockAnalystConsensus ): Observable<StockAnalystConsensus>
    {
        this.stockAnalystConsensusCache
            .addCacheData( stockAnalystConsensus.tickerSymbol, stockAnalystConsensus );
        return super.addModelObject( stockAnalystConsensus );
    }

    /**
     * Updates the cache and the database.
     * @param {StockAnalystConsensus} modelObject
     * @return {Observable<StockAnalystConsensus>}
     */
    public saveModelObject( stockAnalystConsensus: StockAnalystConsensus ): Observable<StockAnalystConsensus>
    {
        this.stockAnalystConsensusCache
            .addCacheData( stockAnalystConsensus.tickerSymbol, stockAnalystConsensus );
        return super.saveModelObject( stockAnalystConsensus );
    }

    /**
     * Deletes from the cache and the database.
     * @param {StockAnalystConsensus} stockAnalystConsensus
     * @return {Observable<void>}
     */
    public deleteModelObject( stockAnalystConsensus: StockAnalystConsensus ): Observable<void>
    {
        this.stockAnalystConsensusCache
            .delete( stockAnalystConsensus.tickerSymbol );
        return super.deleteModelObject( stockAnalystConsensus );
    }
}
