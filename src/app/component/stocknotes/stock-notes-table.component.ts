import { Component } from "@angular/core";
import { StockNotes } from "../../model/entity/stock-notes";
import { SessionService } from "../../service/crud/session.service";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import {StockNoteCount} from "../../model/entity/stock-note-count";
import { StockNotesCrudServiceContainer } from "./stock-notes-crud-service-container";

/**
 * This component lists all of the stocks for a stockNote
 *
 * Created by mike on 10/30/2016.
 */
@Component(
{
    selector:    'stock-notes-table',
    styleUrls: ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: './stock-notes-table.component.html'
})
export class StockNotesTableComponent extends CrudTableComponent<StockNotes>
{
    private stockNote: StockNotes;
    private title: string = 'StockNotes';

  constructor( protected toaster: ToastsManager,
               protected stockNotesServiceContainer: StockNotesCrudServiceContainer,
               protected session: SessionService )
  {
    super( toaster, stockNotesServiceContainer );
  }

    private getAddButtonText(): string
    {
        return `Add StockNote`;
    }

  /**
   * Load the stocks notes for the stock identified by stockNoteCount.tickerSymbol
   * @param stockNoteCount
   */
  public loadStockNotes( stockNoteCount: StockNoteCount )
  {
      this.logger.log( 'loadStockNote ' + JSON.stringify( stockNoteCount ));
       this.title = stockNoteCount.tickerSymbol + " Notes for "; //+ this.stockNote.tickerSymbol;
       this.stockNotesServiceContainer
           .stockNoteCrudService
           .getStockNotes( stockNoteCount.customerId, stockNoteCount.tickerSymbol )
           .subscribe( (stocks: StockNotes[]) =>
           {
               if ( stocks.length > 0 )
               {
                   this.rows = stocks;
               }
               else
               {
                   this.rows = [];
               }
           },
           error =>
           {
              this.reportRestError( error );
           });
      }
}
