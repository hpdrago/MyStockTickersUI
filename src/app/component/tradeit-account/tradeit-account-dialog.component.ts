import { CrudDialogComponent } from "../crud/dialog/crud-dialog.component";
import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItAccountFactory } from '../../model/factory/tradeit-account.factory';
import { TradeItAccountController } from './tradeit-account-controller';
import { TradeItAccountStateStore } from './tradeit-account-state-store';
import { TradeItAccountCrudService } from '../../service/crud/tradeit-account-crud.service';

/**
 * Created by mike on 8/15/2017.
 */
@Component({
    selector: 'tradeit-account-dialog',
    templateUrl: './tradeit-account-dialog.component.html'
})
export class TradeItAccountDialogComponent extends CrudDialogComponent<TradeItAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItAccountStateStore} tradeItAccountStateStore
     * @param {TradeItAccountController} tradeItAccountController
     * @param {TradeItAccountFactory} tradeItAccountFactory
     * @param {TradeItAccountCrudService} tradeItAccountCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private tradeItAccountStateStore: TradeItAccountStateStore,
                 private tradeItAccountController: TradeItAccountController,
                 private tradeItAccountFactory: TradeItAccountFactory,
                 private tradeItAccountCrudService: TradeItAccountCrudService )
    {
        super( changeDetector,
               toaster,
               tradeItAccountStateStore,
               tradeItAccountController,
               tradeItAccountFactory,
               tradeItAccountCrudService );
    }

    public ngOnInit()
    {
        super.ngOnInit();
        this.tradeItAccountController
            .subscribeToAccountLinkedEvent( (tradeItAccount) => { this.closeDialog(); } );
    }
}
