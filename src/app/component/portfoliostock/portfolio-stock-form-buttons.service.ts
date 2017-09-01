import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { CrudFormButtonsService } from "../crud/form/crud-form-buttons.service";
import { PortfolioStockFactory } from "../../model/factory/portfolio-stock.factory";
import { Injectable } from "@angular/core";
/**
 * This class defines a Panel Service for the Portfolio Stock CRUD form
 *
 * Created by mike on 12/18/2016.
 */
@Injectable()
export class PortfolioStockFormButtonsService extends CrudFormButtonsService<PortfolioStock>
{
    constructor( protected portfolioStockFactory: PortfolioStockFactory )
    {
        super( portfolioStockFactory );
    }
}
