import { ChangeDetectorRef, Component } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { ToastsManager } from "ng2-toastr";
import { StockNotesTableComponent } from "../stock-notes/stock-notes-table.component";
import { StockNotesStateStore } from '../stock-notes/stock-notes-state-store';
import { StockNotesController } from '../stock-notes/stock-notes-controller';
import { StockNotesFactory } from '../../model/factory/stock-notes.factory';
import { StockNotesCrudService } from '../../service/crud/stock-notes-crud.service';
import { StockQuoteCacheService } from '../../service/cache/stock-quote-cache.service';
import { CookieService } from 'ngx-cookie-service';
import { CrudTableColumn } from '../crud/table/crud-table-column';

/**
 * This is the StockCompany Notes that displays on the dashboard
 *
 * Created by mike on 10/30/2016.
 */
@Component(
{
    selector:    'stock-notes-quad-view-table',
    templateUrl: '../stock-notes/stock-notes-table.component.html'
})
export class StockNotesQuadViewTableComponent extends StockNotesTableComponent
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {StockNotesStateStore} stockNotesStateStore
     * @param {StockNotesController} stockNotesController
     * @param {StockNotesFactory} stockNotesFactory
     * @param {StockNotesCrudService} stockNotesCrudService
     * @param {StockQuoteCacheService} stockQuoteCacheService
     * @param {CookieService} cookieService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected stockNotesStateStore: StockNotesStateStore,
                 protected stockNotesController: StockNotesController,
                 protected stockNotesFactory: StockNotesFactory,
                 protected stockNotesCrudService: StockNotesCrudService,
                 protected cookieService: CookieService )
    {
        super( changeDetector,
               toaster,
               stockNotesStateStore,
               stockNotesController,
               stockNotesFactory,
               stockNotesCrudService,
               cookieService );
        this.showHeaderButtons = false;
        this.displayStockSearchFilter = false;
    }

    /**
     * Override to get the dashboard columns.
     * @return {CrudTableColumn[]}
     */
    protected getDefaultColumns(): CrudTableColumn[]
    {
        return this.stockNotesFactory
                   .newModelObject()
                   .getDashboardDefaultColumns()
                   .toArray();
    }

    /**
     * Override to get the dashboard default additional columns.
     * @return {CrudTableColumn[]}
     */
    protected getAdditionalColumns(): CrudTableColumn[]
    {
        return this.stockNotesFactory
                   .newModelObject()
                   .getDashboardAdditionalColumns()
                   .toArray();
    }
}
