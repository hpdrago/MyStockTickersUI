import { ModelObject } from "./modelobject";

/**
 * A stock note source defines a single source that the customer has identified.
 * Stock note sources are owned by the customer and the customer can add, remove, and change
 * their sources.  This is their way of categorizing the source of each stock note.
 */
export class StockNotesSource extends ModelObject<StockNotesSource>
{
    private _id: string;
    private _customerId: string;
    private _name: string;
    private _dateCreated: Date;

    set id( id: string ) { this._id = id }
    get id(): string { return this._id }
    set customerId( customerId: string ) { this._customerId = customerId }
    get customerId(): string { return this._customerId }
    set name( name: string ) { this._name = name }
    get name(): string { return this._name }
    set dateCreated( dateCreated: Date ) { this._dateCreated = dateCreated }
    get dateCreated(): Date { return this._dateCreated }

    public getPrimaryKeyValue(): any
    {
        return this.id;
    }

    public getPrimaryKeyName(): string
    {
        return "id";
    }
}
