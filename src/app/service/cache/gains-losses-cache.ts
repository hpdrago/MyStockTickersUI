import { Injectable } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { GainsLosses } from '../../model/entity/gains-losses';
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { Observable } from 'rxjs/Observable';
import { GainsLossesCrudService } from '../crud/gains-losses-crud.service';
import { AsyncCrudCacheService } from './async-crud-cache.service';
import { GainsLossesCrudActionHandler } from '../../component/gains-losses/gains-losses-action-handler';

/**
 * Contains all of the gains/losses for a single customer.
 * This information is cached because it contains a limited number of stocks and they are not updated that often.
 *
 * Created by mike on 3/24/2018
 */
@Injectable()
export class GainsLossesCache extends AsyncCrudCacheService<string, GainsLosses>
{
    public constructor( protected toaster: ToastsManager,
                        protected gainsLossesFactory: GainsLossesFactory,
                        protected gainsLossesCrudService: GainsLossesCrudService,
                        private gainsLossesCrudActionHandler: GainsLossesCrudActionHandler )
    {
        super( toaster,
               gainsLossesFactory,
               gainsLossesCrudActionHandler );
    }

    /**
     * Get the gains and losses from the backend.
     * @param {string} tickerSymbol
     * @return {Observable<GainsLosses>}
     */
    protected fetchCachedDataFromBackend( tickerSymbol: string ): Observable<GainsLosses>
    {
        let gainsLosses = new GainsLosses();
        gainsLosses.tickerSymbol = tickerSymbol;
        return this.gainsLossesCrudService
                   .getModelObject( gainsLosses );
    }

    /**
     * Check the key to make sure it's valid
     * @param {string} key
     */
    protected checkKey( key: string ): void
    {
        super.checkKey( key );
        if ( key.length == 0 )
        {
            throw ReferenceError( 'Key is empty' );
        }
    }
}
