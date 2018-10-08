import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { WatchList } from "../../model/entity/watch-list";
import { SessionService } from "../../service/session.service";
import { WatchListController } from './watch-list-controller';
import { WatchListStateStore } from './watch-list-state-store.service';
import { WatchListFactory } from '../../model/factory/watch-list.factory';
import { WatchListCrudService } from '../../service/crud/watch-list-crud.service';
import { CrudFormComponent } from '../crud/form/crud-form.component';
import { StockSearchSelectedCompaniesComponent } from '../common/stock-search-selected-companies.component';
import { StockCompany } from '../../model/entity/stock-company';

/**
 * This is the StockCompany ToBuy Form Component class.
 *
 * Created by mike on 10/17/2017.
 */
@Component( {
                selector:    'watch-list-form',
                styleUrls:   ['../crud/form/crud-form.component.css'],
                templateUrl: './watch-list-form.component.html'
            } )
export class WatchListFormComponent extends CrudFormComponent<WatchList>
{
    /**
     * Reference to the stock search
     */
    @ViewChild(StockSearchSelectedCompaniesComponent)
    protected stockSearchSelectedCompaniesComponent: StockSearchSelectedCompaniesComponent;

    /**
     * Constructor.
     * @param {ChangeDetectorRef} changeDetector
     * @param {ToastsManager} toaster
     * @param {SessionService} sessionService
     * @param {FormBuilder} formBuilder
     * @param {WatchListStateStore} watchListStateStore
     * @param {WatchListController} watchListController
     * @param {WatchListFactory} watchListFactory
     * @param {WatchListCrudService} watchListCrudService
     * @param {StockCompanyService} stockCompanyService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
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
     * Creates and identifies the fields for the FormGroup instance for the stock notes form.
     * @return {FormGroup}
     */
    protected createFormGroup(): FormGroup
    {
        this.debug( "initializeForm " );
        var stockNoteForm: FormGroup = this.formBuilder.group(
            {
                'name': new FormControl( this.modelObject.name, Validators.required )
            } );
        return stockNoteForm;
    }

    /**
     * This method is called when the user selects a stock using the stock/company search input
     * @param stock
     */
    public onStockSelected( stockCompany: StockCompany )
    {
        this.log( "onStockSelected: " + JSON.stringify( stockCompany ) );
        this.modelObject
            .addStock( stockCompany );
    }
}
