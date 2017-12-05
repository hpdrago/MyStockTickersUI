import {Component, OnInit, ViewChild} from "@angular/core";
import {ToastsManager} from "ng2-toastr";
import {StockNoteCount} from "../../model/entity/stock-note-count";
import {StockNotesTableComponent} from "./stock-notes-table.component";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";
import { SessionService } from "../../service/session.service";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { StockNotes } from "../../model/entity/stock-notes";
import { StockNotesActionTaken } from "../../common/stock-notes-action-taken.enum";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";

/**
 * This class contains the UI for listing the user's portfolios.
 *
 * Created by mike on 10/23/2016.
 */
@Component(
{
    selector:    'stock-note-counts',
    templateUrl: './stocks.note.count-table.component.html'
})
export class StockNotesCountTableComponent extends CrudTableComponent<StockNotes>
{
    @ViewChild(StockNotesTableComponent)
    private stockNotesTableComponent: StockNotesTableComponent;

    private stockNoteCounts: Array<StockNoteCount>

    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
                 private stockNotesCrudServiceContainer: StockNotesCrudServiceContainer )
    {
        super( false, toaster, stockNotesCrudServiceContainer );
    }

    /**
     * Load the portfolios when this component is created
     */
    public ngOnInit(): void
    {
        this.loadTable();
    }

    /**
     * This method is called when the user has clicked on a stock note entry in the table.
     * The notes for the stock will be retrieved and loaded into the stock notes table
     * @param stockNoteCount
     */
    protected onRowSelect( stockNoteCount: StockNoteCount ): void
    {
        this.logger.log( 'onRowSelect ' + JSON.stringify( stockNoteCount ));
        //this.stockNotesTableComponent.loadStockNotesForStock( stockNoteCount );
    }

    private getActionTaken( actionTaken: string )
    {
        return StockNotesActionTaken.getName( actionTaken );
    }

    /**
     * Load the portfolios for the customer
     */
    protected loadTable()
    {
        this.stockNotesCrudServiceContainer
            .stockNoteCountService
            .getStockNoteCounts( this.session.getLoggedInUserId() )
            .subscribe( stockNoteCounts =>
            {
                this.stockNoteCounts = stockNoteCounts
                this.logger.log( "loadTable: " + JSON.stringify( this.stockNoteCounts));
                this.logger.log( "loadTable length: " + this.stockNoteCounts.length );
                this.logger.log( "loadTable[0]: " + JSON.stringify( this.stockNoteCounts[0] ));
                this.logger.log( "loadTable[0]: " + this.stockNoteCounts);
                //this.initializeMenuBar();
            }, //Bind to view
            err =>
            {
                this.reportRestError( err );
            });
    }

}
