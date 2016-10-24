/**
 * Created by mike on 4/24/2016.
 */
import { Injectable } from "@angular/core";

@Injectable()
export class Logger
{
    private className: string;

    public setClassName( className: string )
    {
        this.className = className;
    }

    public debug( message: any )
    {
        console.debug( this.formatMessage( message ) );
    }

    public log( message: any )
    {
        console.log( this.formatMessage( message ) );
    }

    public error( msg: any )
    {
        console.error( this.formatMessage( msg ) );
    }

    public warn( msg: any )
    {
        console.warn( this.formatMessage( msg ) );
    }

    private formatMessage( msg: any ): string
    {
        return this.className == null ? msg : this.className + " " + msg;
    }
}

