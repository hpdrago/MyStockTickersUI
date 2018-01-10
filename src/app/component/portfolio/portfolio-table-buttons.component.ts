import { CrudTableButtonsComponent } from "../crud/table/crud-table-buttons.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Portfolio } from "../../model/entity/portfolio";
import { PortfolioCrudServiceContainer } from "./portfolio-crud-service-container";

/**
 * Created by mike on 1/2/2017.
 */
@Component({
    selector:    'portfolio-table-buttons',
    styleUrls:   ['../crud/table/crud-table-buttons.component.css', './portfolio-table-buttons.component.css'],
    templateUrl: '../crud/table/crud-table-buttons.component.html'
})
export class PortfolioTableButtonsComponent extends CrudTableButtonsComponent<Portfolio>
{
    constructor( protected toaster: ToastsManager,
                 private portfolioCrudServiceContainer: PortfolioCrudServiceContainer )
    {
        super( toaster, portfolioCrudServiceContainer );
    }

    protected getAddButtonLabel(): string
    {
        return "Add Portfolio";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Portfolio";
    }
}
