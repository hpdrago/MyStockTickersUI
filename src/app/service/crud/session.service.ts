import { Injectable } from "@angular/core";
import { AppConfigurationService } from "../app-configuration.service";
import { BaseService } from "../base-service";

/**
 * Created by mike on 10/22/2016.
 */
@Injectable()
export class SessionService extends BaseService
{
    private loggedInUserId: number = 1;

    constructor( private config: AppConfigurationService )
    {
        super();
    }

    /**
     * Get the user id of the logged in user
     * @returns {number}
     */
    public getLoggedInUserId(): number
    {
        return this.loggedInUserId;
    }

    /**
     * Determines if the current user is an admin user
     * @returns {boolean}
     */
    public isAdminUser(): boolean
    {
        return this.loggedInUserId == this.config.getAdminUserId();
    }
}
