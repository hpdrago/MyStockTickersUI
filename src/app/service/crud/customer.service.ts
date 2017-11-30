/**
 * Created by mike on 11/11/2017
 */
import { StockNotesSourceList } from "../../component/stocknotes/stock-notes-source-list";
import { Injectable } from "@angular/core";
import { Customer } from "../../model/entity/customer";
import { SessionService } from "./session.service";
import { CrudRestService } from "./crud-rest.serivce";
import { AppConfigurationService } from "../app-configuration.service";
import { Http } from "@angular/http";
import { CustomerFactory } from "../../model/factory/customer.factory";
import { StockNotesCrudServiceContainer } from "../../component/stocknotes/stock-notes-crud-service-container";
import { SelectItem } from "primeng/primeng";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Subscription } from "rxjs/Subscription";
import { PaginationURL } from "../../common/pagination-url";
import { isNullOrUndefined } from "util";

/**
 * This service handles all of the customer related actions.
 */
@Injectable()
export class CustomerService extends CrudRestService<Customer>
{
    private stockNotesSources: StockNotesSourceList;
    private customer: Customer;
    /**
     * This subject tracks when the sources are being loaded
     * @type {BehaviorSubject<boolean>}
     */
    private sourcesLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject( true );

    constructor( protected http: Http,
                 protected sessionService: SessionService,
                 protected appConfig: AppConfigurationService,
                 private stockNotesCrudServiceContainer: StockNotesCrudServiceContainer,
                 private customerFactory: CustomerFactory )
    {
        super( http, sessionService, appConfig, customerFactory );
    }

    protected getContextURL( modelObject: Customer ): string
    {
        return '/customer';
    }

    protected getCustomerURL()
    {
        return null;
    }

    /**
     * Get the {@code SelectItems} for the customer's sources
     * @return {SelectItem[]}
     */
    public get getSourceSelectItems(): SelectItem[]
    {
        return this.stockNotesSources.toSelectItems();
    }

    public getStockNotesSourceList(): StockNotesSourceList
    {
        return this.stockNotesSources;
    }

    /**
     * Before calling {@code getSourceSelectedItems}, call this method to check to see if they are currently loading.
     * @param {(boolean) => any} fn
     * @return {Subscription}
     */
    public subscribeToSourcesLoading( fn: (boolean) => any ) : Subscription
    {
        if ( isNullOrUndefined( this.stockNotesSources ) )
        {
            this.customer = new Customer();
            this.customer.id = 1;
            this.loadSources();
        }
        return this.sourcesLoadingSubject.asObservable().subscribe( fn );
    }

    /**
     * This method will get the user's note source values from the database
     */
    private loadSources()
    {
        this.log( 'loadSources.begin' );
        this.sourcesLoadingSubject.next( true );
        this.stockNotesCrudServiceContainer
            .stockNoteSourceService
            .getStockNoteSources( this.customer.id )
            .subscribe( ( stockNotesSources: StockNotesSourceList ) =>
                        {
                            this.stockNotesSources = stockNotesSources;
                            this.log( 'loadSources.end ' + JSON.stringify( this.stockNotesSources ) );
                            this.sourcesLoadingSubject.next( false );
                        },
                        error =>
                        {
                            this.log( "ERROR!!! " + error );
                        } );
    }

    /**
     * This method is called by a component that contains customer sources to notify that they values have changed.
     * The sources will be reloaded.
     */
    public stockNoteSourcesChanged(): void
    {
        this.log( "stockNoteSourcesChanged" );
        this.loadSources();
    }

    /**
     * Get the label for the stock note source id.
     * @param {number} notesSourceId
     * @return {string}
     */
    public getStockNotesSourceLabel( notesSourceId: number ): String
    {
        return this.stockNotesSources.getLabel( notesSourceId );
    }

}
