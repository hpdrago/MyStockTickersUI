/**
 * This enum defines strategies to load model table.
 * LAZY loading means that page loading will be used and a page at a time will be loaded.
 * FULL means that the all available rows will be loaded.
 * ON_DEMAND means that when the table will not be automatically loaded when the table is created.
 * ON_CREATE means that the table will be loaded when the table is created/displayed.
 */
export enum TableLoadingStrategy
{
    LAZY_ON_CREATE,
    FULL_ON_CREATE,
    LAZY_ON_DEMAND,
    FULL_ON_DEMAND
}
export namespace TableLoadingStrategy
{
    /**
     * Convert the int value to the name of the enum.
     * @param {number} intValue
     * @returns {string}
     */
    export function getName( intValue: number )
    {
        switch( intValue )
        {
            case TableLoadingStrategy.LAZY_ON_CREATE:
                return "LAZY_ON_CREATE";
            case TableLoadingStrategy.FULL_ON_CREATE:
                return "FULL_ON_CREATE";
            case TableLoadingStrategy.LAZY_ON_DEMAND:
                return "LAZY_ON_DEMAND";
            case TableLoadingStrategy.FULL_ON_DEMAND:
                return "FULL_ON_DEMAND";
            default:
                return  intValue + " is an invalid value";
        }
    }

    /**
     * Returns true if all available rows will be loaded.
     * @param {TableLoadingStrategy} tableLoadingStrategy
     * @returns {boolean}
     */
    export function isFullLoading( tableLoadingStrategy: TableLoadingStrategy ): boolean
    {
        return tableLoadingStrategy == TableLoadingStrategy.FULL_ON_CREATE ||
               tableLoadingStrategy == TableLoadingStrategy.FULL_ON_DEMAND;
    }

    /**
     * Returns true if the table will use page loading.
     * @param {TableLoadingStrategy} tableLoadingStrategy
     * @returns {boolean}
     */
    export function isLazyLoading( tableLoadingStrategy: TableLoadingStrategy ): boolean
    {
        return tableLoadingStrategy == TableLoadingStrategy.LAZY_ON_CREATE ||
               tableLoadingStrategy == TableLoadingStrategy.LAZY_ON_DEMAND;
    }

    /**
     * Returns true if table will load only on demand -- it will not load immediately on creation.
     * @param {TableLoadingStrategy} tableLoadingStrategy
     * @returns {boolean}
     */
    export function isLoadOnDemand( tableLoadingStrategy: TableLoadingStrategy ): boolean
    {
        return tableLoadingStrategy == TableLoadingStrategy.FULL_ON_DEMAND ||
               tableLoadingStrategy == TableLoadingStrategy.LAZY_ON_DEMAND;
    }

    /**
     * The table will be loaded automatically.
     * @param {TableLoadingStrategy} tableLoadingStrategy
     * @returns {boolean}
     */
    export function isLoadOnCreate( tableLoadingStrategy: TableLoadingStrategy ): boolean
    {
        return tableLoadingStrategy == TableLoadingStrategy.FULL_ON_CREATE ||
               tableLoadingStrategy == TableLoadingStrategy.LAZY_ON_CREATE;
    }


}
