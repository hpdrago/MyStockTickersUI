import { BaseComponent } from '../common/base.component';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { StockToBuyController } from './stock-to-buy-controller';
import { StockToBuyStateStore } from './stock-to-buy-state-store';
import { StockToBuyCrudActionHandler } from './stock-to-buy-action-handler';

/**
 * Component to display the stock notes dialog to create a new note.
 */
@Component
({
    template: `<stock-to-buy-dialog></stock-to-buy-dialog>`,
    providers: [StockToBuyController, StockToBuyStateStore, StockToBuyCrudActionHandler]
 })
export class StockToBuyAddComponent extends BaseComponent implements OnInit
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockToBuyController} stockToBuyController
     */
    public constructor( protected toaster: ToastsManager,
                        private stockToBuyController: StockToBuyController )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
        this.stockToBuyController
            .sendTableAddButtonClickedEvent();
    }
}
