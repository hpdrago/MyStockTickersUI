import { CrudTableColumns } from '../../component/crud/table/crud-table-columns';

/**
 * This interface is for model objects that are displayed on the dashboard which is better displayed with only the
 * most necessary columns due to the restricted space.
 */
export interface StockDashboardModelObject
{
    /**
     * Provides an alternate list for the default columns for the dashboard table.
     * @return {CrudTableColumns}
     */
    getDashboardDefaultColumns(): CrudTableColumns

    /**
     * Provides an alternate list for the additional columns for the dashboard table.
     * @return {CrudTableColumns}
     */
    getDashboardAdditionalColumns(): CrudTableColumns
}
