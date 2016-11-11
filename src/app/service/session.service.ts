/**
 * Created by mike on 10/22/2016.
 */
import { Injectable } from "@angular/core";
import { AppConfigurationService } from "./app-configuration.service";
import { Logger } from "./logger.service";

@Injectable()
export class SessionService
{
    private loggedInUserId: number = 2;

    constructor( private logger: Logger,
                 private config: AppConfigurationService )
    {
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
