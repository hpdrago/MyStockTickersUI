/**
 * Created by mike on 3/10/2018
 */
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { ChangeDetectorRef, Component } from '@angular/core';
import { StockAnalystConsensusCrudService } from '../../service/crud/stock-analyst-consensus-crud.service';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { CrudTableEditButtonComponent } from '../crud/table/crud-table-edit-button.component';
import { StockAnalystConsensusStateStore } from '../stock-analyst-consensus/stock-analyst-consensus-state-store';
import { StockAnalystConsensusController } from '../stock-analyst-consensus/stock-analyst-consensus-controller';

@Component
({
     selector: 'stock-analyst-consensus-table-edit-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockAnalystConsensusTableEditButtonComponent extends CrudTableEditButtonComponent<StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {SessionService} session
     * @param {StockAnalystConsensusStateStore} stockAnalystConsensusStateStore
     * @param {StockAnalystConsensusController} stockAnalystConsensusController
     * @param {StockAnalystConsensusFactory} stockAnalystConsensusFactory
     * @param {StockAnalystConsensusCrudService} stockAnalystConsensusCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private session: SessionService,
                 private stockAnalystConsensusStateStore: StockAnalystConsensusStateStore,
                 private stockAnalystConsensusController: StockAnalystConsensusController,
                 private stockAnalystConsensusFactory: StockAnalystConsensusFactory,
                 private stockAnalystConsensusCrudService: StockAnalystConsensusCrudService )
    {
        super( changeDetector,
               toaster,
               stockAnalystConsensusStateStore,
               stockAnalystConsensusController,
               stockAnalystConsensusFactory,
               stockAnalystConsensusCrudService );
    }
}
