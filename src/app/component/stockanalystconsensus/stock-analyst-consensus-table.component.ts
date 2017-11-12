import { Component } from "@angular/core";
import { StockAnalystConsensus } from "../../model/entity/stock-analyst-consensus";
import { CrudTableComponent } from "../crud/table/crud-table.component";
import { ToastsManager } from "ng2-toastr";
import { StockAnalystConsensusCrudServiceContainer } from "./stock-analyst-consensus-crud-service-container";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";

/**
 * This component lists all stock notes
 *
 * Created by mike on 10/30/2016.
 */
@Component(
    {
        selector: 'stock-analyst-consensus-table',
        styleUrls: ['./stock-analyst-consensus-table.component.css'],
        templateUrl: './stock-analyst-consensus-table.component.html'
    } )
export class StockAnalystConsensusTableComponent extends CrudTableComponent<StockAnalystConsensus>
{
    constructor( protected toaster: ToastsManager,
                 protected StockAnalystConsensusServiceContainer: StockAnalystConsensusCrudServiceContainer )
    {
        super( toaster, StockAnalystConsensusServiceContainer );
    }

}
