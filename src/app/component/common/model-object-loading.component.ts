/**
 * Created by mike on 3/4/2018
 */
import { Component, Input } from '@angular/core';
import { ModelObject } from '../../model/entity/modelobject';

/**
 * This component will displays {@code loadingMessage} if the model object is currently loading, otherwise it will
 * display the content contained with the selector.
 */
@Component(
{
    selector: 'loading',
    template: `<div *ngIf="modelObject.loadingStatus === 'LOADING'; else notLoadingBlock">{{loadingMessage}}
               </div>
               <ng-template #notLoadingBlock>
                   <ng-content></ng-content>
               </ng-template>
              `
})
export class ModelObjectLoadingComponent
{
    @Input()
    private modelObject: ModelObject<any>;

    @Input()
    private loadingMessage: string = 'Loading...';

}
