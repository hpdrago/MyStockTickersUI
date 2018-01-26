/**
 * Created by mike on 9/14/2016.
 */
import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DateOrTimePeriod } from "./common/date-or-time-period.enum";
import { CustomerService } from "./service/customer.service";
import { ConfirmationService } from 'primeng/api';

@Component( {
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.css']
})
export class AppComponent
{
    DateOrTimePeriod: typeof DateOrTimePeriod = DateOrTimePeriod;

    title = 'My StockCompany Tickers';
    constructor( public toastr: ToastsManager,
                 private vRef: ViewContainerRef,
                 private customerService: CustomerService,
                 private confirmationService: ConfirmationService )
    {
        this.toastr.setRootViewContainerRef(vRef);
        //customerService.login( 'michael.earl.65@gmail.com' );
    }

    /**
     * Confirmation methods.  See: http://plnkr.co/edit/zT4F2SbdPzjl7Jfu2IdW?p=preview
     */

    /**
     * Confirm that the user wants to update the tradeit account token.
     */
    public confirmUpdateTradeItAccountToken()
    {
        this.confirmationService
            .confirm({ message: 'Do you want to update your TradeItAccount token?' });
    }
}
