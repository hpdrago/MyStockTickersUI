import { Portfolio } from "../../model/class/portfolio";
import { Injectable } from "@angular/core";
import { CrudPanelButtonsService } from "../common/crud-panel-buttons.service";
/**
 * Created by mike on 12/18/2016.
 */
@Injectable()
export class PortfolioPanelButtonsService extends CrudPanelButtonsService<Portfolio>
{
}
