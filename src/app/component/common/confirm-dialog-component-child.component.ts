import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from './base.component';
import { ToastsManager } from 'ng2-toastr';

@Component
({
    selector: 'confirm-dialog',
    template: `
            <p-dialog header="{{header}}"
                      [modal]="true"
                      [closable]="false"
                      [closeOnEscape]="false"
                      [responsive]="true"
                      [width]="width"
                      [minWidth]="width"
                      [height]="height"
                      [resizable]="false"
                      [contentStyle]="{'overflow':'visible'}"
                      [(visible)]="displayDialog">
                <div>
                    {{message}}
                </div>
                <p-footer>
                    <div class="crud-form ui-grid-row" style="text-align: center">
                        <div class="ui-grid-col-6">
                            <button class="crud-form-button"
                                    pButton
                                    type="button"
                                    (click)="onOkButtonClick()"
                                    label=" Ok"
                                    style="min-width: 100px"
                                    icon="fa fa-check">
                            </button>
                        </div>
                        <div class="ui-grid-col-6">
                            <button class="crud-form-button"
                                    pButton
                                    type="button"
                                    (click)="onCancelButtonClick()"
                                    label=" Cancel"
                                    style="min-width: 100px"
                                    icon="fa fa-close">
                            </button>
                        </div>
                    </div>
                </p-footer>
            </p-dialog>
    `
 })
export class ConfirmDialogComponent extends BaseComponent
{
    protected displayDialog: boolean = false;

    @Input()
    protected width: number = 500;

    @Input()
    protected height: number = 80;

    @Input()
    protected header: string = "Confirmation Required";

    @Input()
    protected message: string;

    @Output()
    protected onCancel: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    protected onOk: EventEmitter<any> = new EventEmitter<any>();

    private confirmSubject: Subject<boolean> = new Subject<boolean>();

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     */
    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    /**
     * This method is called when the ok button is clicked.
     */
    protected onOkButtonClick()
    {
        this.displayDialog = false;
        this.onOk.emit();
        if ( !isNullOrUndefined( this.confirmSubject ))
        {
            this.confirmSubject
                .next( true );
            this.confirmSubject
                .complete();
        }
    }

    /**
     * This method is called when the cancel button is clicked.
     */
    protected onCancelButtonClick()
    {
        this.displayDialog = false;
        this.onCancel.emit();
        if ( !isNullOrUndefined( this.confirmSubject ))
        {
            this.confirmSubject
                .next( false )
            this.confirmSubject
                .complete();
        }
    }

    /**
     * Set the message to display to the user.
     * @param {string} message
     */
    public setMessage( message: string )
    {
        this.message = message;
    }

    /**
     * Display the dialog
     * @param {boolean} displayDialog
     * @return {Observable<boolean>}
     */
    public setDisplayDialog( displayDialog: boolean ): Observable<boolean>
    {
        this.confirmSubject = new Subject<boolean>();
        this.confirmSubject.asObservable();
        this.tickThenRun( () => { this.displayDialog = displayDialog } );
        return this.confirmSubject;
    }
}
