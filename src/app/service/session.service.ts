import { Injectable } from "@angular/core";
import { AppConfigurationService } from "./app-configuration.service";
import { BaseService } from "./base-service";
import { Customer } from "../model/entity/customer";

/**
 * Created by mike on 10/22/2016.
 */
@Injectable()
export class SessionService extends BaseService
{
    private _customer: Customer;

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
        return this._customer.id;
    }

    /**
     * Determines if the current user is an admin user
     * @returns {boolean}
     */
    public isAdminUser(): boolean
    {
        return this._customer.id == this.config.getAdminUserId();
    }

    public set customer( customer: Customer )
    {
        this._customer = customer;
    }

    public get customer(): Customer
    {
        return this._customer;
    }
}