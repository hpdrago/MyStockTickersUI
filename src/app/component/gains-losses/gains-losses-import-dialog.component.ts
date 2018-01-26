import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from '../common/base.component';
import { ToastsManager } from 'ng2-toastr';
import { AppConfigurationService } from '../../service/app-configuration.service';
import { GainsLossesController } from './gains-losses-controller';
import { SessionService } from '../../service/session.service';
import { SelectItem } from 'primeng/api';
import { FormBuilder } from '@angular/forms';
import { GainsLossesCrudService } from '../../service/crud/gains-losses-crud.service';
import { ImportConfiguration } from './import-configuration';

@Component
({
    selector: 'gains-losses-import-dialog',
    templateUrl: './gains-losses-import-dialog.component.html',
    styleUrls: ['./gains-losses-import-dialog.component.css'],
    encapsulation: ViewEncapsulation.None
 })
export class GainsLossesImportDialogComponent extends BaseComponent implements OnInit
{
    //protected formGroup: FormGroup;
    protected importConfiguration: ImportConfiguration = new ImportConfiguration();

    /**
     * Controlls the display/hiding of the dialog
     */
    protected displayDialog: boolean;

    /**
     * Determines the format of the Excel file being imported.
     * @type {any[]}
     */
    protected importFormats: SelectItem[] = [];

    /**
     * Contains the selected import format.
     */
    protected importFormat: string;

    /**
     * Constructor
     * @param {ToastsManager} toaster
     */
    public constructor( protected toaster: ToastsManager,
                        private formBuilder: FormBuilder,
                        protected appConfig: AppConfigurationService,
                        protected session: SessionService,
                        protected gainsLossesService: GainsLossesCrudService,
                        private gainsLossesController: GainsLossesController )
    {
        super( toaster );
        this.debug( "BaseComponent.constructor" );
    }

    private readonly IMPORT_FORMAT_TD_AMERITRADE: string = 'TDAmeritrade';

    /**
     * Initialize the component.
     */
    public ngOnInit(): void
    {
        this.gainsLossesController
            .subscribeToImportButtonClickedEvent( () => this.onDisplay() );
        //this.importModes.push( { label: 'Add to current gains/losses', value: this.IMPORT_MODE_CUMULATIVE } );
        //this.importModes.push( { label: 'Replace existing gains/losses', value: this.IMPORT_MODE_REPLACE } );
        /*
        this.formGroup = this.formBuilder.group(
        {
            'clearEntries': new FormControl( 'false' ),
            'importFormat': new FormControl( this.importFormat )
        });
        */
        //this.formGroup.controls['importFormat'].setValue( this.IMPORT_FORMAT_TD_AMERITRADE );
    }

    private onDisplay(): void
    {
        this.displayDialog = true;
        this.importFormats.push( { label: 'TD Ameritrade', value: this.IMPORT_FORMAT_TD_AMERITRADE });
        this.importFormat = this.IMPORT_FORMAT_TD_AMERITRADE;
    }

    /**
     * Need to add the form to the call to the back end.
     * @param event
     */
    protected onBeforeUpload( event )
    {
        this.log( "onBeforeUpload " + JSON.stringify( event ))
        //event.formData.append( 'customerId', this.session.getLoggedInUserId() );
        if ( this.importFormat === this.IMPORT_FORMAT_TD_AMERITRADE )
        {
            this.importConfiguration.skipFirstRow = true;
            this.importConfiguration.skipLastRow = true;
            this.importConfiguration.tickerSymbolEmbeddedWithParens = true;
            this.importConfiguration.tickerSymbolColumn = 1;
            this.importConfiguration.gainsColumn = -1;
            this.importConfiguration.lossColumn = -1;
            this.importConfiguration.gainsLossColumn = 8;
        }
        event.formData.append( 'configuration', JSON.stringify( this.importConfiguration ));
    }

    protected onError( event )
    {
        this.logError( JSON.stringify( event ) );
        this.showError( JSON.stringify( event ) );
    }

    protected onSelect( event )
    {
        this.log( "onSelect " + JSON.stringify( event ))
    }

    protected onProgress( event )
    {
        this.log( "onProgress " + JSON.stringify( event ))
    }

    protected onUpload( event )
    {
        const methodName = 'onUpload';
        this.log( methodName + ' ' + JSON.stringify( event ) );
        event.files.forEach( file => JSON.stringify( "file: " + file ));
        /*
        this.uploadFileService
            .getLastCustomerFile()
            .subscribe( (blob: Blob) =>
                        {
                            this.log( methodName + ' converting blob to excel file' );
                            let fileReader: FileReader = new FileReader();
                            fileReader.addEventListener( "loadend", function()
                            {
                                let data = new Uint8Array( fileReader.result );
                                let workbook: WorkBook = XLSX.read( data, {type: 'array' } );
                                console.log( methodName + ' loaded excel file' );
                                console.log( methodName + ' sheetNames: ' + workbook.SheetNames );
                                console.log( methodName + ' firstSheet: ' + workbook.SheetNames[0] );
                                //console.log( methodName + ' converting excel file to json' );
                                let json = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]] );
                                //console.log( methodName + ' ' + JSON.stringify( json ));

                            });
                            fileReader.readAsArrayBuffer( blob );
                        })
                        */
    }
}
