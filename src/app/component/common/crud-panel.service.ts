import { BaseCrudComponentService } from "./base-crud-component.service";
import { ModelObject } from "../../model/base-modelobject";
import { Subject, Observable } from "rxjs";

/**
 * This class defines the publish/subscribe (observer pattern) methods from communication
 * between a {@code CrudTableComponent} and a {@code CrudFormComponent}
 *
 * Created by mike on 12/17/2016.
 */
export abstract class CrudPanelService<T extends ModelObject<T>> extends BaseCrudComponentService<T>
{
    protected modelObjectUpdated: Subject<T> = new Subject<T>();
    protected modelObjectCreated: Subject<T> = new Subject<T>();
    protected modelObjectDeleted: Subject<T> = new Subject<T>();
    protected closeButtonClicked: Subject<void> = new Subject<void>();
    protected navigateToModelObject: Subject<T> = new Subject<T>();

    /**
     * The {@code CrudTableComponent} will call this method to register to receive a notification when a model
     * object has been created.
     * @return {Observable<T>}
     */
    public handleModelObjectCreated(): Observable<T>
    {
        this.logger.log( "handleModelObjectCreated" );
        return this.modelObjectCreated.asObservable();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive a notification when a model
     * object has been deleted.
     * @return {Observable<T>}
     */
    public handleModelObjectDeleted(): Observable<T>
    {
        this.logger.log( "handleModelObjectCreated" );
        return this.modelObjectCreated.asObservable();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the close
     * button is clicked on the panel.
     * @return {Observable<void>}
     */
    public handleCloseButtonClicked(): Observable<void>
    {
        this.logger.log( "handleCloseButtonClicked" );
        return this.closeButtonClicked.asObservable();
    }

    /**
     * The {@code CrudTableComponent} will call this method to register to receive notification when the
     * {@code CrudPanelComponent} inform the table component to scroll to a particular model object.
     * @param modelObject
     * @return {Observable<T>}
     */
    public handleNavigateToModelObject( modelObject: T ): Observable<T>
    {
        this.logger.log( "handleNavigateToModelObject" );
        return this.navigateToModelObject.asObservable();
    }

    /**
     * The {@code CrudPanelComponent} will call this method when the user has updated a model object
     * @param modelObject
     */
    public sendModelObjectUpdated( modelObject: T )
    {
        this.logger.log( "sendModelObjectUpdated" );
        this.tickThenRun( () => this.modelObjectUpdated.next( modelObject ) );
    }

    /**
     * The {@code CrudPanelComponent} will call this method when the user has created a model object
     * @param modelObject
     */
    public sendModelObjectCreated( modelObject: T )
    {
        this.logger.log( "sendModelObjectCreated" );
        this.tickThenRun( () => this.modelObjectCreated.next( modelObject ) );
    }

    /**
     * The {@code CrudPanelComponent} will call this method when the user has deleted a model object
     * @param modelObject
     */
    public sendModelObjectDeleted( modelObject: T )
    {
        this.logger.log( "sendModelObjectDeleted" );
        this.tickThenRun( () => this.modelObjectDeleted.next( modelObject ) );
    }

    /**
     * The {@code CrudPanelComponent will call this method when the user clicks the close button.
     */
    public sendCloseButtonClicked()
    {
        this.logger.log( "sendCloseButtonClicked" );
        this.tickThenRun( () => this.closeButtonClicked.next() );
    }

    /**
     * The {@CrudPanelCompoment} will notify the {@code CrudTableComponent} to navigate to a particular
     * model object.
     * @param modelObject
     */
    public sendNavigateToModelObject( modelObject: T )
    {
        this.logger.log( "sendNavigateToModelObject" );
        this.tickThenRun( () => this.navigateToModelObject.next( modelObject ) );
    }
}
