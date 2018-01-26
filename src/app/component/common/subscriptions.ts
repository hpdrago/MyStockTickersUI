import { Subscription } from 'rxjs/Subscription';
import { BaseClass } from '../../common/base-class';
import { isNullOrUndefined } from 'util';

/**
 * Class to manage a set of subscriptions.
 */
export class Subscriptions extends BaseClass
{
    private subscriptions: Map<string,Subscription> = new Map<string,Subscription>();

    /**
     * Unsubscribe from all registered subscriptions
     */
    public unSubscribeAll()
    {
        const methodName = 'unsubscribeAll';
        //this.debug( `${methodName} ${this.subscriptions.size} subscriptions` );
        this.subscriptions
            .forEach( (subscription, name) =>
                      {
                          this.debug( `${methodName} unsubscribe ${name}` );
                          subscription.unsubscribe();
                      });

    }

    /**
     * Adds {@code subscription} to a map of Subscriptions.
     * @param {Subscription} subscription
     * @param {string} subjectName
     */
    public addSubscription( subjectName: string, subscription: Subscription )
    {
        const methodName = 'addSubscription';
        //this.debug( methodName + " subscribing to " + subjectName );
        if ( isNullOrUndefined( subscription ))
        {
            throw ReferenceError( "subscription cannot be null or undefined" );
        }
        if ( isNullOrUndefined( subjectName ))
        {
            throw ReferenceError( "subjectName cannot be null or undefined" );
        }
        let existingSubscription: Subscription = this.subscriptions
                                                     .get( subjectName );
        if ( !isNullOrUndefined( existingSubscription ))
        {
            this.debug( `${methodName} subscription ${subjectName} already exists, unsubscribing first` );
            existingSubscription.unsubscribe();
        }
        this.subscriptions.set( subjectName, subscription );
    }
}
