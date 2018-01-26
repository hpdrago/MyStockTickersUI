import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { StockNotesStateStore } from './stock-notes-state-store';
import { StockNotesController } from './stock-notes-controller';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';
import { StockNotesCrudActionHandler } from './stock-notes-crud-action-handler';
import { StockToBuyCrudActionHandler } from '../stock-to-buy/stock-to-buy-action-handler';
import { StockToBuyController } from '../stock-to-buy/stock-to-buy-controller';
import { StockToBuyStateStore } from '../stock-to-buy/stock-to-buy-state-store';
import { CookieService } from 'ngx-cookie-service';
import { StockModelObjectTableComponent } from '../common/stock-model-object-table-component';
import { StockNotes } from '../../model/entity/stock-notes';
import { StockNotesActionTaken } from '../../common/stock-notes-action-taken.enum';
import { BullOrBear } from '../../common/bull-or-bear.enum';
import { TableLoadingStrategy } from '../common/table-loading-strategy';

/**
 * This is the StockCompany Notes that displays in its own tab.
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-notes-table',
        styleUrls: ['./stock-notes-table.component.css'],
        templateUrl: './stock-notes-table.component.html',
        providers: [StockNotesStateStore, StockNotesController, StockNotesCrudActionHandler,
                    StockToBuyStateStore, StockToBuyController, StockToBuyCrudActionHandler]
    } )
export class StockNotesTableComponent  extends StockModelObjectTableComponent<StockNotes>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockNotesStateStore} stockNotesStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCrudService} stockNotesCrudService
     * @param {CookieService} cookieService
     */
    constructor( protected toaster: ToastsManager,
                 protected stockNotesStateStore: StockNotesStateStore,
                 protected stockNotesController: StockNotesController,
                 protected stockNotesFactory: StockNotesFactory,
                 protected stockNotesCrudService: StockNotesCrudService,
                 protected cookieService: CookieService )
    {
        super( TableLoadingStrategy.LAZY_ON_CREATE,
               toaster,
               stockNotesStateStore,
               stockNotesController,
               stockNotesFactory,
               stockNotesCrudService,
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
