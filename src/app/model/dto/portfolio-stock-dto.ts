import { PortfolioStock } from "../entity/portfolio-stock";
import { Portfolio } from "../entity/portfolio";

/**
 * Created by mike on 12/3/2016.
 */
export class PortfolioStockDTO extends PortfolioStock
{
    portfolioDTO: Portfolio;
    portfolioStockDTOs: Array<PortfolioStock>;
}
