import { CrudFormService } from "../crud/form/crud-form.service";
import { Portfolio } from "../../model/entity/portfolio";
import { Injectable } from "@angular/core";
import { PortfolioFactory } from "../../model/factory/portfolio.factory";

/**
 * Created by mike on 1/8/2017.
 */
@Injectable()
export class PortfolioFormService extends CrudFormService<Portfolio>
{
    constructor( protected portfolioFactory: PortfolioFactory )
    {
        super( portfolioFactory );
    }
}
