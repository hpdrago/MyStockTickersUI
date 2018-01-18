import { Component, OnInit, ViewChild } from "@angular/core";
import { SessionService } from "../../service/session.service";
import { ToastsManager } from "ng2-toastr";
import { TradeItAccountPanelComponent } from "./tradeit-account-panel.component";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { TradeItAccountCrudServiceContainer } from "./tradeit-account-crud-service-container";
import { BaseCrudComponent } from "../crud/common/base-crud.component";
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
    @ViewChild( TradeItAccountPanelComponent)
    private customerAccountPanel: TradeItAccountPanelComponent;

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
