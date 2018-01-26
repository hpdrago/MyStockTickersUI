/**
 * Created by mike on 10/23/2016.
 */
import { MenuItem } from "primeng/components/common/api";
import { Component } from "@angular/core";

@Component(
{
    selector: 'menu-bar',
    template: `<p-menubar [model]="menuItems"></p-menubar>`
})
export class MenuBarComponent
{
    protected menuItems: MenuItem[];

    ngOnInit()
    {
        this.initializeMenuBar();
    }

    private initializeMenuBar()
    {
        this.menuItems =
            [
                { label: 'Dashboard', icon: 'fa-area-chart', routerLink: ['/dashboard'] },
                { label: 'Stock Notes',
                   icon: 'fa-sticky-note',
                  items: [{
                            label: 'Add',
                            icon: 'fa-plus',
                            routerLink: ['/stockNotes/add']
                          },
                          {
                              label: 'View',
                              icon: 'fa-list',
                              routerLink: ['/stockNotes/view']
                          }]},
                { label: 'Stocks To Buy',
                    icon: 'fa-shopping-cart',
                    items: [{
                                label: 'Add',
                                icon: 'fa-plus',
                                routerLink: ['/stockToBuy/add']
                            },
                            {
                                label: 'View',
                                icon: 'fa-list',
                                routerLink: ['/stockToBuy/view']
                            }]},
                { label: 'Catalyst Events',
                    icon: 'fa-calendar',
                    items: [{
                                label: 'Add',
                                icon: 'fa-plus',
                                routerLink: ['/stockCatalystEvents/add']
                            },
                            {
                                label: 'View',
                                icon: 'fa-list',
                                routerLink: ['/stockCatalystEvents/view']
                            }]},
                { label: 'Analyst Consensus',
                    icon: 'fa-user',
                    items: [{
                                label: 'Add',
                                icon: 'fa-plus',
                                routerLink: ['/stockAnalystConsensus/add']
                            },
                            {
                                label: 'View',
                                icon: 'fa-list',
                                routerLink: ['/stockAnalystConsensus/view']
                            }]},
                { label: 'Brokerage Accounts', icon: 'fa-briefcase', routerLink: ['/tradeItAccounts'] },
                { label: 'Gains & Losses', icon: 'fa-dollar', routerLink: ['/gainsLosses'] },
                { label: 'Profile', icon: 'fa-gear', routerLink: ['/profile'] }
            ]
    }
}
