import { Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { GainsLosses } from "../../model/entity/gains-losses";
import { GainsLossesStateStore } from './gains-losses-state-store';
import { GainsLossesController } from './gains-losses-controller';
import { GainsLossesFactory } from '../../model/factory/gains-losses.factory';
import { GainsLossesCrudService } from '../../service/crud/gains-losses-crud.service';

/**
 * Button panel component for the GainsLosses dialog.
 *
 * Created by Mike on 5/29/2018
 */
@Component({
    selector:    'gains-losses-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class GainsLossesFormButtonsComponent extends CrudFormButtonsComponent<GainsLosses>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {GainsLossesStateStore} gainsLossesStateStore
     * @param {GainsLossesController} gainsLossesController
     * @param {GainsLossesFactory} gainsLossesFactory
     * @param {GainsLossesCrudService} gainsLossesCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private gainsLossesStateStore: GainsLossesStateStore,
                 private gainsLossesController: GainsLossesController,
                 private gainsLossesFactory: GainsLossesFactory,
                 private gainsLossesCrudService: GainsLossesCrudService )
    {
        super( toaster,
               gainsLossesStateStore,
               gainsLossesController,
               gainsLossesFactory,
               gainsLossesCrudService );
    }

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage( gainsLosses: GainsLosses ): string
    {
        return 'Are you sure you want to delete ' + gainsLosses.tickerSymbol + "?";
    }

    /**
     * @return {undefined}
     */
    public getDeleteKeyword(): string
    {
        return 'gains/losses'
    }

    /**
     * This method is called to get the message to display to the user that the mdoel object was saved successfully.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getSaveSuccessFulMessage( gainsLosses: GainsLosses )
    {
        return "Save Successful for " + gainsLosses.tickerSymbol;
    }
}
