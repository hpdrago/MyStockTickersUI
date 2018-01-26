import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { StockAnalystConsensusCrudService } from "../../service/crud/stock-analyst-consensus-crud.service";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { StockAnalystConsensusFactory } from "../../model/factory/stock-analyst-consensus.factory";
import { CrudDialogService } from "../crud/dialog/crud-dialog.service";

/**
 * This is the service container for the StockAnalystConsensus entity.
 */
@Injectable()
export class StockAnalystConsensusCrudServiceContainer extends CrudServiceContainer<StockAnalystConsensus>
{
    /**
     * Constructor.
     * @param {StockAnalystConsensusFactory} _stockAnalystConsensusFactory
     * @param {StockAnalystConsensusCrudService} _stockAnalystConsensusCrudService
     */
    constructor( private _stockAnalystConsensusFactory: StockAnalystConsensusFactory,
                 private _stockAnalystConsensusCrudService: StockAnalystConsensusCrudService )
    {
        super( _stockAnalystConsensusFactory,
               _stockAnalystConsensusCrudService );
        this.crudDialogService = new CrudDialogService<StockAnalystConsensus>( this._stockAnalystConsensusFactory,
                                                                               this.crudStateStore,
                                                                               this.crudFormButtonsService );
        this.crudPanelService = this.crudDialogService;
    }
}
