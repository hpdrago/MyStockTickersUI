import { Component } from "@angular/core";
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { LinkedAccount } from '../../model/entity/linked-account';
import { BaseComponent } from '../common/base.component';
import { ToastsManager } from 'ng2-toastr';
import { TradeItAccountController } from '../tradeit-account/tradeit-account-controller';
import { LinkedAccountController } from '../linked-account/linked-account-controller';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'stock-position-table-buttons',
    template: `<ng-template #refreshButtonTemplate>
                    <stock-position-table-refresh-button>
                    </stock-position-table-refresh-button>
               </ng-template>
               <ng-template *ngIf="tradeItAccount && !tradeItAccount.isTradeItAccount()" #addButtonTemplate>
                   <stock-position-table-add-button>
                   </stock-position-table-add-button>
               </ng-template>
               <ng-template *ngIf="tradeItAccount && !tradeItAccount.isTradeItAccount()" #editButtonTemplate>
                   <stock-position-table-edit-button>
                   </stock-position-table-edit-button>
               </ng-template>
               <ng-template *ngIf="tradeItAccount && !tradeItAccount.isTradeItAccount()" #deleteButtonTemplate>
                   <stock-position-table-delete-button>
                   </stock-position-table-delete-button>
               </ng-template>
               <crud-table-buttons [addButtonTemplate]="addButtonTemplate"
                                   [editButtonTemplate]="editButtonTemplate"
                                   [deleteButtonTemplate]="deleteButtonTemplate"
                                   [refreshButtonTemplate]="refreshButtonTemplate">
               </crud-table-buttons>`
})
export class StockPositionTableButtonsComponent extends BaseComponent
{
    protected tradeItAccount: TradeItAccount;
    protected linkedAccount: LinkedAccount;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     * @param {TradeItAccountController} tradeItAccountController
     * @param {LinkedAccountController} linkedAccountController
     */
    constructor( protected toaster: ToastsManager,
                 private tradeItAccountController: TradeItAccountController,
                 private linkedAccountController: LinkedAccountController )
    {
        super( toaster );
    }

    public ngAfterViewInit(): void
    {
        this.addSubscription( 'TradeItAccountTableSelectionChange',
                              this.tradeItAccountController
                                  .subscribeToTableSelectionChangeEvent( tradeItAccount =>
                                                                             this.onTradeItAccountTableSelectionChange( tradeItAccount )));
        this.addSubscription( 'LinkedAccountTableSelectionChange',
                              this.linkedAccountController.subscribeToTableSelectionChangeEvent(
                                  linkedAccount => this.onLinkedAccountTableSelectionChange( linkedAccount )));
    }

    /**
     * This method is called when the user selects a row on the trade it table accounts.
     * @param {TradeItAccount} tradeItAccount
     */
    private onTradeItAccountTableSelectionChange( tradeItAccount: TradeItAccount )
    {
        const methodName = 'onTradeItAccountTableSelectionChange';
        this.log( methodName + " " + JSON.stringify( tradeItAccount ));
        this.tradeItAccount = tradeItAccount;
        this.linkedAccount = null;
    }

    /**
     * This method is called when the user changes the linked selected linked account;
     * @param {LinkedAccount} linkedAccount
     */
    private onLinkedAccountTableSelectionChange( linkedAccount: LinkedAccount )
    {
        const methodName = 'onLinkedAccountTableSelectionChange';
        this.log( methodName + ".begin " + JSON.stringify( linkedAccount ) );
        this.linkedAccount = linkedAccount;
    }
}
