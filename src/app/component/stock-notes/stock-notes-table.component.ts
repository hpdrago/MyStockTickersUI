import { StockNotes } from "../../model/entity/stock-notes";
import { SessionService } from "../../service/session.service";
import { ToastsManager } from "ng2-toastr";
import { StockNotesActionTaken } from "../../common/stock-notes-action-taken.enum";
import { BullOrBear } from "../../common/bull-or-bear.enum";
import { StockNotesStateStore } from './stock-notes-state-store';
import { StockNotesController } from './stock-notes-controller';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';
import { TableLoadingStrategy } from '../common/table-loading-strategy';
import { StockModelObjectTableComponent } from '../common/stock-model-object-table-component';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { CookieService } from 'ngx-cookie-service';

/**
 * This is the base class for StockCompany Notes tables.
 *
 * Created by mike on 10/30/2016.
 */
export abstract class StockNotesTableComponent extends StockModelObjectTableComponent<StockNotes>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {ToastsManager} toaster
     * @param {StockNotesStateStore} stockNotesStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCrudService} stockNotesCrudService
     * @param {StockQuoteCacheService} stockQuoteCacheService
     * @param {CookieService} cookieService
     */
    protected constructor( protected session: SessionService,
                           protected toaster: ToastsManager,
                           protected stockNotesStateStore: StockNotesStateStore,
                           protected stockNotesController: StockNotesController,
                           protected stockNotesFactory: StockNotesFactory,
                           protected stockNotesCrudService: StockNotesCrudService,
                           protected stockQuoteCacheService: StockQuoteCacheService,
                           protected cookieService: CookieService )
    {
        super( TableLoadingStrategy.LAZY_ON_CREATE,
               toaster,
               stockNotesStateStore,
               stockNotesController,
               stockNotesFactory,
               stockNotesCrudService,
               stockQuoteCacheService,
               cookieService );
    }

    protected getActionTaken( actionTaken: string )
    {
        //this.log( 'getActionTaken: ' + actionTaken );
        return StockNotesActionTaken.getName( actionTaken );
    }

    protected getBullOrBear( bullOrBear: string )
    {
        return BullOrBear.getName( bullOrBear );
    }
}
