/**
 * This class is a custom provider for the Logger server.
 * The Logger service requires the name of the class so that log message can show up with the class
 * from which they were generated
 *
 * Created by mike on 10/22/2016.
 */

import { Logger } from "../service/logger.service";

let loggerServiceFactory = () =>
{
    return new Logger();
};

export let loggerServiceProvider =
{
    provide: Logger,
    useFactory: loggerServiceFactory,
    deps: []
};
