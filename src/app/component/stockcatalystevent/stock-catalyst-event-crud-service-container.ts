import { CrudServiceContainer } from "../crud/common/crud-service-container";
import { Injectable } from "@angular/core";
import { StockCatalystEvent } from "../../model/entity/stock-catalyst-event";
import { StockCatalystEventFactory } from "../../model/factory/stock-catalyst-event.factory";
import { StockCatalystEventCrudService } from "../../service/crud/stock-catalyst-event-crud.service";
import { CrudDialogService } from "../crud/dialog/crud-dialog.service";

/**
 * This is the service container for the StockCatalystEvent entity.
 */
@Injectable()
export class StockCatalystEventCrudServiceContainer extends CrudServiceContainer<StockCatalystEvent>
{
    /**
     * Constructor.
     * @param {StockCatalystEventFactory} _stockCatalystEventFactory
     * @param {StockCatalystEventCrudService} _stockCatalystEventCrudService
     */
    constructor( private _stockCatalystEventFactory: StockCatalystEventFactory,
                 private _stockCatalystEventCrudService: StockCatalystEventCrudService )
    {
        super( _stockCatalystEventFactory, _stockCatalystEventCrudService )
        this.crudDialogService = new CrudDialogService<StockCatalystEvent>( this._stockCatalystEventFactory,
                                                                            this.crudStateStore,
                                                                            this.crudFormButtonsService );
        this.crudPanelService = this.crudDialogService;
    }

    get stockCatalystEventFactory(): StockCatalystEventFactory { return this._stockCatalystEventFactory; }

    set stockCatalystEventFactory( value: StockCatalystEventFactory ) { this._stockCatalystEventFactory = value; }

    get stockCatalystEventCrudService(): StockCatalystEventCrudService { return this._stockCatalystEventCrudService; }

    set stockCatalystEventCrudService( value: StockCatalystEventCrudService ) { this._stockCatalystEventCrudService = value; }
}
