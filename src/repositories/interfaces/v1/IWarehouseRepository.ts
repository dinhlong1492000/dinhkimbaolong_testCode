import Warehouse from '@n-models/Warehouse';

import IRepository from '../IRepository';

export interface IWarehouseRepository extends IRepository<typeof Warehouse> {
}
