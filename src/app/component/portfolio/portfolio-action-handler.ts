import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Customer } from '../../model/entity/customer';
import { Injectable } from '@angular/core';
import { Portfolio } from '../../model/entity/portfolio';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { PortfolioCrudService } from '../../service/crud/portfolio-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class PortfolioActionHandler extends CrudActionHandler<Portfolio>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {PortfolioCrudService} portfolioCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected portfolioCrudService: PortfolioCrudService )
    {
        super( toaster,
               restErrorReporter,
               portfolioCrudService );
    }
}
