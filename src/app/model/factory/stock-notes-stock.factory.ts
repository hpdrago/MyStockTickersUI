import { ModelObjectFactory } from "./model-object.factory";
import { StockNotes } from "../entity/stock-notes";
import { Injectable } from "@angular/core";
import { StockNotesStock } from "../entity/stock-notes-stock";

/**
 * This is the StockNotesStock model object factory
 * Created by mike on 9/3/2017
 */
@Injectable()
export class StockNotesStockFactory extends ModelObjectFactory<StockNotesStock>
{
    /**
     * Create a new StockNotes instance
     * @returns {StockNotes}
     */
    newModelObject(): StockNotesStock
    {
        var stockNoteStock = new StockNotesStock();
        stockNoteStock.stockNotesId = 0;
        stockNoteStock.customerId = 0;
        stockNoteStock.tickerSymbol = '';
        stockNoteStock.stockPrice = 0;
        return stockNoteStock;
    }
}
