import { StockNotesContainer } from "../common/stock-notes-container";
import { DateOrTimePeriod } from '../../common/date-or-time-period.enum';
import { StockQuote } from './stock-quote';
import { StockPriceQuote } from './stock-price-quote';
import { StockPriceQuoteContainer } from '../common/stock-price-quote-container';
import { StockQuoteContainer } from '../common/stock-quote-container';
import { StockModelObject } from '../common/stock-model-object';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';

/**
 * This entity contains the elements for the stock summary
 *
 * Created 10/17/2017
 */
export class StockCatalystEvent extends StockModelObject<StockCatalystEvent>
                                implements StockNotesContainer,
                                           StockPriceQuoteContainer,
                                           StockQuoteContainer

{
    public tickerSymbol: string;
    public id: string;
    public customerId: string;
    public catalystDesc: string;

    /**
     * Determines whether to use the catalystDate if DateOrTimerPeriod == DATE or use the combination of
     * timerPeriodYear and timerPeriod if DateOrTimerPeriod == TIME_PERIOD.
     */
    public dateOrTimePeriod: DateOrTimePeriod;
    public timePeriod: number;
    public timePeriodYear: number;
    public catalystDate: Date;
    public stockPriceQuote: StockPriceQuote;
    public stockQuote: StockQuote;

    public getNotes(): string
    {
        return this.catalystDesc;
    }

    public getTickerSymbol(): string
    {
        return this.tickerSymbol;
    }

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }

    public getStockPriceQuote(): StockPriceQuote
    {
        return this.stockPriceQuote;
    }

    public getStockQuote(): StockQuote
    {
        return this.stockQuote;
    }

    public setStockPriceQuote( stockPriceQuote: StockPriceQuote )
    {
        this.stockPriceQuote = stockPriceQuote;
    }

    public setStockQuote( stockQuote: StockQuote )
    {
        this.stockQuote = stockQuote;
    }

    public getDefaultCrudTableColumns(): CrudTableColumns
    {
        let crudTableColumns = super.getDefaultCrudTableColumns();
        /*
    public dateOrTimePeriod: DateOrTimePeriod;
    public timePeriod: number;
    public timePeriodYear: number;
    public catalystDate: Date;
    public stockPriceQuote: StockPriceQuote;
    public stockQuote: StockQuote;
    */
        crudTableColumns.addColumn( {
                                        colId: 'catalystDesc',
                                        header: 'Description',
                                        dataType: CrudTableColumnType.STRING,
                                        field: 'catalystDesc',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'dateOrTimePeriod',
                                        header: 'Date/Period',
                                        dataType: CrudTableColumnType.CUSTOM,
                                        field: 'dateOrTimePeriod',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'timePeriod',
                                        header: 'Time Period',
                                        dataType: CrudTableColumnType.NUMBER,
                                        field: 'timePeriod',
                                        sortable: true
                                    } );
        crudTableColumns.addColumn( {
                                        colId: 'catalystDate',
                                        header: 'Catalyst Date',
                                        dataType: CrudTableColumnType.DATE,
                                        field: 'catalystDate',
                                        sortable: true
                                    } );
        return crudTableColumns;
    }
}
