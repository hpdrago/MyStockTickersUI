import { BaseComponent } from "../common/base.component";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TradeItAuthenticateResult } from "../../service/tradeit/apiresults/authenticate-result";
import { TradeItAccount } from "../../model/entity/tradeit-account";
import { SelectItem } from "primeng/primeng";
import { ToastsManager } from "ng2-toastr";
import { TradeItService } from "../../service/tradeit/tradeit.service";

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
    private authenticateResult: TradeItAuthenticateResult;
    private customerAccount: TradeItAccount;
    private showDialog: boolean = false;

    constructor( protected toaster: ToastsManager,
                 private tradeItService: TradeItService )
    {
        super( toaster );
    }

    @Output()
    private securityChallengeAnswer: EventEmitter<string> = new EventEmitter<string>();
    private answer: string;
    private answers: SelectItem[];

    /**
     * Set the TradeIt Authentication result
     * @param {TradeItAuthenticateResult} authenticateResult
     */
    public setAuthenticationResult( authenticateResult: TradeItAuthenticateResult )
    {
        this.authenticateResult = authenticateResult;
        this.log( "setAuthenticationResult " + JSON.stringify( this.authenticateResult ));
        this.answers = [];
        this.answer = "";
        if ( this.authenticateResult.securityOptions )
        {
            this.authenticateResult
                .securityOptions
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
    }

    /**
     * Set the customer account.
     * @param {TradeItAccount} modelObject
     */
    public setCustomerAccount( customerAccount: TradeItAccount )
    {
        this.log( "setCustomerAccount: " + JSON.stringify( this.customerAccount ));
        this.customerAccount = customerAccount;
    }

    protected onOkButtonClick(): void
    {
        let methodName = "onButtonClick";
        this.log( methodName );
        this.tradeItService
            .answerSecurityQuestion( this.customerAccount.id, this.answer )
            .subscribe( authenticateResult =>
            {
                this.answer = "";
                this.log( methodName + " " + JSON.stringify( this.authenticateResult ) );
                if ( authenticateResult.isInformationNeeded() )
                {
                    this.authenticateResult = this.authenticateResult;
                }
                else
                {
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

}
