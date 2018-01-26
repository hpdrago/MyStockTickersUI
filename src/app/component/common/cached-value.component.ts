import { BaseComponent } from './base.component';
import { Component, Input } from '@angular/core';
import { CachedValueState } from '../../common/cached-value-state.enum';
import { ToastsManager } from 'ng2-toastr';

/**
 * This component handles displaying of model object data that is asynchronously loaded from the backend.  When these
 * model objects are loaded, they have an instance of {@code CacheStateEnum} to indicate the status of data contained
 * in the model object.  There are four possible values of state enum:
 * - CURRENT: The data is up to date and can be displayed.
 * - STALE: The data is stale and is currently being loaded by the backend and a subsequent call to the backend to
 *          get the current data is needed.
 * - FAILURE: There was a failure trying to load the data.
 * - NOT_FOUND: The data was not found
 */
@Component
({
    selector: 'cached-value',
    template: `
        <div [ngSwitch]="cacheState">
            <div *ngSwitchCase="CachedValueState.CURRENT">
                <ng-content></ng-content>
            </div>
            <div *ngSwitchCase="CachedValueState.STALE">
                {{staleMessage}}
            </div>
            <div *ngSwitchCase="CachedValueState.FAILURE">
                {{failureMessage}}
            </div>
            <div *ngSwitchCase="CachedValueState.NOT_FOUND">
                {{notFoundMessage}}
            </div>
        </div>
    `
})
export class CachedValueComponent extends BaseComponent
{
    protected CachedValueState = CachedValueState;

    @Input()
    protected cacheState: CachedValueState;

    @Input()
    protected staleMessage: string = 'Loading...';

    @Input()
    protected failureMessage: string = 'Failure';

    @Input()
    protected notFoundMessage: string = 'Not Found';

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     */
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

}
