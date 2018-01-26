/**
 * This is the base class for the application services providing common methods and data
 *
 * Created by mike on 10/23/2016.
 */
import { BaseClass } from "../common/base-class";
import { ToastsManager } from "ng2-toastr";

/**
 * Base service class.
 */
export abstract class BaseService extends BaseClass
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     */
    protected constructor( protected toaster?: ToastsManager )
    {
        super( toaster );
    }
}
