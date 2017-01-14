import { CrudFormService } from "../common/crud-form.service";
import { Portfolio } from "../../model/portfolio";
import { Injectable } from "@angular/core";

/**
 * Created by mike on 1/8/2017.
 */
@Injectable()
export class PortfolioFormService extends CrudFormService<Portfolio>
{
}