import { CrudTableAddButtonComponent } from '../crud/table/crud-table-add-button.component';
import { Portfolio } from '../../model/entity/portfolio';
import { Component, OnInit } from '@angular/core';
import { CrudOperation } from '../crud/common/crud-operation';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { PortfolioStateStore } from './portfolio-state-store';
import { PortfolioController } from './portfolio-controller';
import { PortfolioFactory } from '../../model/factory/portfolio.factory';
import { PortfolioCrudService } from '../../service/crud/portfolio-crud.service';
import { LinkedAccountController } from '../linked-account/linked-account-controller';
import { LinkedAccount } from '../../model/entity/linked-account';
import { isNullOrUndefined } from 'util';

@Component
({
     selector: 'portfolio-table-add-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class PortfolioTableAddButtonComponent extends CrudTableAddButtonComponent<Portfolio>
{
    protected linkedAccount: LinkedAccount;

    /**
     * Constructor.
     * @param {SessionService} session
     * @param {ToastsManager} toaster
     * @param {PortfolioStateStore} portfolioStateStore
     * @param {PortfolioController} portfolioController
     * @param {PortfolioFactory} portfolioFactory
     * @param {PortfolioCrudService} portfolioCrudService
     * @param {LinkedAccountController} linkedAccountController
     */
    constructor( protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected portfolioStateStore: PortfolioStateStore,
                 protected portfolioController: PortfolioController,
                 protected portfolioFactory: PortfolioFactory,
                 protected portfolioCrudService: PortfolioCrudService,
                 protected linkedAccountController: LinkedAccountController )
    {
        super( toaster,
               portfolioStateStore,
               portfolioController,
               portfolioFactory,
               portfolioCrudService );
    }

    public ngOnInit()
    {
        super.ngOnInit();
        this.linkedAccountController
            .subscribeToTableSelectionChangeEvent( linkedAccount => this.onLinkedAccountChanged( linkedAccount ) );
    }

    private onLinkedAccountChanged( linkedAccount: LinkedAccount )
    {
        const methodName = 'onLinkedAccountChanged';
        this.log( methodName + ' ' + JSON.stringify( linkedAccount ));
        this.linkedAccount = linkedAccount;
    }

    /**
     * Can't add a portfolio until the linked account is selected.
     * @return {boolean}
     */
    public get buttonDisabled(): boolean
    {
        return super.isDisabled() || isNullOrUndefined( this.linkedAccount );
    }
}
