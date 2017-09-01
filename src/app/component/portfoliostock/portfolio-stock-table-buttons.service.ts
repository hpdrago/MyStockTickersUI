import { CrudTableButtonsService } from "../crud/table/crud-table-buttons.service";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
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
