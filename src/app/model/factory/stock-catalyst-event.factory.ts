
import { ModelObjectFactory } from "./model-object.factory";
import { SessionService } from "../../service/crud/session.service";
import { Injectable } from "@angular/core";
import { StockCatalystEvent } from "../entity/stock-catalyst-event";

@Injectable()
export class StockCatalystEventFactory extends ModelObjectFactory<StockCatalystEvent>
{
    constructor( protected session: SessionService )
    {
        super();
    }

    public newModelObject(): StockCatalystEvent
    {
        var catalystEvent: StockCatalystEvent = new StockCatalystEvent();
        catalystEvent.id = 0;
        catalystEvent.customerId = this.session.getLoggedInUserId();
        catalystEvent.tickerSymbol = '';
        catalystEvent.catalystDate = null;
        catalystEvent.catalystDesc = '';
        return catalystEvent;
    }
}
