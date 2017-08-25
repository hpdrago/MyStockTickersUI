import { Component } from "@angular/core";
import { CrudPanelComponent } from "../common/crud-panel.component";
import { Portfolio } from "../../model/class/portfolio";
import { ToastsManager } from "ng2-toastr";
import { PortfolioStockPanelButtonsService } from "../portfoliostock/portfolio-stock-panel-buttons.service";

/**
 * This class displays a form for CRUD operations on a Portfolio.
 *
 * Created by mike on 1/8/2017.
 */
@Component(
{
    selector:    'portfolio-panel',
    templateUrl: './portfolio-panel.component.html',
    inputs: ['crudFormService', 'crudPanelButtonsService']
})
export class PortfolioPanelComponent extends CrudPanelComponent<Portfolio>
{
    constructor( protected toaster: ToastsManager,
                 protected portfolioPanelButtonsService: PortfolioStockPanelButtonsService )
    {
        super( toaster );
    }
}
