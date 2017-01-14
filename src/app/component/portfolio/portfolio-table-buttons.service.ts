import { CrudTableButtonsService } from "../common/crud-table-buttons.service";
import { Portfolio } from "../../model/portfolio";
import { Injectable } from "@angular/core";

/**
 * Created by mike on 1/8/2017.
 */
@Injectable()
export class PortfolioTableButtonsService extends CrudTableButtonsService<Portfolio>
{
}
