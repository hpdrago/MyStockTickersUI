/**
 * Created by mike on 3/4/2018
 */
import { Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ModelObject } from '../../model/entity/modelobject';

/**
 *
 */
@Component(
{
    selector: 'loading',
    template: `<div *ngIf="modelObject.loadingStatus === 'LOADING'; else notLoadingBlock">{{loadingMessage}}</div>
               <ng-template #notLoadingBlock> 
                   <ng-content></ng-content>
               </ng-template>
              `
})
export class LoadingComponent
{
    @Input()
    private modelObject: ModelObject<any>;

    @Input()
    private loadingMessage: string = 'Loading...';

    @ViewChild()
    private notLoadingBlock: TemplateRef<any>;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef)
    {
    }

}
