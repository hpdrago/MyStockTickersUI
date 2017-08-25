import { PortfolioStock } from "../class/portfolio-stock";
import { ModelObjectFactory } from "./model-object.factory";
import { Portfolio } from "../class/portfolio";
import { Injectable } from "@angular/core";

/**
 * This is the Portfolio model object factory
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class PortfolioFactory extends ModelObjectFactory<Portfolio>
{
    /**
     * Create a new PortfolioStock instance
     * @returns {PortfolioStock}
     */
    newModelObject(): Portfolio
    {
        var portfolio= new Portfolio();
        portfolio.id = 0;
        portfolio.customerId = 0;
        portfolio.name = '';
        return portfolio;
    }

}
