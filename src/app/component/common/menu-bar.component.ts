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
    private menuItems: MenuItem[];

    ngOnInit()
    {
        this.initializeMenuBar();
    }

    private initializeMenuBar()
    {
        this.menuItems =
            [
                { label: 'Dashboard', icon: 'fa-chart', routerLink: ['/dashboard'] },
                { label: 'Portfolios', icon: 'fa-chart', routerLink: ['/portfolios'] },
                { label: 'Stocks', icon: 'fa-chart', routerLink: ['/stocks'] }
            ]
    }
}
