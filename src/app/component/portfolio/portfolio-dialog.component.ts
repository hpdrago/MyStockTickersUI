import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { Portfolio } from "../../model/entity/portfolio";
import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { PortfolioCrudServiceContainer } from "./porfolio-crud-service-container";

/**
 * Created by mike on 1/8/2017.
 */
@Component({
    selector: 'portfolio-dialog',
    templateUrl: './portfolio-dialog.component.html'
})
export class PortfolioDialogComponent extends CrudDialogComponent<Portfolio>
{
    constructor( protected toaster: ToastsManager,
                 private portfolioCrudServiceContainer: PortfolioCrudServiceContainer )
    {
        super( toaster, portfolioCrudServiceContainer );
    }
}
