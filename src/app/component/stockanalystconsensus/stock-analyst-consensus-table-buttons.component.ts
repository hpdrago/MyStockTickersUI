import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { StockAnalystConsensusStateStore } from './stock-analyst-consensus-state-store';
import { StockAnalystConsensusController } from './stock-analyst-consensus-controller';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-analyst-consensus-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class StockAnalystConsensusTableButtonsComponent extends CrudTableButtonsComponent<StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockAnalystConsensusStateStore} stockAnalystConsensusStateStore
     * @param {StockAnalystConsensusController} stockAnalystConsensusController
     * @param {StockAnalystConsensusFactory} stockAnalystConsensusFactory
     */
    constructor( protected toaster: ToastsManager,
                 private stockAnalystConsensusStateStore: StockAnalystConsensusStateStore,
                 private stockAnalystConsensusController: StockAnalystConsensusController,
                 private stockAnalystConsensusFactory: StockAnalystConsensusFactory )
    {
        super( toaster,
               stockAnalystConsensusStateStore,
               stockAnalystConsensusController,
               stockAnalystConsensusFactory );
    }

    protected getAddButtonLabel(): string
    {
        return "Add Consensus";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Consensus";
    }

}
