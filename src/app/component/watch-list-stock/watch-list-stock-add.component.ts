import { BaseComponent } from '../common/base.component';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { WatchListStockController } from './watch-list-stock-controller';

/**
 * Component to display the stock notes dialog to create a new note.
 */
@Component
({
    template: `<watch-list-stock-dialog [modal]="false"
                                        [showContinuousAddButton]="true"
                                        [showAddButton]="false"
                                        [showCloseButton]="false">
               </watch-list-stock-dialog>`
 })
export class WatchListStockAddComponent extends BaseComponent implements OnInit
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {WatchListStockController} watchListStockController
     */
    public constructor( protected toaster: ToastsManager,
                        private watchListStockController: WatchListStockController )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
        this.watchListStockController
            .sendTableAddButtonClickedEvent();
    }
}
