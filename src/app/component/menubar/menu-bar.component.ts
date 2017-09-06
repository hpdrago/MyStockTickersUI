/**
 * Created by mike on 10/23/2016.
 */
import { MenuItem } from "primeng/components/common/api";
import { Component } from "@angular/core";

@Component(
{
    selector: 'menu-bar',
    template: `<p-tabMenu [model]="menuItems"></p-tabMenu>`
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
                { label: 'Dashboard', icon: 'fa-area-chart', url: '/dashboard' },
                { label: 'Stock Notes', icon: 'fa-sticky-note', url: '/stockNotes' },
                { label: 'Portfolios', icon: 'fa-briefcase', url: '/portfolios' },
                { label: 'Stocks', icon: 'fa-dollar', url: '/stocks' }
            ]
    }
}
