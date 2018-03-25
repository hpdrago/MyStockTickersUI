/**
 * Created by mike on 3/25/2018
 */
import { Component, Input } from '@angular/core';
import { StockPosition } from '../../model/entity/stock-position';

/**
 * Component for the market price which is shares * last price
 */
@Component
({
    selector: 'stock-position-market-value',
    template: `<currency [currencyValue]="stockPosition.marketValue()"></currency>`
})
export class StockPositionMarketValue
{
    @Input()
    protected stockPosition: StockPosition;
}
