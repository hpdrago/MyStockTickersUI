import { CrudDialogService } from "../crud/dialog/crud-dialog.service";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { Injectable } from "@angular/core";
import { PortfolioStockFactory } from "../../model/factory/portfolio-stock.factory";
/**
 * This class inherits from the {@code CrudDialogService} class to implement a specific service
 * for {@code PortfolioStock}.
 *
 * Created by mike on 12/30/2016.
 */
@Injectable()
export class PortfolioStockDialogService extends CrudDialogService<PortfolioStock>
{
    constructor( protected portfolioStockFactory: PortfolioStockFactory )
    {
        super( portfolioStockFactory );
    }
}
