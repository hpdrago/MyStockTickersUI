/**
 * Created by mike on 11/3/2016.
 */
import { ConfirmationService } from "primeng/components/common/api";
import { Component, Input, EventEmitter, Output } from "@angular/core";
import { PortfolioService } from "../../service/portfolio.service";
import { Portfolio } from "../../model/portfolio";

@Component(
{
    template: `<p-confirmDialog
                header="Confirmation"
                icon="fa fa-question-circle"
                width="425" #confirmDialog>
                <footer>
                    <button type="text" (click)="confirmDialog.accept()" pButton icon="fa-trash" label="Confirm"></button>
                    <button type="text" (click)="confirmDialog.reject()" pButton icon="fa-remove" label="Cancel"></button>
                </footer>
              </p-confirmDialog>`,
    selector: 'delete-portfolio-dialog'
})
export class DeletePortfolioDialog
{
    @Output()
    private portfolioDelete: EventEmitter<any> = new EventEmitter();

    constructor( private confirmationService: ConfirmationService,
                 private portfolioService: PortfolioService )
    {
    }

    public confirm( portfolio: Portfolio )
    {
        this.confirmationService.confirm({
                message: 'Deleting a portfolio does not delete any stock information.\nDo you wish to delete portfolio \'' +
                         portfolio.name + '\' from your list?',
                accept: () => {
                    this.portfolioService
                        .deletePortfolio( portfolio.id )
                        .subscribe( (any)  =>
                            {
                                this.portfolioDelete.emit();
                            },
                            err =>
                            {
                                console.log(err);
                            });
                }
        });
    }
}

