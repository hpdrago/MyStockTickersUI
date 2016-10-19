import { Component } from "@angular/core/src/metadata/directives";
import { Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Stock } from "../../model/stock";
import { DialogOperation } from "../../common/dialog-operation";
import { StockExchangeService } from "../../service/stock-exchange.service";
import { SelectItem } from 'primeng/primeng';

/**
 * Created by mike on 10/8/2016.
 */

@Component(
{
    selector:    'stock-dialog',
    templateUrl: 'stock-dialog.component.html',
    styleUrls: ['stock-dialog.component.css']
})
export class StockDialogComponent implements OnInit
{
    @Input()
    stock: Stock;
    @Input()
    displayDialog: boolean;
    @Input()
    dialogOperation: DialogOperation;
    @Output()
    buttonOk: EventEmitter<any> = new EventEmitter();
    @Output()
    buttonCancel: EventEmitter<any> = new EventEmitter();

    private stockExchanges: SelectItem[];
    private stockExchangeService: StockExchangeService;

    constructor( stockExchangeService: StockExchangeService )
    {
        this.stockExchangeService = stockExchangeService;
    }

    okButtonClick()
    {
        this.buttonOk.emit();
    }

    cancelButtonClick()
    {
        this.buttonCancel.emit();
    }

    public ngOnInit(): void
    {
        this.stockExchanges = this.stockExchangeService.get().getSelectItems();
        //alert( JSON.stringify( this.stockExchanges ) );
    }

    private onAfterShow( event ): void
    {
    }
}