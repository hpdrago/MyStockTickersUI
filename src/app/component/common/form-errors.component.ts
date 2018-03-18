/**
 * Created by mike on 11/24/2017
 */

import { Component, Input } from "@angular/core";
import { BaseComponent } from "./base.component";
import { ToastsManager } from "ng2-toastr";
import { CrudController } from '../crud/common/crud-controller';

/**
 * This is a generic component to display form errors in an ordered list.
 */
@Component(
    {
        selector: 'form-errors',
        template: `
                    <div *ngIf="errors.length > 0 ">
                       <ol>
                           <li *ngFor="let error of errors">
                               {{ error }}
                           </li>
                       </ol>    
                    </div>
                  `
    })
export class FormErrorsComponent extends BaseComponent
{
    @Input()
    protected crudController: CrudController<any>;

    protected errors: string[];

    constructor( protected toaster: ToastsManager )
    {
        super( toaster );
    }

    public ngOnInit()
    {
        this.crudController.subscribeFormErrorsEvent( ( errors ) => this.onErrors( errors ) );
        this.errors = [];
    }

    private onErrors( errors: string[] )
    {
        this.debug( "onErrors " + JSON.stringify( errors ));
        this.errors = errors;
    }
}
