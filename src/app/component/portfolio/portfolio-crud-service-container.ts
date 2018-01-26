import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Portfolio } from "../../model/entity/portfolio";
import { Injectable } from "@angular/core";
import { PortfolioFactory } from "../../model/factory/portfolio.factory";
import { PortfolioCrudService } from "../../service/crud/portfolio-crud.service";
import { CrudDialogService } from "../crud/dialog/crud-dialog.service";

@Injectable()
export class PortfolioCrudServiceContainer extends CrudServiceContainer<Portfolio>
{
    /**
     * Constructor.
     * @param {PortfolioFactory} _portfolioFactory
     * @param {PortfolioCrudService} _portfolioCrudService
     */
    constructor( private _portfolioFactory: PortfolioFactory,
                 private _portfolioCrudService: PortfolioCrudService )
    {
        super( _portfolioFactory, _portfolioCrudService )
        this.crudDialogService = new CrudDialogService<Portfolio>( this._portfolioFactory,
                                                                   this.crudStateStore,
                                                                   this.crudFormButtonsService );
        this.crudPanelService = this.crudDialogService;
    }

    get portfolioFactory(): PortfolioFactory { return this._portfolioFactory; }

    set portfolioFactory( value: PortfolioFactory ) { this._portfolioFactory = value; }

    get portfolioCrudService(): PortfolioCrudService { return this._portfolioCrudService; }

    set portfolioCrudService( value: PortfolioCrudService ) { this._portfolioCrudService = value; }

}
