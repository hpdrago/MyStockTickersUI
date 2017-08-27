import { Portfolio } from "../../model/class/portfolio";
import { Injectable } from "@angular/core";
import { CrudFormButtonsService } from "../common/crud-form-buttons.service";
/**
 * Created by mike on 12/18/2016.
 */
@Injectable()
export class PortfolioFormButtonsService extends CrudFormButtonsService<Portfolio>
{
}
