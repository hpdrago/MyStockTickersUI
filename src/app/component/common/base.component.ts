import { Input, OnChanges, OnDestroy, SimpleChange } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { BaseClass } from "../../common/base-class";
import { Subscription } from "rxjs/Subscription";
import { Subscriptions } from './subscriptions';
import * as _ from "lodash";

/**
 * This is the base class for all application components to contain common methods, services, and data
 * Created by mike on 11/27/2016.
 */
export abstract class BaseComponent extends BaseClass implements OnChanges, OnDestroy
{
    private subscriptions: Subscriptions = new Subscriptions();

    protected disabled: boolean = false;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    protected constructor( protected toaster: ToastsManager )
    {
        super( toaster );
        //this.debug( "BaseComponent.constructor" );
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
        //this.debug( 'BaseComponent.ngOnDestroy' );
        this.unSubscribeAll();
    }

    /**
     * Unsubscribes from all registered subscriptions
     */
    protected unSubscribeAll()
    {
        this.subscriptions
            .unSubscribeAll();
    }

    /**
     * Adds {@code subscription} to a list of Subscriptions.
     * All registered subscriptions will be unsubscribed when the instance is destroyed.
     * @param {Subscription} subscription
     * @param {string} subjectName
     */
    protected addSubscription( subjectName: string, subscription: Subscription )
    {
        this.subscriptions.addSubscription( subjectName, subscription );
    }

    /**
     * This method is called by {@code ngOnChanges} for each property that has changed.
     * @param property The name of the property that has changed.
     * @param previousValue The previous modelObjectRows.
     * @param currentValue The current modelObjectRows.
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

    /**
     * Provide a stringify method that can be used intemplates for debugging.
     * @param object
     * @return {string}
     */
    public stringify( object: any ): string
    {
        return JSON.stringify( object );
    }

    /**
     * Using Lodash to extract a property from an object where the property can include a full dot path to other objects.
     * @param object
     * @param {string} property
     * @return {undefined}
     */
    protected getProperty( object: any, property: string ): any
    {
        let value = _.get( object, property );
        /*
        this.debug( "getProperty object: " + JSON.stringify( object ) );
        this.debug( "getProperty object: property: " + property + " modelObject: " + JSON.stringify(this.modelObject));
        */
        return value;
    }

}
