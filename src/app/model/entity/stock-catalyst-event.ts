import { DateOrTimePeriod } from '../../common/date-or-time-period.enum';
import { StockQuote } from './stock-quote';
import { StockPriceQuote } from './stock-price-quote';
import { StockModelObject } from '../common/stock-model-object';
import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';
import { CrudTableColumnType } from '../../component/crud/table/crud-table-column-type';
import { AdditionalStockModelObjectColumns } from '../../component/stock-table/additional-stock-model-object-columns';
import { ModelObject } from '../common/model-object';
import { StockAnalystConsensus } from './stock-analyst-consensus';
import { StockCompany } from './stock-company';
import { GainsLosses } from './gains-losses';
import { CommonStockModelObjectColumns } from '../../component/stock-table/common-stock-model-object-columns';
import { StockDashboardModelObject } from '../common/stock-dashboard-model-object';

/**
 * This entity contains the elements for the stock summary
 *
 * Created 10/17/2017
 */
export class StockCatalystEvent extends ModelObject<StockCatalystEvent>
                                implements StockModelObject, StockDashboardModelObject
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

    /*
     * Stock model object properties.
     */
    public stockAnalystConsensus: StockAnalystConsensus;
    public stockCompany: StockCompany;
    public stockGainsLosses: GainsLosses;
    public stockPriceQuote: StockPriceQuote;
    public stockQuote: StockQuote;
    public stockPriceWhenCreated: number;

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

    public getDefaultColumns(): CrudTableColumns
    {
        let crudTableColumns = new CrudTableColumns([]);
        crudTableColumns.addAll( new CommonStockModelObjectColumns() );
        crudTableColumns.addColumn( {
                                        colId: 'catalystDesc',
                                        header: 'Description',
                                        dataType: CrudTableColumnType.COMMENTS,
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

    /**
     * Creates a list of the stock columns.
     * @return {CrudTableColumns}
     */
    public getAdditionalColumns(): CrudTableColumns
    {
        return new AdditionalStockModelObjectColumns();
    }

    public getDashboardDefaultColumns(): CrudTableColumns
    {
        return this.getDefaultColumns();
    }

    public getDashboardAdditionalColumns(): CrudTableColumns
    {
        return this.getAdditionalColumns();
    }

    public initializeStockModelObjects()
    {
        this.stockPriceQuote = new StockPriceQuote();
        this.stockQuote = new StockQuote();
        this.stockCompany = new StockCompany();
        this.stockGainsLosses = new GainsLosses();
        this.stockAnalystConsensus = new StockAnalystConsensus();
    }
}
