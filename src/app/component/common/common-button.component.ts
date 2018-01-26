import { EventEmitter, Output } from '@angular/core';

export class CommonButtonComponent
{
    @Output()
    protected buttonClick = new EventEmitter<any>();

    private _showButton: boolean = true;
    private _buttonDisabled: boolean = false;
    private _buttonClass: string;
    private _buttonDivClass: string;
    private _buttonIcon: string;
    private _buttonLabel: string;

    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {CrudStateStore<T extends ModelObject<T>>} crudStateStore
     * @param {CrudController<T extends ModelObject<T>>} crudController
     * @param {ModelObjectFactory<T extends ModelObject<T>>} modelObjectFactory
     * @param {CrudRestService<T extends ModelObject<T>>} crudRestService
     */
    public constructor()
    {
    }

    public ngOnInit(): void
    {
        this.buttonClass = "crud-table-button";
        this.buttonDivClass = "crud-table-button";
    }

    /**
     * This method is called when the Refresh button is clicked.
     * It will notify the button service that the button was clicked.
     */
    protected onButtonClick(): void
    {
        this.buttonClick.emit();
    }

    public get showButton(): boolean
    {
        return this._showButton;
    }

    public set showButton( value: boolean )
    {
        this._showButton = value;
    }

    public get buttonDisabled(): boolean
    {
        return this._buttonDisabled;
    }

    public set buttonDisabled( value: boolean )
    {
        this._buttonDisabled = value;
    }

    public get buttonClass(): string
    {
        return this._buttonClass;
    }

    public set buttonClass( value: string )
    {
        this._buttonClass = value;
    }

    public get buttonIcon(): string
    {
        return this._buttonIcon;
    }

    public set buttonIcon( value: string )
    {
        this._buttonIcon = value;
    }

    public get buttonLabel(): string
    {
        return this._buttonLabel;
    }

    public set buttonLabel( value: string )
    {
        this._buttonLabel = value;
    }

    public get buttonDivClass(): string
    {
        return this._buttonDivClass;
    }

    public set buttonDivClass( value: string )
    {
        this._buttonDivClass = value;
    }
}
