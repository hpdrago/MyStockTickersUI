import { PortfolioStock } from "../../model/entity/portfolio-stock";
import { ChangeDetectorRef, Component, Input } from "@angular/core";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { ToastsManager } from "ng2-toastr";
import { Portfolio } from "../../model/entity/portfolio";
import { isNullOrUndefined } from "util";
import { PortfolioStockCrudService } from '../../service/crud/portfolio-stock-crud.service';
import { PortfolioStockFactory } from '../../model/factory/portfolio-stock.factory';
import { PortfolioStockController } from './portfolio-stock-controller';
import { PortfolioStockStateStore } from './portfolio-stock-state-store';

/**
 * Created by mike on 12/31/2016.
 */
@Component({
    selector:    'portfolio-stock-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls:   ['../crud/form/crud-form-buttons.component.css'],
    inputs:      ['portfolio']
})
export class PortfolioStockFormButtonsComponent extends CrudFormButtonsComponent<PortfolioStock>
{
    @Input()
    private portfolio: Portfolio;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {PortfolioStockStateStore} portfolioStockStateStore
     * @param {PortfolioStockController} portfolioStockController
     * @param {PortfolioStockFactory} portfolioStockFactory
     * @param {PortfolioStockCrudService} portfolioStockCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private portfolioStockStateStore: PortfolioStockStateStore,
                 private portfolioStockController: PortfolioStockController,
                 private portfolioStockFactory: PortfolioStockFactory,
                 private portfolioStockCrudService: PortfolioStockCrudService )
    {
        super( changeDetector,
               toaster,
               portfolioStockStateStore,
               portfolioStockController,
               portfolioStockFactory,
               portfolioStockCrudService );
    }

    /**
     * This method is called when the user clicks the Add button (it is labeled "Save")
     */
    protected onAddButtonClick(): void
    {
        if ( isNullOrUndefined( this.portfolio ))
        {
            throw new ReferenceError( "this.portfolio is null or undefined" );
        }
        this.modelObject.portfolioId = this.portfolio.id;
        super.onAddButtonClick( false );
    }

    /**
     * Display the Ticker Symbol to confirm delete
     * @return {string}
     */
    public getDeleteKeyword(): string
    {
        return this.modelObject.tickerSymbol;
    }
}
