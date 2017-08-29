import { CrudDialogComponent } from "../common/crud-dialog.component";
import { Portfolio } from "../../model/class/portfolio";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { PortfolioDialogService } from "./portfolio-dialog.service";
import { PortfolioFormService } from "./portfolio-form.service";
import { PortfolioFormButtonsService } from "./portfolio-form-buttons.service";

/**
 * Created by mike on 1/8/2017.
 */
@Component({
    selector: 'portfolio-dialog',
    templateUrl: './portfolio-dialog.component.html',
    inputs: ['crudDialogService', 'crudFormService', 'crudFormButtonsService']
})
export class PortfolioDialogComponent extends CrudDialogComponent<Portfolio>
{
    constructor( protected toaster: ToastsManager,
                 protected portfolioDialogService: PortfolioDialogService,
                 protected portfolioFormService: PortfolioFormService,
                 protected portfolioFormButtonsService: PortfolioFormButtonsService )
    {
        super( toaster, portfolioDialogService, portfolioFormService, portfolioFormButtonsService );
    }
}
