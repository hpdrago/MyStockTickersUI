import { Component, Input, OnInit } from '@angular/core';
import { StockNotesContainer } from '../../common/stock-notes-container';

/**
 * This component will display user comments and if the comments contains a URL it will set the HTML such that the
 * user can click on the notes and go to the URL.
 */
@Component(
{
    selector: 'stock-comments',
    template: `
        <div *ngIf="notesUrl == null">
            <div [innerHTML]="truncateNotes( stockNotesContainer.getNotes() )">
            </div>
        </div>
        <div *ngIf="notesUrl != null ">
            <a href="{{notesUrl}}" target="_blank">
                <div [innerHTML]="truncateNotes( stockNotesContainer.getNotes() )">
                </div>
            </a>
        </div>
    `
})
export class StockCommentsComponent implements OnInit
{
    @Input()
    protected stockNotesContainer: StockNotesContainer;

    @Input()
    protected maxLength: number = 250;

    /**
     * Contains the URL extracted from the notes.  This will be null if no URL is found.
     */
    protected notesUrl: string;


    /**
     * Extract the URL
     */
    public ngOnInit()
    {
        this.notesUrl = this.extractURLFromNotes( this.stockNotesContainer.getNotes() );
    }

    /**
     * This method will attempt to extract a URL from the note text so that the table can display a url link
     * in the notes column
     * @param {string} stockNotes
     * @returns {string}
     */
    private extractURLFromNotes( stockNotes: string ): string
    {
        if ( stockNotes == null )
        {
            return null;
        }
        var returnValue = null;
        //console.log( stockNotes );
        /*
         * Look for links that were created in the editor
         */
        var startPos = stockNotes.indexOf( '\<p\>\<a href="' );
        //console.log( '1 startPos: ' + startPos );
        if ( startPos != -1 )
        {
            var url = stockNotes.substring( startPos + 12 );
            //console.log( 'url: ' + url );
            endPos = url.indexOf( '\"' );
            //console.log( '2 endPos: ' + startPos );
            if ( endPos != -1 )
            {
                url = url.substring( startPos, endPos );
                //console.log( '3 url: ' + url );
                returnValue = url;
            }
        }
        else
        {
            startPos = stockNotes.indexOf( 'http' );
            //console.log( '4 startPos: ' + startPos );
            if ( startPos != -1 )
            {
                var endPos = -1;
                // string contains url only and no html tags
                if ( startPos == 0 )
                {
                    endPos = stockNotes.length;
                }
                else
                {
                    endPos = stockNotes.indexOf( '\<\/p\>');
                }
                //console.log( '5 endPos: ' + startPos );
                if ( endPos != -1 )
                {
                    var url = stockNotes.substring( startPos, endPos );
                    //console.log( '6 url: ' + url );
                    returnValue = url;
                }
            }
        }
        return returnValue;
    }

    /**
     * Truncates {@code notes} to the max length defined by the return value from {@code getNotesSize()} which defaults
     * to 250 chars.
     * @param {string} notes
     * @return {string}
     */
    protected truncateNotes( notes: string )
    {
        return notes == null ? "" : notes.substring( 0, Math.min( this.maxLength, notes.length ) );
    }

}
