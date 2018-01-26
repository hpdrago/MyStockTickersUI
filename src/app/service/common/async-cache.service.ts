import { Observable } from "rxjs/Observable";
import { ToastsManager } from "ng2-toastr";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';
import { CacheStateContainer } from '../../model/common/cache-state-container';
import { BaseService } from '../base-service';
import { ModelObjectFactory } from '../../model/factory/model-object.factory';

/**
 * This is a generic cache to work with the Async Entity Cache on the backend.  It manages the caching and retrieval
 * of the requested data and notifies subscribers when the cache data changes.  It pushes the data to the components
 * using RxJs subjects.
 */
export abstract class AsyncCacheService<K,T extends CacheStateContainer<K>> extends BaseService
{
    /**
     * Contains the current cached values
     * @type {Map<any, any>}
     */
    private cacheSubjectMap: Map<K, BehaviorSubject<T>> = new Map();
    /**
     * Contains the cached keys currently being retrieved.
     * @type {Map<any, any>}
     */
    private workingMap: Map<K, boolean> = new Map();

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {ModelObjectFactory<T extends CacheStateContainer<K>>} modelObjectFactory
     */
    protected constructor( protected toaster: ToastsManager,
                           protected modelObjectFactory: ModelObjectFactory<T> )
    {
        super( toaster );
    }

    /**
     * Subscribe to cached data changes.  When calling this method, if the cached data is not
     * in the cache, the receivedCachedData method will be called with a null value but after the cached data
     * has been received, a subsequent call to receivedCachedData will be called with the new cached data value and
     * whenever the cached data value changes, the receivedCachedData method will be called as well.
     * @param {K} key
     * @returns {Observable<T>}
     */
    public subscribeToChanges( key: K, receiveCachedData: ( cachedData: T ) => any ): Subscription
    {
        let methodName = "subscribeToChanges";
        this.debug( methodName + " " + key  );
        if ( isNullOrUndefined( key ))
        {
            throw new ReferenceError( key + ' is null or undefined' );
        }
        /*
         * Check to see if the stock price is in the cache
         */
        let subject = this.cacheSubjectMap
                          .get( key );
        if ( isNullOrUndefined( subject ))
        {
            subject = new BehaviorSubject<T>( null );
            this.debug( methodName + " " + key + " is not in the cache.  Fetching..." );
            this.cacheSubjectMap
                .set( key, subject );
            /*
             * Not in the cache, so fetch it and then broadcast the new stock price.
             */
            if ( this.workingMap.get( key ) )
            {
                this.debug( methodName + ' ' + key + ' is already being fetched' );
            }
            else
            {
                this.fetchData( key );
            }
        }
        this.checkDataExpiration( subject, key );
        return subject.subscribe( receiveCachedData );
    }

    /**
     * Check to see if the cached data has expired and if so, refresh the data.
     */
    private checkDataExpiration( subject: BehaviorSubject<T>, key: K )
    {
        let methodName = 'checkStockPriceExpiration';
        this.debug( methodName + ' ' + key );
        if ( !isNullOrUndefined( subject ) &&
             !isNullOrUndefined( subject.getValue() ))
        {
            let cachedData: T = subject.getValue();
            this.debug( methodName + ' ' + JSON.stringify( cachedData ));
            let expirationTime: Date = cachedData.getExpirationTime();
            if ( isNullOrUndefined( expirationTime ) )
            {
                this.fetchData( key );
            }
            else
            {
                if ( expirationTime instanceof Date &&
                     expirationTime.getTime() < Date.now() )
                {
                    this.debug( methodName + ' ' + key + ' has expired, updating price...' );
                    this.fetchData( key );
                }
            }
        }
    }

    /**
     * Fetches the cached data and updates the cache.
     * @param {K} key
     */
    private fetchData( key: K )
    {
        let methodName = 'fetchData';
        if ( isNullOrUndefined( key ))
        {
            throw new ReferenceError( key + ' is null or undefined' );
        }
        this.debug( methodName + ' ' + key );
        this.workingMap
            .set( key, true );
        this.fetchCachedDataFromBackend( key )
            .subscribe( ( cachedData: T ) =>
            {
                this.debug( methodName + ' ' + key + ' retrieved ' + JSON.stringify( cachedData ) );
                if ( isNullOrUndefined( cachedData.getCacheState() ))
                {
                    this.logError( "Received null cached state" );
                }
                this.sendCachedDataChange( key, cachedData );
                this.workingMap
                    .delete( key );
                return cachedData
            },
            error =>
            {
                this.workingMap
                    .delete( key );
                /*
                this.restErrorReporter
                    .reportRestError( error );
                    */
                let cachedData: T = this.modelObjectFactory
                                        .newModelObject();
                cachedData.setCacheError( error );
                this.sendCachedDataChange( key, cachedData );
            });
    }

    /**
     * Makes a service call to the StoxTracker backend to retrieved the cached data.
     * @param {K} key
     * @return {Observable<T extends CacheStateContainer<K>>}
     */
    protected abstract fetchCachedDataFromBackend( key: K ): Observable<T>;

    /**
     * Send the cached data to all subscribers of the key.
     * @param {K} key
     * @param {T} cachedData
     */
    public sendCachedDataChange( key: K, cachedData: T )
    {
        let methodName = 'sendCachedDataChange';
        this.debug( methodName + ' ' + key + ' ' + JSON.stringify( cachedData ) );
        this.getSubject( key )
            .next( cachedData );
    }

    /**
     * Get the stock price subject and throw and exception if it doesn't exist.
     * @param {string} tickerSymbol
     */
    protected getSubject( key: K ): BehaviorSubject<T>
    {
        let subject = this.cacheSubjectMap
                          .get( key );
        if ( subject == null )
        {
            throw new Error( "There are no registrations for " + key );
        }
        return subject;
    }
}
