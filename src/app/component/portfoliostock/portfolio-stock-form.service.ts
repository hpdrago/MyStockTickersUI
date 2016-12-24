import { CrudFormService } from "../common/crud-form.service";
import { PortfolioStock } from "../../model/portfolio-stock";
import { Injectable, ApplicationRef } from "@angular/core";
/**
 * Created by mike on 12/14/2016.
 */
@Injectable()
export class PortfolioStockFormService extends CrudFormService<PortfolioStock>
{
    constructor()
    {
        super();
    }
}
