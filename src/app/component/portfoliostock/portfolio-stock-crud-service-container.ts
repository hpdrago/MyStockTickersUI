import { Injectable } from "@angular/core";
import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { PortfolioStockFactory } from "../../model/factory/portfolio-stock.factory";
import { PortfolioStockCrudService } from "../../service/crud/portfolio-stock-crud.service";
import { CrudDialogService } from "../crud/dialog/crud-dialog.service";

/**
 * This is the CRUD Service class for PortfolioStock model objects
 */
@Injectable()
export class PortfolioStockCrudServiceContainer extends CrudServiceContainer<PortfolioStock>
{
    /**
     * Constructor.
     * @param {PortfolioStockFactory} _portfolioStockFactory
     * @param {PortfolioStockCrudService} _portfolioStockCrudService
     */
    constructor( private _portfolioStockFactory: PortfolioStockFactory,
                 private _portfolioStockCrudService: PortfolioStockCrudService )
    {
        super( _portfolioStockFactory, _portfolioStockCrudService )
        this.crudDialogService = new CrudDialogService<PortfolioStock>( this._portfolioStockFactory,
                                                                        this.crudStateStore,
                                                                        this.crudFormButtonsService );
        this.crudPanelService = this.crudDialogService;
    }

    get portfolioStockFactory(): PortfolioStockFactory { return this._portfolioStockFactory; }

    set portfolioStockFactory( value: PortfolioStockFactory ) { this._portfolioStockFactory = value; }

    get portfolioStockCrudService(): PortfolioStockCrudService { return this._portfolioStockCrudService; }

    set portfolioStockCrudService( value: PortfolioStockCrudService ) { this._portfolioStockCrudService = value; }

}
