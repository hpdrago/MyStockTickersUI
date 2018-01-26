import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';
import { CustomerCrudService } from '../../service/crud/customer-crud.service';
import { StockNotesSourceContainer } from '../../model/common/stock-notes-source-container';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
                           [style]="{'width':'225px'}"
                           maxlength="20"
                           uppercase
                           editable="true"
                           [disabled]="disabled"
                           placeholder="Select a source">
               </p-dropdown>`,
    providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => StockNotesSourceComponent ),
                    multi: true
                }]
})
export class StockNotesSourceComponent extends BaseComponent implements OnInit, ControlValueAccessor
{
    @Input()
    protected modelObject: StockNotesSourceContainer;
    @Input()
    protected formControlName: string;
    protected disabled: boolean;
    protected sourceItems: SelectItem[] = [];
    protected notesSourceId: string;
    //private stockNotesSourceList: StockNotesSourceList = new StockNotesSourceList( [] );
    private sourceAdded: boolean;

    constructor( protected toaster: ToastsManager,
                 private customerCrudService: CustomerCrudService )
    {
        super( toaster );
    }

    public ngOnInit(): void
    {
        this.customerCrudService
            .loadSources()
            .subscribe( sourceItems =>
                        {
                            this.sourceItems = sourceItems;
                            this.debug( "loadResources source items set " + JSON.stringify( this.sourceItems ) );
                        });
    }

    /**
     * This method is called whenever the notes source changes.  When the user types in a new source, each keystroke
     * will cause a call to this method.  Since we get the source id from the drop down list as the value, we need to
     * capture the name of any new source that the user types in so we assign that value here to the modelObject.
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
            //this.modelObject.setNotesSourceId( event.value );
            //this.modelObject.setNotesSourceName( this.stockNotesSourceList.getLabel( event.value ));
        }
        else
        {
            this.debug( "sourcesOnChange: new notesSource= " + event.value );
            //this.modelObject.setNotesSourceName( event.value.toUpperCase() );
            //this.modelObject.setNotesSourceId( '' );
            this.notesSourceId = event.value.toUpperCase();
            this.sourceAdded = true;
            let selectItem: SelectItem = {
                                           label: this.notesSourceId,
                                           value: ''
                                         };
            this.sourceItems.push( selectItem );
        }
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

    /**
     * This method is called by the parent component when that component is being saved.
     */
    /*
    public save(): void
    {
        this.debug( "save");
        if ( this.sourceAdded )
        {
            this.customerCrudService
                .
        }
    }
    */

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

    public setDisabledState( isDisabled: boolean ): void
    {
        this.disabled = isDisabled;
    }
}
