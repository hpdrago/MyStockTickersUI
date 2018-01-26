/**
 * Created by mike on 3/10/2018
 */
import { Component } from '@angular/core';
import { CrudTableCustomizeButtonComponent } from '../crud/table/crud-table-customize-button.component';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { ToastsManager } from 'ng2-toastr';
import { SessionService } from '../../service/session.service';
import { StockAnalystConsensusStateStore } from './stock-analyst-consensus-state-store';
import { StockAnalystConsensusController } from './stock-analyst-consensus-controller';
import { StockAnalystConsensusFactory } from '../../model/factory/stock-analyst-consensus.factory';
import { StockAnalystConsensusCrudService } from '../../service/crud/stock-analyst-consensus-crud.service';

@Component
({
     selector: 'stock-analyst-consensus-table-customize-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class StockAnalystConsensusTableCustomizeButtonComponent extends CrudTableCustomizeButtonComponent<StockAnalystConsensus>
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
    constructor( protected toaster: ToastsManager,
                 private session: SessionService,
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
