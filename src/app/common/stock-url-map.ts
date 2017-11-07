/**
 * This class provides a map of URLs keyed by the ticker symbol.  It is meant to be used with class
 * that allows the user to enter notes that might contain a URL.  This class will extract the URL from the notes
 * and map the URL to the ticker symbol.
 */
import { StockNoteContainer } from "./stock-note-container";
import { isNullOrUndefined } from "util";

export class StockUrlMap
{
    private urlMap: Map<string, string> = new Map();

    /**
     * Get the URL for the {@code tickerSymbol}.
     * @param {string} tickerSymbol
     * @returns {string} NULL if there is no URL for the ticker symbol.
     */
    public getURL( tickerSymbol: string ): string
    {
        return this.urlMap.get( tickerSymbol );
    }

    /**
     * Extracts the urls from the notes and populates the urlMap with urls that were found
     * @param {StockNotes[]} stockNotes
     */
    public extractURLsFromNotes( noteContainers: StockNoteContainer[] )
    {
        this.urlMap = new Map();
        noteContainers.forEach( noteContainer =>
        {
            var url: string = this.extractURLFromNotes( noteContainer.getNotes() );
            if ( !isNullOrUndefined( url ) )
            {
                //this.log( 'extractURLsFromNotes ticker: ' + stockNote.tickerSymbol + ' url: ' + url );
                this.urlMap.set( noteContainer.getTickerSymbol(), url );
            }
        });
    }

    /**
     * This method will attempt to extract a URL from the note text so that the table can display a url link
     * in the notes column
     * @param {string} stockNotes
     * @returns {string}
     */
    private extractURLFromNotes( stockNotes: string ): string
    {
        var returnValue = null;
        //this.log( stockNotes );
        /*
         * Look for links that were created in the editor
         */
        var startPos = stockNotes.indexOf( '\<p\>\<a href="' );
        //this.log( '1 startPos: ' + startPos );
        if ( startPos != -1 )
        {
            var url = stockNotes.substring( startPos + 12 );
            //this.log( 'url: ' + url );
            endPos = url.indexOf( '\"' );
            //this.log( '2 endPos: ' + startPos );
            if ( endPos != -1 )
            {
                url = url.substring( startPos, endPos );
                //this.log( '3 url: ' + url );
                returnValue = url;
            }
        }
        else
        {
            startPos = stockNotes.indexOf( 'http' );
            //this.log( '4 startPos: ' + startPos );
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
                //this.log( '5 endPos: ' + startPos );
                if ( endPos != -1 )
                {
                    var url = stockNotes.substring( startPos, endPos );
                    //this.log( '6 url: ' + url );
                    returnValue = url;
                }
            }
        }
        return returnValue;
    }

}
