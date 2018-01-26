import { BaseComponent } from '../common/base.component';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { StockToBuyController } from './stock-to-buy-controller';

/**
 * Component to display the stock notes dialog to create a new note.
 */
@Component
({
    template: `<stock-to-buy-dialog [modal]="false"
                                    [showContinuousAddButton]="true"
                                    [showAddButton]="false"
                                    [showCloseButton]="false">
               </stock-to-buy-dialog>`
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
