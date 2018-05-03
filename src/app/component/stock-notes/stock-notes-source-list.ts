import { StockNotesSource } from "../../model/entity/stock-notes-source";
import { SelectItem } from "primeng/primeng";
import { BaseClass } from "../../common/base-class";
import { isNullOrUndefined } from "util";
import { ToastsManager } from "ng2-toastr";

export class StockNotesSourceList extends BaseClass
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {StockNotesSource[]} stockNotesSources
     */
    constructor( private stockNotesSources: StockNotesSource[] )

    {
        super();
    }

    /**
     * This method is called after the customer's sources have been loaded from the database.  The StockNoteSource instances
     * are converted to SelectItem instances so that they can appear in the dropdown listbox.
     *
     * @param {StockNotesSource[]} stockNotesSources
     */
    public toSelectItems(): SelectItem[]
    {
        this.debug( "toSelectItems.begin: " + JSON.stringify( this.stockNotesSources ));
        var selectItems: SelectItem[] = [];
        this.stockNotesSources
            .forEach( stockNotesSource =>
            {
                selectItems.push( {label: stockNotesSource.name, value: stockNotesSource.id } );
            });
        this.debug( "toSelectItems.end: " + JSON.stringify( selectItems ));
        return selectItems;
    }

    /**
     * Gets the label for the {@code id}
     * @param {number} id
     * @returns {string}
     */
    public getLabel( id: string ): string
    {
        let filteredSources: StockNotesSource[] = this.stockNotesSources.filter( stockNotesSource => stockNotesSource.id === id );
        if ( filteredSources.length == 0 )
        {
            return "";
        }
        return filteredSources[0].name;
    }

    /**
     * Determines if the {@code sourceName} is in the source list.
     * @param {string} sourceName
     * @returns {boolean}
     */
    public contains( sourceName: string ): boolean
    {
        //let filteredSources: StockNotesSource[] = this.stockNotesSources.filter( stockNotesSource => stockNotesSource.name === sourceName );
        return !isNullOrUndefined( this.stockNotesSources[sourceName] );
    }
}
