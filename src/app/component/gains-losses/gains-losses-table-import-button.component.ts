import { GainsLosses } from '../../model/entity/gains-losses';
import { ChangeDetectorRef, Component } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { ToastsManager } from 'ng2-toastr';
import { GainsLossesStateStore } from './gains-losses-state-store';
import { GainsLossesController } from './gains-losses-controller';
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { GainsLossesCrudService } from '../../service/crud/gains-losses-crud.service';
import { CrudTableButtonComponent } from '../crud/table/crud-table-button.component';

@Component
({
     selector: 'gains-losses-table-import-button',
     templateUrl: '../crud/table/crud-table-button.component.html'
 })
export class GainsLossesTableImportButtonComponent extends CrudTableButtonComponent<GainsLosses>
{
    /**
     * Constructor.
     * @param {SessionService} session
     * @param {GainsLossesStateStore} gainsLossesStateStore
     * @param {GainsLossesController} gainsLossesController
     * @param {GainsLossesFactory} gainsLossesFactory
     * @param {GainsLossesCrudService} gainsLossesCrudService
     * @param {ToastsManager} toaster
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected session: SessionService,
                 protected toaster: ToastsManager,
                 protected gainsLossesStateStore: GainsLossesStateStore,
                 protected gainsLossesController: GainsLossesController,
                 protected gainsLossesFactory: GainsLossesFactory,
                 protected gainsLossesCrudService: GainsLossesCrudService )
    {
        super( changeDetector,
               toaster,
               gainsLossesStateStore,
               gainsLossesController,
               gainsLossesFactory,
               gainsLossesCrudService );
    }

    public ngOnInit(): void
    {
        super.ngOnInit();
        this.buttonLabel = 'Import';
        this.buttonIcon = 'fa-file-excel-o';
    }

    protected onButtonClick(): void
    {
        const methodName = 'onButtonClick';
        this.log( methodName );
        this.gainsLossesController
            .sendImportButtonClickedEvent();
    }

}
