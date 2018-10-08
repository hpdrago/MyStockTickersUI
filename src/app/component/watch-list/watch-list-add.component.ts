import { BaseComponent } from '../common/base.component';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { WatchListController } from './watch-list-controller';

/**
 * Component to display the stock notes dialog to create a new note.
 */
@Component
({
    selector: 'watch-list-add',
    template: `<watch-list-dialog [modal]="false"
                                  [showContinuousAddButton]="true"
                                  [showAddButton]="false"
                                  [showCloseButton]="false">
               </watch-list-dialog>`
 })
export class WatchListAddComponent extends BaseComponent implements OnInit
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {WatchListController} watchListController
     */
    public constructor( protected toaster: ToastsManager,
                        private watchListController: WatchListController )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
        this.watchListController
            .sendTableAddButtonClickedEvent();
    }
}
