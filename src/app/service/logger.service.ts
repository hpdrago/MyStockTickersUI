/**
 * Created by mike on 4/24/2016.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService
{
    log( message: string )
    {
        console.log(message);
    }
}

