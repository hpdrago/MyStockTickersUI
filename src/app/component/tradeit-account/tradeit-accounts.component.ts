import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccountPanelComponent } from "./tradeit-account-panel.component";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { TradeitAccountBaseTableComponent } from "./tradeit-account-base-table.component";
import { TradeItService } from "../../service/tradeit/tradeit.service";

/**
 * Created by mike on 10/8/2016.
 */
@Component(
    {
        selector:    'tradeit-accounts',
        templateUrl: './tradeit-accounts.component.html'
    })
export class TradeItAccountsComponent extends TradeitAccountBaseTableComponent implements OnInit
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {TradeItAccountCrudServiceContainer} customerAccountCrudServiceContainer
     * @param {TradeItService} tradeItService
     */
    constructor( protected toaster: ToastsManager,
                 private customerAccountCrudServiceContainer: TradeItAccountCrudServiceContainer,
                 protected tradeItService: TradeItService )
    {
        super( toaster, customerAccountCrudServiceContainer, tradeItService );
    }

    public ngOnInit(): void
    {
        this.customerAccountCrudServiceContainer
            .crudTableButtonsService
            .subscribeToModelObjectChangedEvent( (modelObject) => this.setModelObject( modelObject ) );
        this.customerAccountCrudServiceContainer
            .crudTableButtonsService
            .subscribeToCrudOperationChangeEvent( (crudOperation) => this.setCrudOperation( crudOperation ) );
    }

}
