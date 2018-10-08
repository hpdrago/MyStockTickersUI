import { ChangeDetectorRef, Component } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { CrudFormButtonsComponent } from "../crud/form/crud-form-buttons.component";
import { WatchList } from "../../model/entity/watch-list";
import { WatchListStateStore } from './watch-list-state-store.service';
import { WatchListController } from './watch-list-controller';
import { WatchListFactory } from '../../model/factory/watch-list.factory';
import { WatchListCrudService } from '../../service/crud/watch-list-crud.service';

/**
 * Button panel component for the WatchList dialog.
 *
 * Created by mike on 8/15/2017.
 */
@Component({
    selector:    'watch-list-form-buttons',
    templateUrl: '../crud/form/crud-form-buttons.component.html',
    styleUrls: ['../crud/form/crud-form-buttons.component.css']
})
export class WatchListFormButtonsComponent extends CrudFormButtonsComponent<WatchList>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {WatchListStateStore} watchListStateStore
     * @param {WatchListController} watchListController
     * @param {WatchListFactory} watchListFactory
     * @param {WatchListCrudService} watchListCrudService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 private watchListStateStore: WatchListStateStore,
                 private watchListController: WatchListController,
                 private watchListFactory: WatchListFactory,
                 private watchListCrudService: WatchListCrudService )
    {
        super( changeDetector,
               toaster,
               watchListStateStore,
               watchListController,
               watchListFactory,
               watchListCrudService );
    }

    /**
     * Defines the message to display to the user in the dialog when deleting the model object
     */
    public getDeleteMessage( watchList: WatchList ): string
    {
        return 'Are you sure you want to delete ' + watchList.name + "?";
    }

    /**
     * @return {undefined}
     */
    public getDeleteKeyword(): string
    {
        return 'Watch List'
    }

    /**
     * This method is called to get the message to display to the user that the mdoel object was saved successfully.
     * @param {T} modelObject
     * @returns {string}
     */
    protected getSaveSuccessFulMessage( watchList: WatchList )
    {
        return "Save Successful for " + watchList.name;
    }
}
