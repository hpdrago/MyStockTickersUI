import { CrudTableColumnType } from './crud-table-column-type';
import { CrudTableColumnCachedDataType } from './crud-table-column-cached-data-type';

/**
 * Defines the properties of a crud table column.
 * These values are used to determine the contents of a crud table and also provides the means of defines a set of
 * crudTableColumns that can be shared between components.
 */
export interface CrudTableColumn
{
    colId: string;
    header: string;
    dataType: CrudTableColumnType;
    cachedDataType?: CrudTableColumnCachedDataType;
    field?: string;
    style?: any;
    sortable?: boolean;
    handled?: boolean;
}
