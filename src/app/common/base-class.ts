import { Logger } from "./logger";
import { LoggerFactory } from "./logger-factory";
import { OnDestroy } from "@angular/core";
import { Toast, ToastsManager } from "ng2-toastr";
import { isNullOrUndefined } from "util";

/**
 * This is the BaseClass for all classes to provide common logging and other methods that are of value amongst all
 * objects of the application.
 */
export class BaseClass implements OnDestroy
{
    protected logger: Logger;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    constructor( protected toaster?: ToastsManager )
    {
        this.logger = LoggerFactory.getLogger( this.getClassName() );
        this.debug( "Constructor toaster: " +  toaster );
    }

    public ngOnDestroy(): void
    {
        this.debug( "BaseClass.ngOnDestroy" );
    }

    /**
     * Logs a debug message
     * @param message
     */
    protected debug( message: string )
    {
        this.logger.debug( message );
    }

    /**
     * Logs an info message
     * @param message
     */
    protected log( message: string )
    {
        this.logger.log( message );
    }

    /**
     * Logs an info message
     * @param message
     */
    protected logError( message: string )
    {
        this.logger.error( message );
    }

    /**
     * Get the class name of this object
     */
    protected getClassName(): string
    {
        return (<any>this).constructor.name;
    }

    /**
     * Display an error message to the user for 10 seconds.
     * @param message
     * @return {Promise<Toast>}
     */
    protected showError( message: string )//: Promise<Toast>
    {
        return this.showErrorWithDelay( message, 10 );
    }

    /**
     * Display an error message to the user for 20 seconds.
     * @param message
     * @return {Promise<Toast>}
     */
    protected showLongError( message: string )//: Promise<Toast>
    {
        return this.showErrorWithDelay( message, 20 );
    }

    /**
     * Display an error message to the user for a specified number of seconds.
     * @param message
     * @param seconds
     * @return {Promise<Toast>}
     */
    protected showErrorWithDelay( message: string, seconds: number ): Promise<Toast>
    {
        this.checkToasterInstance();
        return this.toaster.error( message, "Error", {toastLife: seconds * 1000 } );
    }

    /**
     * Display a warning message to the user.
     * @param message
     * @return {Promise<Toast>}
     */
    protected showWarning( message: string ): Promise<Toast>
    {
        this.checkToasterInstance();
        return this.toaster.warning( message );
    }

    /**
     * Display an info message tothe user.
     * @param message
     * @return {Promise<Toast>}
     */
    protected showInfo( message: string )// : Promise<Toast>
    {
        this.checkToasterInstance();
        return this.toaster.info( message );
    }

    /**
     * Check the toaster instance and throw an exception if it hasn't been set.
     */
    private checkToasterInstance()
    {
        if ( isNullOrUndefined( this.toaster ))
        {
            this.logError( this.getClassName() + " toaster is null" );
            throw new ReferenceError( "toaster is null" );
        }
    }
}
