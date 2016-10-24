/**
 * Created by mike on 10/23/2016.
 */

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import '../rxjs-operators';

import { SessionService } from "./session.service";
import { AppConfigurationService } from "./app-configuration.service";

@Injectable()
export abstract class BaseRestService
{
    constructor( protected http: Http,
                 protected config: AppConfigurationService,
                 protected session: SessionService )
    {
    }

    protected getContext() : string
    {
        return "";
    }

    protected getUrl()
    {
        return this.config.getBaseUrl() + "/" + this.getContext();
    }
}