/**
 * Created by mike on 2/4/2018
 */
import { CrudController } from '../crud/common/crud-controller';
import { LinkedAccount } from '../../model/entity/linked-account';
import { Injectable } from '@angular/core';

@Injectable()
export class LinkedAccountController extends CrudController<LinkedAccount>
{

}
