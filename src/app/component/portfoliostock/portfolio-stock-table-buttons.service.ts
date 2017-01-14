import { CrudTableButtonsService } from "../common/crud-table-buttons.service";
import { PortfolioStock } from "../../model/portfolio-stock";
import { Injectable } from "@angular/core";

/**
 * Created by mike on 1/2/2017.
 */
@Injectable()
export class PortfolioStockTableButtonsService extends CrudTableButtonsService<PortfolioStock>
{

}
