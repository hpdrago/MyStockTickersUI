import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Portfolio } from "../../model/entity/portfolio";
import { Injectable } from "@angular/core";
import { PortfolioFactory } from "../../model/factory/portfolio.factory";
import { PortfolioCrudService } from "../../service/crud/portfolio-crud.service";
import { ModelObjectChangeService } from "../../service/crud/model-object-change.service";

@Injectable()
export class PortfolioCrudServiceContainer extends CrudServiceContainer<Portfolio>
{
    constructor( private _portfolioFactory: PortfolioFactory,
                 private _portfolioCrudService: PortfolioCrudService )
    {
        super( new ModelObjectChangeService<Portfolio>(), _portfolioFactory, _portfolioCrudService )
    }

    get portfolioFactory(): PortfolioFactory { return this._portfolioFactory; }

    set portfolioFactory( value: PortfolioFactory ) { this._portfolioFactory = value; }

    get portfolioCrudService(): PortfolioCrudService { return this._portfolioCrudService; }

    set portfolioCrudService( value: PortfolioCrudService ) { this._portfolioCrudService = value; }

}
