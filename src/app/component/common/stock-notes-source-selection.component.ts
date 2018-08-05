import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { CustomerCrudService } from '../../service/crud/customer-crud.service';
import { StockNotesSourceContainer } from '../../model/common/stock-notes-source-container';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from 'util';

/**
 * Drop down list box component for stock notes sources.
 */
@Component(
{
    selector: 'stock-notes-source',
    template: `<p-dropdown id="notesSource"
                           class="crud-form"
                           [options]="sourceItems"
                           (onChange)="sourcesOnChange($event)"
                           [(ngModel)]="notesSourceId"
                           [style]="{'width':'225px'}"
                           maxlength="20"
                           uppercase
                           editable="true"
                           [disabled]="disabled"
                           placeholder="Select a source">
               </p-dropdown>`,
    providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => StockNotesSourceSelectionComponent ),
                    multi: true
                }]
})
export class StockNotesSourceSelectionComponent extends BaseComponent implements OnInit, ControlValueAccessor
{
    /**
     * The model object container of the source values.
     */
    @Input()
    protected modelObject: StockNotesSourceContainer;

    /**
     * Event when the source is selected.  Allows parent components get the value and the id for the source
     * from the SelectItem.
     * @type {EventEmitter<SelectItem>}
     */
    @Output()
    protected sourceSelectionEvent: EventEmitter<SelectItem> = new EventEmitter<SelectItem>();

    protected sourceItems: SelectItem[] = [];
    protected notesSourceId: string;
    private sourceAdded: boolean;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CustomerCrudService} customerCrudService
     */
    constructor( protected toaster: ToastsManager,
                 private customerCrudService: CustomerCrudService )
    {
        super( toaster );
    }

    /**
     * Initialization.
     */
    public ngOnInit(): void
    {
        this.customerCrudService
            .loadSources()
            .subscribe( sourceItems =>
                        {
                            this.sourceItems = sourceItems;
                            this.debug( "loadResources source items set " + JSON.stringify( this.sourceItems ) );
                            /*
                             * force a change of source id if one is set.  It was probably set before loadingData of
                             * the source items so we need to make it look like it is an new modelObjectRows.
                             */
                            if ( !isNullOrUndefined( this.notesSourceId ))
                            {
                                let saveSourceId = this.notesSourceId;
                                this.notesSourceId = null;
                                this.tickThenRun( () => this.notesSourceId = saveSourceId );
                            }
                        });
    }

    /**
     * This method is called whenever the notes source changes.  When the user types in a new source, each keystroke
     * will cause a call to this method.  Since we get the source id from the drop down list as the modelObjectRows, we need to
     * capture the name of any new source that the user types in so we assign that modelObjectRows here to the stockPriceQuoteContainer.
     *
     * @param event
     */
    private sourcesOnChange( event )
    {
        this.debug( "sourcesOnChange: " + JSON.stringify( event ));
        /*
         * Capture the new values that the user types and put in the source name
         */
        if ( this.containsSourceId( event.value ))
        {
            this.debug( "sourcesOnChange: setting notesSourceId= " + event.value );
            this.notesSourceId = event.value;
        }
        else
        {
            this.debug( "sourcesOnChange: new notesSource= " + event.value );
            this.notesSourceId = event.value.toUpperCase();
            this.sourceAdded = true;
            let selectItem: SelectItem = {
                                           label: this.notesSourceId,
                                           value: ''
                                         };
            this.sourceItems.push( selectItem );
        }
        this.sourceSelectionEvent
            .emit( event );
        this.propagateChange( this.notesSourceId );
    }

    /**
     * Determines if the source id is in the current list of select items.
     * @param {string} sourceId
     * @return {boolean}
     */
    public containsSourceId( sourceId: string ): boolean
    {
        return this.sourceItems.filter( sourceItem => sourceItem.value === sourceId ).length > 0;
    }

    public writeValue( notesSourceId: string ): void
    {
        this.debug( "writeValue " + notesSourceId )
        this.notesSourceId = notesSourceId;
    }

    /**
     * This is a placeholder function that is replace with a new function in registerOnChange
     * @param _
     */
    private propagateChange = ( _: any) => {};

    public registerOnChange( fn: any ): void
    {
        this.propagateChange = fn;
    }

    public registerOnTouched( fn: any ): void {}

    /**
     * {@code ControlValueAccess}
     * @param {boolean} isDisabled
     */
    public setDisabledState( isDisabled: boolean ): void
    {
        super.setDisabled( isDisabled );
    }

}
