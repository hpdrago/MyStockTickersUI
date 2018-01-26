import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Customer } from '../../model/entity/customer';
import { Injectable } from '@angular/core';
import { TradeItAccount } from '../../model/entity/tradeit-account';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { TradeItAccountCrudService } from '../../service/crud/tradeit-account-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class TradeitAccountActionHandler extends CrudActionHandler<TradeItAccount>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {TradeItAccountCrudService} tradeItAccountCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected tradeItAccountCrudService: TradeItAccountCrudService )
    {
        super( toaster,
               restErrorReporter,
               tradeItAccountCrudService );
    }
}
