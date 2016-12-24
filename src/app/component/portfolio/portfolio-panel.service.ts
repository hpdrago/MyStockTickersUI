import { CrudPanelService } from "../common/crud-panel.service";
import { Portfolio } from "../../model/portfolio";
import { Injectable } from "@angular/core";
/**
 * Created by mike on 12/18/2016.
 */
@Injectable()
export class PortfolioPanelService extends CrudPanelService<Portfolio>
{
}
