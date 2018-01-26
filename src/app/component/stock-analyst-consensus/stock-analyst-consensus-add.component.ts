import { BaseComponent } from '../common/base.component';
import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { StockAnalystConsensusController } from './stock-analyst-consensus-controller';

/**
 * Component to display the stock notes dialog to create a new note.
 */
@Component
({
    template: `<stock-analyst-consensus-dialog [modal]="false"
                                               [showContinuousAddButton]="true"
                                               [showAddButton]="false"
                                               [showCloseButton]="false"> 
               </stock-analyst-consensus-dialog>`
 })
export class StockAnalystConsensusAddComponent extends BaseComponent implements OnInit
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusController} stockAnalystConsensusController
     */
    public constructor( protected toaster: ToastsManager,
                        private stockAnalystConsensusController: StockAnalystConsensusController )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
        this.stockAnalystConsensusController
            .sendTableAddButtonClickedEvent();
    }
}
