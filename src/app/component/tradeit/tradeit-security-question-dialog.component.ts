import { BaseComponent } from "../common/base.component";
import { Component, EventEmitter, Output } from "@angular/core";
import { TradeItAuthenticateResult } from "../../service/tradeit/apiresults/tradeit-authenticate-result";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { SelectItem } from "primeng/primeng";
import { ToastsManager } from "ng2-toastr";
import { TradeItService } from "../../service/tradeit/tradeit.service";
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

/**
 * This class defines the dialog that prompts the user for an answer to a security question as received from the
 * TradeIt Authentication call.
 */
@Component( {
              selector: "tradeit-security-question-dialog",
              styleUrls: ['../crud/form/crud-form-buttons.component.css'],
              templateUrl: "tradeit-security-question-dialog.component.html"
          })
export class TradeItSecurityQuestionDialogComponent extends BaseComponent
{
    private authenticateResultSubject: Subject<TradeItAuthenticateResult>;
    protected authenticateResult: TradeItAuthenticateResult;
    protected tradeItAccount: TradeItAccount;
    protected showDialog: boolean = false;
    protected answer: string = "";
    protected answers: SelectItem[];

    constructor( protected toaster: ToastsManager,
                 private tradeItService: TradeItService )
    {
        super( toaster );
    }

    @Output()
    private securityChallengeAnswer: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Prompts the user with the security questions defined in {@code authenicateResult}.
     * @param {TradeItAccount} tradeItAccount
     * @param {TradeItAuthenticateResult} authenticateResult
     * @return {Observable<TradeItAuthenticateResult>}
     */
    public askSecurityQuestions( tradeItAccount: TradeItAccount,
                                 authenticateResult: TradeItAuthenticateResult ): Observable<TradeItAuthenticateResult>
    {
        this.tradeItAccount = tradeItAccount;
        this.authenticateResult = authenticateResult;
        this.log( "setAuthenticationResult " + JSON.stringify( this.authenticateResult ));
        this.log( "setAuthenticationResult " + JSON.stringify( this.authenticateResult ));
        this.authenticateResultSubject = new Subject<TradeItAuthenticateResult>();
        this.answers = [];
        this.answer = "";
        if ( this.authenticateResult.securityQuestionOptions )
        {
            this.authenticateResult
                .securityQuestionOptions
                .forEach( option => this.answers.push(
                    {
                        label: option,
                        value: option
                    } ));
        }
        if ( this.authenticateResult.isInformationNeeded() )
        {
            this.showDialog = true;
        }
        return this.authenticateResultSubject.asObservable();
    }

    /**
     * This method is called when the user has answered the security question and clicked ok.
     */
    protected onOkButtonClick(): void
    {
        const methodName = "onButtonClick";
        this.log( methodName );
        this.tradeItService
            .answerSecurityQuestion( this.tradeItAccount.id, this.answer )
            .subscribe( authenticateResult =>
            {
                this.answer = "";
                this.log( methodName + " " + JSON.stringify( authenticateResult ) );
                this.authenticateResult = authenticateResult;
                if ( authenticateResult.isInformationNeeded() )
                {
                    this.debug( methodName + "Information is still needed" );
                }
                else
                {
                    this.debug( methodName + "Authentication completed" );
                    this.authenticateResultSubject.next( this.authenticateResult );
                    this.authenticateResultSubject.complete();
                    this.showDialog = false;
                }
            },
            error =>
            {
                this.showError( error );
            });
        //this.securityChallengeAnswer.emit( this.answer );
    }

    protected onCancelButtonClick(): void
    {
        this.showDialog = false;
        this.log( "onCancelButtonClick" );
    }

    /**
     * Identifies if the user should reply to a single question or select from a list of options.
     * @return {boolean}
     */
    protected isSingleChoice(): boolean
    {
        return this.authenticateResult.securityQuestionOptions == null ||
               this.authenticateResult.securityQuestionOptions.length == 0;
    }
}
