/**
 * Created by mike on 10/22/2016.
 */
import { Injectable } from "@angular/core";
import { StockSectorMap } from "../model/stock-sectors";

@Injectable()
export class AppConfigurationService
{
    private ADMIN_USER_ID = 1;
    private baseURL = "http://localhost:8080";

    /**
     * Get the admin user id;
     * @returns {number}
     */
    public getAdminUserId(): number
    {
        return this.ADMIN_USER_ID;
    }

    /**
     * Get the base url which includes the transport, host, and port
     * @returns {any}
     */
    public getBaseUrl(): string
    {
        return this.baseURL;
    }
}