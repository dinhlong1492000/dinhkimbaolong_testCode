import Product from '@n-models/Product';

import IRepository from '../IRepository';

export interface IProductRepository extends IRepository<typeof Product> {
}
