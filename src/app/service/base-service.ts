/**
 * This is the base class for the application services providing common methods and data
 *
 * Created by mike on 10/23/2016.
 */
import { Logger } from "../common/logger";
import { LoggerFactory } from "../common/logger-factory";

export abstract class BaseService
{
    protected logger: Logger;

    constructor()
    {
        this.logger = LoggerFactory.getLogger( (<any>this).constructor.name );
    }

    protected reportError( error ): string
    {
        this.logger.error( error );
        return error;
    }
}