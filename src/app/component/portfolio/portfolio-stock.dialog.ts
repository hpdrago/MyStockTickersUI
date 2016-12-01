/**
 * This class manages the modal dialog that contains the Portfolio Stock
 * editing fields
 *
 * Created by mike on 11/19/2016.
 */

import { Component, Input, Output, EventEmitter } from "@angular/core";
import { PortfolioStock } from "../../model/portfolio-stock";
import { PortfolioStockService } from "../../service/portfolio-stock.service";
import { SessionService } from "../../service/session.service";
import { CrudDialogComponent } from "../common/crud-dialog.component";
@Component
({
    selector: 'portfolio-stock-dialog',
    templateUrl: 'portfolio-stock.dialog.html',
    inputs: ['modelObject', 'crudOperation', 'visible', 'messages', 'saveButtonDisabled', 'form'],
    outputs: ['onCloseButton', 'onSaveButton']
})
export class PortfolioStockDialog extends CrudDialogComponent<PortfolioStock>
{
    constructor( private portfolioStockService: PortfolioStockService,
                 private session: SessionService )
    {
        super()
        this.logger.setClassName( PortfolioStockDialog.name );
    }

    protected onSaveButtonClick()
    {
        this.portfolioStockService.savePortfolioStock( this.session.getLoggedInUserId(), this.modelObject )
                                  .subscribe( (portfolioStock) =>
                                              {
                                                  this.onSaveButton.emit(null);
                                              },
                                              err =>
                                              {
                                                  this.logger.error( err );
                                                  this.messages.push({severity:'error', summary:'Error Message', detail: err});
                                              });

    }
}