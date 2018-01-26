import { AsyncCacheService } from './async-cache.service';
import { CacheStateContainer } from '../../model/common/cache-state-container';
import { CrudActionHandler } from '../../component/crud/common/crud-action-handler';
import { ToastsManager } from 'ng2-toastr';
import { ModelObjectFactory } from '../../model/factory/model-object.factory';
import { Injectable } from '@angular/core';
import { ModelObject } from '../../model/common/model-object';

@Injectable()
export abstract class AsyncCrudCacheService<K,T extends CacheStateContainer<K> & ModelObject<T>>  extends AsyncCacheService<K,T>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {ModelObjectFactory<T extends CacheStateContainer<K>>} modelObjectFactory
     * @param {CrudActionHandler<T extends CacheStateContainer<K>>} crudActionHandler
     */
    protected constructor( protected toaster: ToastsManager,
                           protected modelObjectFactory: ModelObjectFactory<T>,
                           protected crudActionHandler: CrudActionHandler<T> )
    {
        super( toaster, modelObjectFactory );
        /*
         * Delete the cache entry when the deleted.
         */
        crudActionHandler.subscribeToModelObjectAdd( modelObject => this.onModelObjectDelete( modelObject ));
        /*
         * Update the cache entry when the model object is updated.
         */
        crudActionHandler.subscribeToModelObjectSave( modelObject => this.onModelObjectSave( modelObject ));
        /*
         * Add to the cache when a model object is added.
         */
        crudActionHandler.subscribeToModelObjectAdd( modelObject => this.onModelObjectAdd( modelObject ));
    }

    /**
     * Delete the cache entry for the model object.
     * @param {T} modelObject
     */
    protected onModelObjectDelete( modelObject: T )
    {
        this.delete( modelObject.getKey() );
    }

    /**
     * Update the model object in the cache.
     * @param {T} modelObject
     */
    protected onModelObjectSave( modelObject: T )
    {
        this.addCacheData( modelObject.getKey(), modelObject );
    }

    /**
     * Add the model object to the cache.
     * @param {T} modelObject
     */
    protected onModelObjectAdd( modelObject: T )
    {
        this.addCacheData( modelObject.getKey(), modelObject );
    }
}
