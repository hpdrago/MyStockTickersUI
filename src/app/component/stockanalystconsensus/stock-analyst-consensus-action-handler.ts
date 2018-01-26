import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Customer } from '../../model/entity/customer';
import { Injectable } from '@angular/core';
import { StockAnalystConsensus } from '../../model/entity/stock-analyst-consensus';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { StockAnalystConsensusCrudService } from '../../service/crud/stock-analyst-consensus-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class StockAnalystConsensusActionHandler extends CrudActionHandler<StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {StockAnalystConsensusCrudService} stockAnalystConsensusCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected stockAnalystConsensusCrudService: StockAnalystConsensusCrudService )
    {
        super( toaster,
               restErrorReporter,
               stockAnalystConsensusCrudService );
    }
}
