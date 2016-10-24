/**
 * Created by mike on 10/23/2016.
 */
import { MenuItem } from "primeng/components/common/api";
import { Component } from "@angular/core";

@Component(
{
    selector: 'menu-bar',
    templateUrl: 'menu-bar.component.html'
})
export class MenuBarComponent
{
    private items: MenuItem[];

    ngOnInit(): void
    {
        this.initializeMenubar();
    }

    private initializeMenubar()
    {
        this.items =
            [
                { label: 'Dashboard', icon: 'fa-chart', routerLink: ['/dashboard'] },
                { label: 'Portfolios', icon: 'fa-chart', routerLink: ['/portfolios'] },
                { label: 'Stock Table', icon: 'fa-chart', routerLink: ['/stocks'] }
            ]
    }
}
