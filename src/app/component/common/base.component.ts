import { OnChanges, OnDestroy, SimpleChange } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { BaseClass } from "../../common/base-class";
import { Subscription } from "rxjs/Subscription";

/**
 * This is the base class for all application components to contain common methods, services, and data
 * Created by mike on 11/27/2016.
 */
export abstract class BaseComponent extends BaseClass implements OnChanges, OnDestroy
{
    private subscriptions: Subscription[] = [];
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
        this.debug( "BaseComponent.constructor" );
    }

    /**
     * This method is called for changes to the input data
     * @param changes
     */
    public ngOnChanges( changes: {[propertyName: string]: SimpleChange} )
    {
        for ( let propName in changes )
        {
            let change = changes[propName];
            let currentValue = change.currentValue;
            let previousValue = change.previousValue;
            this.inputPropertyChange( propName, previousValue, currentValue );
        }
    }

    /**
     * This method is called when the instance is destroyed
     */
    public ngOnDestroy(): void
    {
        this.debug( "ngOnDestroy" );
        //this.unSubscribeAll();
    }

    /**
     * Unsubscribes from all registered subscriptions
     */
    protected unSubscribeAll()
    {
        this.debug( "unsubscribeAll" );
        for ( var subscription of this.subscriptions )
        {
            subscription.unsubscribe();
        }
    }

    /**
     * Adds {@code subscription} to a list of Subscriptions.
     * All registered subscriptions will be unsubscribed when the instance is destroyed.
     * @param {Subscription} subscription
     */
    protected addSubscription( subscription: Subscription )
    {
        this.subscriptions.push( subscription );
    }
    /**
     * This method is called by {@code ngOnChanges} for each property that has changed.
     * @param property The name of the property that has changed.
     * @param previousValue The previous value.
     * @param currentValue The current value.
     */
    protected inputPropertyChange( property: string, previousValue: any, currentValue: any )
    {
        this.debug( `inputPropertyChange property: ${property} ${previousValue} ==> ${currentValue}`)
    }

    /**
     * Defers the fn execution for 1 javascript cycle
     * @param fn
     */
    protected tickThenRun( fn: () => any )
    {
        setTimeout( fn, 0 );
    }

}
