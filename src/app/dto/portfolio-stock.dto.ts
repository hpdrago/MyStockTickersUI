import { PortfolioStock } from "../model/class/portfolio-stock";
import { Portfolio } from "../model/class/portfolio";

/**
 * Created by mike on 12/3/2016.
 */
export class PortfolioStockDTO extends PortfolioStock
{
    portfolioDTO: Portfolio;
    portfolioStockDTOs: Array<PortfolioStock>;
}
