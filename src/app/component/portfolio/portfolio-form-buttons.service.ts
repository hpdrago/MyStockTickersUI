import { Portfolio } from "../../model/entity/portfolio";
import { Injectable } from "@angular/core";
import { CrudFormButtonsService } from "../crud/form/crud-form-buttons.service";
import { PortfolioFactory } from "../../model/factory/portfolio.factory";
/**
 * Created by mike on 12/18/2016.
 */
@Injectable()
export class PortfolioFormButtonsService extends CrudFormButtonsService<Portfolio>
{
    constructor( protected portfolioFactory: PortfolioFactory )
    {
        super( portfolioFactory );
    }
}
