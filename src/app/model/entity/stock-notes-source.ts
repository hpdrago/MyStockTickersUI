import { ModelObject } from "./modelobject";

/**
 * A stock note source defines a single source that the customer has identified.
 * Stock note sources are owned by the customer and the customer can add, remove, and change
 * their sources.  This is their way of categorizing the source of each stock note.
 */
export class StockNotesSource extends ModelObject<StockNotesSource>
{
    private _id: number;
    private _customerId: number;
    private _name: string;
    private _dateCreated: Date;

    set id( id: number ) { this._id = id }
    get id(): number { return this._id }
    set customerId( customerId: number ) { this._customerId = customerId }
    get customerId(): number { return this._customerId }
    set name( name: string ) { this._name = name }
    get name(): string { return this._name }
    set dateCreated( dateCreated: Date ) { this._dateCreated = dateCreated }
    get dateCreated(): Date { return this._dateCreated }

    public getPrimaryKey(): any
    {
        return this.id;
    }
}
