/**
 * This class manages a Spring REST URL including the oonversion
 * from a PrimeNG DataTable pagination request (page load) to a
 * proper Spring REST paging request
 *
 * Created by mike on 10/5/2016.
 */
export class PaginationURL
{
    private url: string;

    /**
     * Create a new instance
     * @param url The base URL to which the page number and number of rows will be added
     *        to make a proper request to a Spring REST service
     */
    constructor( url: string )
    {
        this.url = url;
    }

    /**
     * Get the url without any pagination
     * @returns {any}
     */
    public getUrl(): string
    {
        return this.url;
    }

    /**
     * Format the URL to make a Spring REST page request
     * @param pageNumber Starting at page number
     * @param rows The number of rows to retrieve
     * @returns {any}
     */
    public getPage( rowOffSet: number, rows: number  ): string
    {
        /*
         * Need to calculate the page number from the rowOffSet
         */
        var pageNumber = (rowOffSet + rows) / rows;
        var url = this.url + "?page=" + pageNumber + "&limit=" + rows;
        return url;
    }
}
