import { PortfolioStock } from "../entity/portfolio-stock";
import { ModelObjectFactory } from "./model-object.factory";
import { Portfolio } from "../entity/portfolio";
import { Injectable } from "@angular/core";
import { SessionService } from "../../service/session.service";

/**
 * This is the Portfolio model object factory
 * Created by mike on 12/13/2016.
 */
@Injectable()
export class PortfolioFactory extends ModelObjectFactory<Portfolio>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    /**
     * Create a new PortfolioStock instance
     * @returns {PortfolioStock}
     */
    newModelObject(): Portfolio
    {
        var portfolio= new Portfolio();
        portfolio.id = 0;
        portfolio.customerId = this.session.getLoggedInUserId();
        portfolio.name = '';
        return portfolio;
    }

}
