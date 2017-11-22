/**
 * Created by mike on 9/14/2016.
 */
import { Component, ViewContainerRef } from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import { DateOrTimePeriod } from "./common/date-or-time-period.enum";

@Component( {
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls:   ['./app.component.css'],
})
export class AppComponent
{
    DateOrTimePeriod: typeof DateOrTimePeriod = DateOrTimePeriod;

    title = 'My Stock Tickers';
    constructor(public toastr: ToastsManager, vRef: ViewContainerRef)
    {
        this.toastr.setRootViewContainerRef(vRef);
    }
}
