import { PaginationURL } from "../../common/pagination-url";
import { Observable } from "rxjs";
import { PaginationPage } from "../../common/pagination";
import { Response } from "@angular/http";
import { CrudRestService } from "./crud-rest.serivce";
import { ModelObject } from "../../model/entity/modelobject";

/**
 * Extension of the CrudRestService to add paging and sorting capabilities
 *
 * Created by mike on 12/5/2016.
 */
export abstract class PagingRestCRUDService<T extends ModelObject<T>> extends CrudRestService<T>
{
    /**
     * This method use used to create a pagination URL to be used in the {@code getPage} method
     * to retrieve a page of model objects
     */
    protected abstract getPaginationUrl(): PaginationURL;

    /**
     * Retrieves a specific page of stocks
     * @param rowOffSet The page to retrieve
     * @param rows The numbers of rows per page (rows to return for this page)
     * @returns {Observable<PaginationPage<Stock>>}
     */
    public getPage( rowOffSet: number, rows: number ): Observable<PaginationPage<T>>
    {
        let methodName = "getPage";
        let url = this.getPaginationUrl().getPage( rowOffSet, rows );
        this.logger.log( `${methodName} url: ${url} rowOffset: ${rowOffSet} rows: ${rows}` );
        try
        {
            return this.http.get( url )
                            .map( ( response: Response ) =>
                                  {
                                      return response.json();
                                  })
                            .catch( ( error: any ) =>
                                  {
                                      this.reportError( error );
                                      return Observable.throw( error.json().error || 'Server error' );
                                  });
        }
        catch( exception )
        {
            this.reportError( exception );
        }
    }
}
