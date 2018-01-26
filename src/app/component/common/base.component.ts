import { Input, OnChanges, OnDestroy, SimpleChange } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { BaseClass } from "../../common/base-class";
import { Subscription } from "rxjs/Subscription";
import { isNullOrUndefined } from 'util';

/**
 * This is the base class for all application components to contain common methods, services, and data
 * Created by mike on 11/27/2016.
 */
export abstract class BaseComponent extends BaseClass implements OnChanges, OnDestroy
{
    private subscriptions: Subscription[] = [];

    protected disabled: boolean = false;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    protected constructor( protected toaster: ToastsManager )
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
        this.debug( 'BaseComponent.ngOnDestroy' );
        this.unSubscribeAll();
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
     * @param {string} subjectName
     */
    protected addSubscription( subjectName: string, subscription: Subscription )
    {
        const methodName = 'addSubscription';
        this.debug( methodName + " subscribing to " + subjectName );
        if ( isNullOrUndefined( subscription ))
        {
            throw ReferenceError( "subscription cannot be null or undefined" );
        }
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
        try
        {
            let previous = JSON.stringify( previousValue );
            let newValue = JSON.stringify( currentValue );
            this.debug( `inputPropertyChange property: ${property} ${previous} ==> ${newValue}`)
        }
        catch ( e )
        {
            // ignore, was getting circular reference issues doing JSON.stringify
        }
    }

    /**
     * Defers the fn execution for 1 javascript cycle
     * @param fn
     */
    protected tickThenRun( fn: () => any )
    {
        setTimeout( fn, 0 );
    }

    /**
     * Disable the component.
     * @param {boolean} disabled
     */
    public setDisabled( disabled: boolean )
    {
        this.log( 'setDisabled ' + disabled );
        this.disabled = disabled;
    }

    /**
     * Determines if the component is disabled.
     * @return {boolean}
     */
    public isDisabled(): boolean
    {
        return this.disabled;
    }

}
