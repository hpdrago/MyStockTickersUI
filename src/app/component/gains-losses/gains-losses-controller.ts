/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { Injectable } from '@angular/core';
import { GainsLossesStateStore } from './gains-losses-state-store';
import { GainsLossesCrudActionHandler } from './gains-losses-action-handler';
import { GainsLosses } from '../../model/entity/gains-losses';
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

/**
 * Crud controller for StockCompany To Buy entity components.
 *
 * Created by Mike on 5/29/2018
 */
@Injectable()
export class GainsLossesController extends CrudController<GainsLosses>
{
    private tableImportButtonClickedSubject: Subject<void> = new Subject<void>();

    /**
     * Constructor.
     * @param {GainsLossesStateStore} gainsLossesStateStore
     * @param {GainsLossesFactory} gainsLossesFactory
     * @param {GainsLossesCrudActionHandler} gainsLossesActionHandler
     */
    constructor( gainsLossesStateStore: GainsLossesStateStore,
                 gainsLossesFactory: GainsLossesFactory,
                 gainsLossesActionHandler: GainsLossesCrudActionHandler )
    {
        super( gainsLossesStateStore,
               gainsLossesFactory,
               gainsLossesActionHandler );
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the Import
     * button is clicked on the panel.
     */
    public subscribeToImportButtonClickedEvent( fn: () => any ): Subscription
    {
        this.debug( 'subscribeToImportButtonClickedEvent' );
        return this.tableImportButtonClickedSubject
                   .asObservable()
                   .subscribe( fn );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the Import button.
     */
    public sendImportButtonClickedEvent()
    {
        this.debug( 'sendImportButtonClickedEvent' + this.getToObserversMessage( this.tableImportButtonClickedSubject ));
        this.tableImportButtonClickedSubject
            .next();
    }

}
