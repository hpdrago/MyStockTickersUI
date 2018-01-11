import { BaseComponent } from "../common/base.component";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TradeItAuthenticateResult } from "../../service/tradeit/apiresults/authenticate-result";
import { CustomerAccount } from "../../model/entity/customer-account";
import { SelectItem } from "primeng/primeng";
import { ToastsManager } from "ng2-toastr";

@Component( {
              selector: "tradeit-security-question-dialog",
              templateUrl: "tradeit-security-question-dialog.component.html"
          })
export class TradeItSecurityQuestionDialogComponent extends BaseComponent implements OnInit
{
    private authenticateResult: TradeItAuthenticateResult;
    private customerAccount: CustomerAccount;
    private showDialog: boolean = false;

    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    @Output()
    private securityChallengeAnswer: EventEmitter<string> = new EventEmitter<string>();

    private answer: string;
    private answers: SelectItem[];

    public ngOnInit(): void
    {
        this.answers = [];
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
    }

    /**
     * Set the TradeIt Authentication result
     * @param {TradeItAuthenticateResult} authenticateResult
     */
    public setAuthenticationResult( authenticateResult: TradeItAuthenticateResult )
    {
        this.authenticateResult = authenticateResult;
        this.log( "setAuthenticationResult " + JSON.stringify( this.authenticateResult ));
        this.authenticateResult = this.authenticateResult;
        if ( this.authenticateResult.isInformationNeeded() )
        {
            this.showDialog = true;
        }
    }

    /**
     * Set the customer account.
     * @param {CustomerAccount} modelObject
     */
    public setCustomerAccount( customerAccount: CustomerAccount )
    {
        this.log( "setCustomerAccount: " + JSON.stringify( this.customerAccount ));
        this.customerAccount = customerAccount;
    }
}
