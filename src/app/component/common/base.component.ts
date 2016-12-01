/**
 * This is the base class for all application components to contain common methods, services, and data
 * Created by mike on 11/27/2016.
 */
import { Logger } from "../../common/logger";
import { LoggerFactory } from "../../common/logger-factory";

export class BaseComponent
{
    protected logger: Logger;

    constructor()
    {
        this.logger = LoggerFactory.getLogger( this.getClassName() );
    }

    private getClassName(): string
    {
        return (<any>this).constructor.name;
    }
}
