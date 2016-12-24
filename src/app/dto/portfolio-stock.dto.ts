import { PortfolioStock } from "../model/portfolio-stock";
import { Portfolio } from "../model/portfolio";

/**
 * Created by mike on 12/3/2016.
 */
export class PortfolioStockDTO extends PortfolioStock
{
    portfolioDTO: Portfolio;
    portfolioStockDTOs: Array<PortfolioStock>;
}