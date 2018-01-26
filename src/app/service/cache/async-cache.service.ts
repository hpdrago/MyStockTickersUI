import { Observable } from "rxjs/Observable";
import { ToastsManager } from "ng2-toastr";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';
import { CacheStateContainer } from '../../model/common/cache-state-container';
import { BaseService } from '../base-service';
import { ModelObjectFactory } from '../../model/factory/model-object.factory';
import { CachedValueState } from '../../common/cached-value-state.enum';
import { Subject } from 'rxjs/Subject';

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
    private workingMap: Map<K, Observable<T>> = new Map();

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
     * Delete the cache entry for {@code key}.
     * @param {K} key
     */
    public delete( key: K )
    {
        this.cacheSubjectMap
            .delete( key );

    }

    /**
     * Checks the cache to see if there is an entry in the cache, if not or if the entry is stale, new cached data
     * will be fetched.  This method does not subscribe to future changes of the cached item, it is a one-time use
     * method to obtain the cached data.
     * @param {K} key
     * @return {Observable<T extends CacheStateContainer<K>>}
     */
    public get( key: K ): Observable<T>
    {
        const methodName = 'get';
        this.debug( methodName + ' ' + key );
        let cacheSubject: BehaviorSubject<T> = this.cacheSubjectMap
                                              .get( key );
        let returnObservable: Observable<T>;
        if ( isNullOrUndefined( cacheSubject ))
        {
            this.debug( methodName + ' ' + key + ' is not in the cache' );
            returnObservable = this.fetchData( key );
        }
        else
        {
            this.debug( methodName + ' ' + key + ' is in the map with ' + cacheSubject.observers.length + ' observers' );
            returnObservable = this.getAndCheckDataExpiration( key );
        }
        return returnObservable;
    }

    /**
     * Subscribe to cached data changes.  When calling this method, if the cached data is not
     * in the cache, the receivedCachedData method will be called with a null modelObjectRows but after the cached data
     * has been received, a subsequent call to receivedCachedData will be called with the new cached data modelObjectRows and
     * whenever the cached data modelObjectRows changes, the receivedCachedData method will be called as well.
     * @param {K} key
     * @param {(cachedData: T) => any} receiveCachedData
     * @return {Subscription}
     */
    public subscribe( key: K, receiveCachedData: ( cachedData: T ) => any ): Subscription
    {
        const methodName = "subscribe";
        this.debug( methodName + " " + key  );
        if ( isNullOrUndefined( key ))
        {
            throw new ReferenceError( key + ' is null or undefined' );
        }
        /*
         * Check to see if the subject/cache entry is already created
         */
        let subject: BehaviorSubject<T> = this.cacheSubjectMap
                                              .get( key );
        let subscription: Subscription;
        if ( isNullOrUndefined( subject ) )
        {
            this.debug( methodName + " " + key + " is not in the cache.  creating cache entry" );
            let subject: BehaviorSubject<T> = this.createCacheEntry( key );
            subscription = subject.subscribe( receiveCachedData );
            /*
             * Notify all subscribers with the initial data values.
             */
            this.sendCachedDataChange( key, this.cacheSubjectMap
                                                .get( key )
                                                .getValue() );
            /*
             * Go get the data and send the change to the subscribers.
             */
            this.fetchData( key )
                .subscribe()
                .unsubscribe();
        }
        else
        {
            this.debug( methodName + ' ' + key + ' is in the cache with ' + subject.observers.length + ' observers' );
            subscription = subject.subscribe( receiveCachedData );
            this.getAndCheckDataExpiration( key );
        }
        return subscription;
    }

    /**
     * Check to see if the cached data has expired and if so, refreshes the data.
     * @param {K} key
     * @param {Subject<T extends CacheStateContainer<K>>} subject
     * @return {Observable<T extends CacheStateContainer<K>>}
     */
    private getAndCheckDataExpiration( key: K ): Observable<T>
    {
        const methodName = 'getAndCheckDataExpiration';
        this.debug( methodName + '.begin ' + key );
        let returnObservable: Observable<T> = this.workingMap.get( key );
        if ( isNullOrUndefined( returnObservable ))
        {
            let subject: BehaviorSubject<T> = this.cacheSubjectMap
                                                  .get( key );
            let cachedData: T = subject.getValue();
            if ( !isNullOrUndefined( cachedData ) )
            {
                this.debug( methodName + ' ' + JSON.stringify( cachedData ) );
                let expirationTime: Date = cachedData.getExpirationTime();
                if ( isNullOrUndefined( expirationTime ) )
                {
                    this.debug( methodName + ' expirationTime is null, fetching data...' );
                    returnObservable = this.fetchData( key );
                }
                else
                {
                    if ( expirationTime instanceof Date &&
                         expirationTime.getTime() < Date.now() )
                    {
                        this.debug( methodName + ' ' + key + ' has expired, fetching data...' );
                        returnObservable = this.fetchData( key );
                    }
                    else if ( CachedValueState.isStale( cachedData.getCacheState() ))
                    {
                        this.debug( methodName + ' ' + key + ' is stale, fetching data...' );
                        returnObservable = this.fetchData( key );
                    }
                    else
                    {
                        returnObservable = Observable.of( cachedData );
                    }
                }
            }
            else
            {
                this.debug( methodName + ' ' + key + ' data is null, fetching data...' );
                returnObservable = this.fetchData( key );
            }
        }
        this.debug( methodName + '.end ' + key );
        return returnObservable;
    }

    /**
     * Fetches the cached data and updates the cache.
     *
     * @param {K} key
     * @return {Observable<T extends CacheStateContainer<K>>}
     */
    protected fetchData( key: K ): Observable<T>
    {
        const methodName = 'fetchData';
        if ( isNullOrUndefined( key ))
        {
            throw new ReferenceError( 'key argument is null or undefined' );
        }
        this.debug( methodName + ' ' + key );
        this.debug( methodName + ' calling fetchCachedDataFromBackend with ' + key );
        let returnObservable: Observable<T> = this.fetchCachedDataFromBackend( key );
        this.workingMap
            .set( key, returnObservable );
        returnObservable.subscribe( ( cachedData: T ) =>
                        {
                            this.debug( methodName + ' ' + key + ' retrieved ' + JSON.stringify( cachedData ) );
                            this.workingMap
                                .delete( key );
                            if ( isNullOrUndefined( cachedData.getCacheState() ))
                            {
                                this.logError( "Received null cached state" );
                            }
                            this.sendCachedDataChange( key, cachedData );
                        },
                        error =>
                        {
                            this.workingMap
                                .delete( key );
                            let cachedData: T = this.modelObjectFactory
                                                    .newModelObject();
                            cachedData.setCacheError( error );
                            this.sendCachedDataChange( key, cachedData );
                        });
        return returnObservable;
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
        const methodName = 'sendCachedDataChange';
        this.debug( methodName + ' ' + key + ' ' + JSON.stringify( cachedData ) );
        let subject = this.cacheSubjectMap
                          .get( key );
        if ( isNullOrUndefined( subject ))
        {
            this.debug( methodName + ' no cache entry found' );
        }
        else
        {
            this.debug( methodName + ' sending ' + JSON.stringify( cachedData ) +
                        ' to ' + subject.observers.length + ' observers' );
            subject.next( cachedData );
        }
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

    /**
     * Adds the {@code cacheData} to the cache.  Will create a cache entry if it does not exist.
     * @param {T} cacheData
     */
    public addCacheData( key: K, cacheData: T ): BehaviorSubject<T>
    {
        let methodName = 'addCacheData';
        this.debug( methodName + ' ' + key )
        let subject: BehaviorSubject<T> = this.cacheSubjectMap
                                              .get( key );
        if ( isNullOrUndefined( subject ))
        {
            subject = this.createCacheEntry( key );
        }
        subject.next( cacheData );
        return subject;
    }

    /**
     * Creates a cache entry for the key.
     * @param {K} key
     * @return {BehaviorSubject<T extends CacheStateContainer<K>>}
     */
    private createCacheEntry( key: K ): BehaviorSubject<T>
    {
        let methodName = 'createCacheEntry';
        this.debug( methodName + ' ' + key )
        /*
         * Send the model object with the cache state of STALE so the component will display the loading message.
         */
        let modelObject: T = this.modelObjectFactory.newModelObject();
        modelObject.setKey( key );
        modelObject.setCacheState( CachedValueState.STALE );
        modelObject.setCacheError( '' );
        /*
         * Add the subject holding the model object to the cache.
         */
        let subject: BehaviorSubject<T> = new BehaviorSubject<T>( modelObject );
        this.cacheSubjectMap
            .set( key, subject );
        return subject;
    }
}
