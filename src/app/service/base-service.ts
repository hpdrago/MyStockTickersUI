/**
 * This is the base class for the application services providing common methods and data
 *
 * Created by mike on 10/23/2016.
 */
import { Logger } from "../common/logger";
import { LoggerFactory } from "../common/logger-factory";
import { BaseClass } from "../common/base-class";

export abstract class BaseService extends BaseClass
{
    constructor()
    {
        super();
    }

    protected reportError( error ): string
    {
        this.logger.error( error );
        return error;
    }
}
