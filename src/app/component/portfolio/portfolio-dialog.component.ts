import { CrudDialogComponent } from "../common/crud-dialog.component";
import { Portfolio } from "../../model/portfolio";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";

/**
 * Created by mike on 1/8/2017.
 */
@Component({
    selector: 'portfolio-dialog',
    templateUrl: './portfolio-dialog.component.html',
    inputs: ['crudDialogService', 'crudFormService', 'crudPanelButtonsService']
})
export class PortfolioDialogComponent extends CrudDialogComponent<Portfolio>
{
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }
}
