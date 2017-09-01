import { CrudTableButtonsService } from "../crud/table/crud-table-buttons.service";
import { Portfolio } from "../../model/entity/portfolio";
import { Injectable } from "@angular/core";
import { PortfolioFactory } from "../../model/factory/portfolio.factory";

/**
 * Created by mike on 1/8/2017.
 */
@Injectable()
export class PortfolioTableButtonsService extends CrudTableButtonsService<Portfolio>
{
    constructor( protected portfolioFactory: PortfolioFactory )
    {
        super( portfolioFactory );
    }
}
