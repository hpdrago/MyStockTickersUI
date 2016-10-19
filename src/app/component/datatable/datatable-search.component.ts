import { Component, Input } from "@angular/core";
/**
 * Created by mike on 10/8/2016.
 */

@Component(
{
    selector:    'datatable-search',
    templateUrl: 'datatable-search.component.html',
    styleUrls:   ['stocks.component.css']
} )
export class DataTableSearchComponent
{
    @Input
    private searchString: string;
}