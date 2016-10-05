/**
 * Created by mike on 4/24/2016.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService
{
    logs: string[] = []; // capture logs for testing
    log( message: string )
    {
        this.logs.push(message);
        console.log(message);
    }
}

