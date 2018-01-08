import { SelectItem } from "primeng/components/common/api";
import { ModelObject } from "./modelobject";

/**
 * Internal interface definition that defines the structure of the data
 */
interface Sector
{
    sectorId: string;
    sectorName: string;
    subSectors: Array<Sector>;
}

/**
 * This class is a hierarchy sectors and sub sectors from the stock_sector table
 * Created by mike on 11/19/2016.
 */
export class StockSectorList extends ModelObject<StockSectorList>
{
    getPrimaryKeyName(): string
    {
        return undefined;
    }
    private sectors: Array<Sector>;

    /**
     * Load the sector and sub sector data from the JSON object returned by the REST method
     * @param sectorObject
     */
    public load( sectorObject  ): void
    {
        /*
         * Extract the stockSectors object from the array as it is the hierarchical data
         */
        this.sectors = sectorObject['stockSectors'];
    }

    /**
     * Get a list of SelectItems that can be used in a dropdown list
     */
    public getSectorSelectItems(): Array<SelectItem>
    {
        return this.toSelectItems( this.sectors );
    }

    /**
     * Gets the sub sectors for a sector
     * @param sectorName The name of the sector
     * @returns null if there are no sub sectors otherwise a list of SelectItems
     */
    public getSubSectors( sectorName: string ): Array<SelectItem>
    {
        for ( let sector of this.sectors )
        {
            if ( sector.sectorName == sectorName )
            {
                return this.toSelectItems( sector.subSectors );
            }
        }
        return [];
    }

    /**
     * Converts an array of Sector instances to an array of SelectItems
     * @param sectors
     * @returns {SelectItem[]}
     */
    private toSelectItems( sectors: Array<Sector> ):  Array<SelectItem>
    {
        var selectItems: SelectItem[] = [];
        /*
         * sectors being null is valid for a sector that doesn't have any sub sectors
         */
        if ( sectors != null )
        {
            selectItems.push( {   label: 'none',
                                  value: {
                                      id:   0,
                                      name: 'none',
                                      code: 'none'
                                  }
                              } );
            sectors.forEach( sector =>
            {
                selectItems.push( {   label: sector.sectorName,
                                      value: {
                                          id:   sector.sectorId,
                                          name: sector.sectorName,
                                          code: sector.sectorName
                                      }
                                  } );
            });
        }
        return selectItems;
    }

    public clone(): StockSectorList
    {
        return undefined;
    }

    public isEqualPrimaryKey( modelObject: StockSectorList )
    {
        return true;
    }

    public getDeleteKey(): string
    {
        return undefined;
    }

    public getPrimaryKeyValue(): any
    {
        return undefined;
    }
}
