import { CrudActionHandler } from '../crud/common/crud-action-handler';
import { Injectable } from '@angular/core';
import { PortfolioStock } from '../../model/entity/portfolio-stock';
import { ToastsManager } from 'ng2-toastr';
import { RestErrorReporter } from '../../service/rest-error-reporter';
import { PortfolioStockCrudService } from '../../service/crud/portfolio-stock-crud.service';

/**
 * Action handler class.  This class is called by the controller to perform the handle the crud operations triggered
 * from the components.
 */
@Injectable()
export class PortfolioStockCrudActionHandler extends CrudActionHandler<PortfolioStock>
{
    /**
     * Constructor.
     * @param {ToastsManager} toaster
     * @param {RestErrorReporter} restErrorReporter
     * @param {PortfolioStockCrudService} portfolioStockCrudService
     */
    constructor( protected toaster: ToastsManager,
                 protected restErrorReporter: RestErrorReporter,
                 protected portfolioStockCrudService: PortfolioStockCrudService )
    {
        super( toaster,
               restErrorReporter,
               portfolioStockCrudService );
    }
}
