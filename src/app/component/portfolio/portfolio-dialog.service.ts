import { CrudDialogService } from "../common/crud-dialog.service";
import { Injectable } from "@angular/core";
import { Portfolio } from "../../model/class/portfolio";
/**
 * This class inherits from the {@code CrudDialogService} class to implement a specific service
 * for {@code Portfolio}.
 *
 * Created by mike on 1/08/2017.
 */
@Injectable()
export class PortfolioDialogService extends CrudDialogService<Portfolio>
{
}
