import { CrudTableButtonsService } from "../crud/crud-table-buttons.service";
import { PortfolioStock } from "../../model/class/portfolio-stock";
import { Injectable } from "@angular/core";
import { PortfolioStockFactory } from "../../model/factory/portfolio-stock.factory";

/**
 * Created by mike on 1/2/2017.
 */
@Injectable()
export class PortfolioStockTableButtonsService extends CrudTableButtonsService<PortfolioStock>
{
    constructor( protected portfolioStockFactory: PortfolioStockFactory )
    {
        super( portfolioStockFactory );
    }
}
