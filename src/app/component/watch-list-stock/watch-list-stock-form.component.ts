import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ChangeDetectorRef, Component, ViewChild } from "@angular/core";
import { ToastsManager } from "ng2-toastr";
import { SessionService } from "../../service/session.service";
import { CrudFormComponent } from '../crud/form/crud-form.component';
import { StockSearchSelectedCompaniesComponent } from '../common/stock-search-selected-companies.component';
import { StockCompany } from '../../model/entity/stock-company';
import { WatchListStockCrudService } from '../../service/crud/watch-list-stock-crud.service';
import { WatchListStockFactory } from '../../model/factory/watch-list-stock.factory';
import { WatchListStockController } from './watch-list-stock-controller';
import { WatchListStockStateStore } from './watch-list-stock-state-store.service';
import { WatchListStock } from '../../model/entity/watch-list-stock';

/**
 * This is the StockCompany ToBuy Form Component class.
 *
 * Created by mike on 10/17/2017.
 */
@Component
({
    selector:    'watch-list-stock-form',
    styleUrls:   ['../crud/form/crud-form.component.css'],
    templateUrl: './watch-list-stock-form.component.html'
} )
export class WatchListStockFormComponent extends CrudFormComponent<WatchListStock>
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
     * @param {WatchListStateStore} watchListStockStateStore
     * @param {WatchListStockController} watchListStockController
     * @param {WatchListFactory} watchListStockFactory
     * @param {WatchListCrudService} watchListStockCrudService
     * @param {StockCompanyService} stockCompanyService
     */
    constructor( protected changeDetector: ChangeDetectorRef,
                 protected toaster: ToastsManager,
                 protected sessionService: SessionService,
                 private formBuilder: FormBuilder,
                 private watchListStockStateStore: WatchListStockStateStore,
                 private watchListStockController: WatchListStockController,
                 private watchListStockFactory: WatchListStockFactory,
                 private watchListStockCrudService: WatchListStockCrudService )
    {
        super( changeDetector,
               toaster,
               watchListStockStateStore,
               watchListStockController,
               watchListStockFactory,
               watchListStockCrudService );
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
                'tickerSymbol': new FormControl( this.modelObject.tickerSymbol, Validators.required ),
                'notes': new FormControl( this.modelObject.notes ),
                'shares': new FormControl( this.modelObject.shares ),
                'costBasis': new FormControl( this.modelObject.costBasis )
            } );
        return stockNoteForm;
    }

    protected onStockSelected( stockCompany: StockCompany )
    {
        this.modelObject.tickerSymbol = stockCompany.tickerSymbol;
    }

}
