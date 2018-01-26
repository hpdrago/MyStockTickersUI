import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './base-service';
import { ToastsManager } from 'ng2-toastr';
import { AppConfigurationService } from './app-configuration.service';
import { SessionService } from './session.service';

/**
 * File upload service.
 */
@Injectable()
export class UploadFileService extends BaseService
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {AppConfigurationService} applicationConfiguration
     * @param {HttpClient} http
     */
    constructor( protected toaster: ToastsManager,
                 private applicationConfiguration: AppConfigurationService,
                 private session: SessionService,
                 private http: HttpClient )
    {
        super( toaster );
    }

    /**
     * Push a file to the backend storage.
     * @param {File} file
     * @return {Observable<HttpEvent<{}>>}
     */
    public pushFileToStorage( file: File ): Observable<HttpEvent<{}>>
    {
        const formdata: FormData = new FormData();

        formdata.append( 'file', file );

        const req = new HttpRequest( 'POST', this.getFileUploadURL(), formdata,
        {
            reportProgress: true,
            responseType: 'text'
        } );

        return this.http.request( req );
    }

    public getLastCustomerFile(): Observable<Blob>
    {
        const methodName = 'getLastCustomerFile';
        this.debug( methodName );
        return this.http
                   .get( this.applicationConfiguration.getBaseURL() + '/upload/customerId/' +
                             this.session.getLoggedInUserId() + '/file', { responseType: "blob" } )
                   .map( (blob: Blob) =>
                         {
                             this.debug( methodName + ' received file of size ' + blob.size );
                             return blob;
                         });
    }

    public getFiles(): Observable<any>
    {
        return this.http.get( '/getallfiles' );
    }


    /**
     * Get the URL to upload a file.
     * @return {string}
     */
    public getFileUploadURL(): string
    {
        return this.applicationConfiguration.getBaseURL() + '/upload/customerId/' +
               this.session.getLoggedInUserId() + '/file';
    }
}
