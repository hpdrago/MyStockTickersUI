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
                { label: 'Quad View', icon: 'fa fa-area-chart', routerLink: ['/quadview'] },
                { label: 'Stock Notes',
                   icon: 'fa fa-sticky-note',
                  items: [{
                            label: 'Add',
                            icon: 'fa fa-plus',
                            routerLink: ['/stockNotes/add']
                          },
                          {
                              label: 'View',
                              icon: 'fa fa-list',
                              routerLink: ['/stockNotes/view']
                          }]},
                { label: 'Stocks To Buy',
                    icon: 'fa fa-shopping-cart',
                    items: [{
                                label: 'Add',
                                icon: 'fa fa-plus',
                                routerLink: ['/stockToBuy/add']
                            },
                            {
                                label: 'View',
                                icon: 'fa fa-list',
                                routerLink: ['/stockToBuy/view']
                            }]},
                { label: 'Catalyst Events',
                    icon: 'fa fa-calendar',
                    items: [{
                                label: 'Add',
                                icon: 'fa fa-plus',
                                routerLink: ['/stockCatalystEvents/add']
                            },
                            {
                                label: 'View',
                                icon: 'fa fa-list',
                                routerLink: ['/stockCatalystEvents/view']
                            }]},
                { label: 'Analyst Consensus',
                    icon: 'fa fa-user',
                    items: [{
                                label: 'Add',
                                icon: 'fa fa-plus',
                                routerLink: ['/stockAnalystConsensus/add']
                            },
                            {
                                label: 'View',
                                icon: 'fa fa-list',
                                routerLink: ['/stockAnalystConsensus/view']
                            }]},
                { label: 'Accounts & Portfolios', icon: 'fa fa-briefcase', routerLink: ['/tradeItAccounts'] },
                { label: 'Gains & Losses', icon: 'fa fa-dollar', routerLink: ['/gainsLosses'] },
                { label: 'Profile', icon: 'fa fa-gear', routerLink: ['/profile'] }
            ]
    }
}
