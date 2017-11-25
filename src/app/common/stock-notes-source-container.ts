/**
 * Created by mike on 11/25/2017
 */
export interface StockNotesSourceContainer
{
    getNotesSourceId(): number;
    setNotesSourceId( notesSourceId: number );
    getNotesSourceName(): string;
    setNotesSourceName( notesSourceName: string );
}
