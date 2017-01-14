import { CrudTableButtonsComponent } from "../common/crud-table-buttons.component";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { Portfolio } from "../../model/portfolio";

/**
 * Created by mike on 1/2/2017.
 */
@Component({
    selector: 'portfolio-table-buttons',
    styleUrls: ['./portfolio-table-buttons.component.css'],
    templateUrl: '../common/crud-table-buttons.component.html',
    inputs: ['crudTableButtonsService']
})
export class PortfolioTableButtonsComponent extends CrudTableButtonsComponent<Portfolio>
{
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    protected getAddButtonLabel(): string
    {
        return "Add Portfolio";
    }

    protected getDeleteButtonLabel(): string
    {
        return "Delete Portfolio";
    }

    protected getAddButtonClass(): string
    {
        return "portfolio-table-button";
    }

    protected getDeleteButtonClass(): string
    {
        return "portfolio-table-button";
    }
}
