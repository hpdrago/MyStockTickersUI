import { PortfolioStock } from "../model/entity/portfolio-stock";
import { Portfolio } from "../model/entity/portfolio";

/**
 * Created by mike on 12/3/2016.
 */
export class PortfolioStockDTO extends PortfolioStock
{
    portfolioDTO: Portfolio;
    portfolioStockDTOs: Array<PortfolioStock>;
}
