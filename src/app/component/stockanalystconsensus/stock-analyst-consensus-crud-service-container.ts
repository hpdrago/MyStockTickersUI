import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { StockAnalystConsensusCrudService } from "../../service/crud/stock-analyst-consensus-crud.service";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { StockAnalystConsensusFactory } from "../../model/factory/stock-analyst-consensus.factory";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";
import { CrudDialogService } from "../crud/dialog/crud-dialog.service";
import { ToastsManager } from "ng2-toastr";

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
        super( new ModelObjectChangeService<StockAnalystConsensus>(),
               _stockAnalystConsensusFactory,
               _stockAnalystConsensusCrudService );
        this.crudDialogService = new CrudDialogService<StockAnalystConsensus>( this._stockAnalystConsensusFactory,
                                                                               this.crudFormButtonsService );
        this.crudPanelService = this.crudDialogService;
    }

    get stockAnalystConsensusFactory(): StockAnalystConsensusFactory { return this._stockAnalystConsensusFactory; }

    set stockAnalystConsensusFactory( value: StockAnalystConsensusFactory ) { this._stockAnalystConsensusFactory = value; }

    get stockAnalystConsensusCrudService(): StockAnalystConsensusCrudService { return this._stockAnalystConsensusCrudService; }

    set stockAnalystConsensusCrudService( value: StockAnalystConsensusCrudService ) { this._stockAnalystConsensusCrudService = value; }

}
