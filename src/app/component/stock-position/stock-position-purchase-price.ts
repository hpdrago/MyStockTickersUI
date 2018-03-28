/**
 * Created by mike on 3/25/2018
 */
import { Component, Input } from '@angular/core';
import { StockPosition } from '../../model/entity/stock-position';

/**
 * Component for the purchase price which is cost basis / shares (quantity)
 */
@Component
({
    selector: 'stock-position-purchase-price',
    template: `<currency [currencyValue]="stockPosition.costBasis / stockPosition.quantity"></currency>`
})
export class StockPositionPurchasePrice
{
    @Input()
    protected stockPosition: StockPosition;
}
