import { CrudDialogService } from "../crud/crud-dialog.service";
import { Injectable } from "@angular/core";
import { Portfolio } from "../../model/class/portfolio";
import { PortfolioFactory } from "../../model/factory/portfolio.factory";
/**
 * This class inherits from the {@code CrudDialogService} class to implement a specific service
 * for {@code Portfolio}.
 *
 * Created by mike on 1/08/2017.
 */
@Injectable()
export class PortfolioDialogService extends CrudDialogService<Portfolio>
{
    constructor( protected portfolioFactory: PortfolioFactory )
    {
        super( portfolioFactory );
    }
}
