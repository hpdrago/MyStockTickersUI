import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { StockAnalystConsensusCrudService } from '../../service/crud/stock-analyst-consensus-crud.service';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';
import { StockAnalystConsensusController } from './stock-analyst-consensus-controller';
import { StockAnalystConsensusStateStore } from './stock-analyst-consensus-state-store';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'stock-analyst-consensus-table-buttons',
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
     * @param {StockAnalystConsensusCrudService} stockAnalystConsensusCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private stockAnalystConsensusStateStore: StockAnalystConsensusStateStore,
                 private stockAnalystConsensusController: StockAnalystConsensusController,
                 private stockAnalystConsensusFactory: StockAnalystConsensusFactory,
                 private stockAnalystConsensusCrudService: StockAnalystConsensusCrudService )
    {
        super( toaster,
               stockAnalystConsensusStateStore,
               stockAnalystConsensusController,
               stockAnalystConsensusFactory,
               stockAnalystConsensusCrudService );
    }
}
