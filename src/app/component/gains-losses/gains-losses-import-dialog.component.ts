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
import { Observable } from 'rxjs/Observable';
import { StringDTO } from '../../model/entity/string-d-t-o';

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
     * Error results from the backend import process.
     */
    protected importErrorResults: string;

    /**
     * Success results from the backend import process.
     */
    protected importSuccessResults: string;

    /**
     * Used to control the progress bar which will display while importing.
     * @type {boolean}
     */
    protected importing: boolean = false;

    /**
     * Determines the format of the Excel file being imported.
     * @type {any[]}
     */
    protected importFormats: SelectItem[] = [];

    private readonly IMPORT_FORMAT_TD_AMERITRADE: string = 'TDAmeritrade';
    private readonly IMPORT_FORMAT_SCOTTRADE: string = 'Scottrade';

    /**
     * Contains the selected import format.
     */
    protected importFormat: string = this.IMPORT_FORMAT_TD_AMERITRADE;

    protected linkedAccountId: string;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {FormBuilder} formBuilder
     * @param {AppConfigurationService} appConfig
     * @param {SessionService} session
     * @param {GainsLossesCrudService} gainsLossesService
     * @param {GainsLossesController} gainsLossesController
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
        this.importFormats.push( { label: 'Scottrade', value: this.IMPORT_FORMAT_SCOTTRADE });
    }

    /**
     * This method is called before the upload begins.
     * Need to add the form to the call to the back end.
     * @param event
     */
    protected onBeforeUpload( event )
    {
        this.log( "onBeforeUpload " + JSON.stringify( event ))
        this.importing = true;
        event.formData.append( 'linkedAccountId', this.linkedAccountId );
        if ( this.importFormat === this.IMPORT_FORMAT_TD_AMERITRADE )
        {
            this.setTDAmeritradeConfiguration();
        }
        else if ( this.importFormat === this.IMPORT_FORMAT_SCOTTRADE )
        {
            this.setScottradeConfiguration();
        }
        event.formData.append( 'configuration', JSON.stringify( this.importConfiguration ));
    }

    /**
     * Create the configuration settings for importing Scottrade data.
     */
    private setScottradeConfiguration()
    {
        this.importConfiguration.skipHeaderRows = 6;
        this.importConfiguration.skipFooterRows = 1;
        this.importConfiguration.tickerSymbolEmbeddedWithParens = false;
        this.importConfiguration.tickerSymbolColumn = 1;
        this.importConfiguration.gainsColumn = -1;
        this.importConfiguration.lossColumn = -1;
        this.importConfiguration.gainsLossColumn = 6;
    }

    /**
     * Create the configuration settings to import TDAmeritrade spreadsheets.
     */
    private setTDAmeritradeConfiguration()
    {
        this.importConfiguration.skipHeaderRows = 1;
        this.importConfiguration.skipFooterRows = 1;
        this.importConfiguration.tickerSymbolEmbeddedWithParens = true;
        this.importConfiguration.tickerSymbolColumn = 1;
        this.importConfiguration.gainsColumn = -1;
        this.importConfiguration.lossColumn = -1;
        this.importConfiguration.gainsLossColumn = 8;
    }

    /**
     * This method is called for exceptions encountered during the import process.
     * @param event
     */
    protected onError( event )
    {
        const methodName = 'onError';
        this.logError( JSON.stringify( event ) );
        this.importing = false;
        //this.showError( JSON.stringify( event ) );
        this.gainsLossesService
            .getImportResults()
            .subscribe( (results: StringDTO) =>
                        {
                            this.log( methodName + ' ' + results.value );
                            this.importErrorResults = results.value;
                        } );
    }

    protected onSelect( event )
    {
        this.log( "onSelect " + JSON.stringify( event ))
    }

    protected onProgress( event )
    {
        this.log( "onProgress " + JSON.stringify( event ))
    }

    /**
     * This method is called when the import has completed.
     * @param event
     */
    protected onUpload( event )
    {
        const methodName = 'onUpload';
        this.log( methodName + ' ' + JSON.stringify( event ) );
        this.importing = false;
        this.gainsLossesService
            .getImportResults()
            .catch( error =>
                    {
                        this.log( methodName + ' catching error: ' + error );
                        this.importSuccessResults = error;
                        return Observable.of( error );
                    })
            .subscribe( (results: StringDTO) =>
                        {
                            this.log( methodName + ' ' + results.value );
                            this.importSuccessResults = results.value;
                        } );
    }

    /**
     * This method is called when the ok button is clicked. The dialog will be closed and the table will be refreshed.
     */
    protected onOkButtonClick()
    {
        this.displayDialog = false;
        this.gainsLossesController
            .sendRefreshButtonClickedEvent();
    }
}
