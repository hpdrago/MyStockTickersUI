import { Logger } from "./logger";

/**
 * Factory class to create logger instances that cannot be created by DI
 * Created by mike on 11/27/2016.
 */

export class LoggerFactory
{
    static getLogger( className: string ): Logger
    {
        var logger: Logger = new Logger();
        logger.setClassName( className );
        return logger;
    }

}
