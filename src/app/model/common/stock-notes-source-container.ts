/**
 * Created by mike on 11/25/2017
 */
export interface StockNotesSourceContainer
{
    getNotesSourceId(): string;
    setNotesSourceId( notesSourceId: string );
    getNotesSourceName(): string;
    setNotesSourceName( notesSourceName: string );
}
