import Repository, { BaseTransaction } from "@n-repositories/Repository";
import Product from "@n-models/Product";
import { IProductRepository } from "@n-repositories/interfaces/v1";
import { AnyQueryBuilder } from "objection";

export class ProductRepository
  extends Repository<typeof Product>
  implements IProductRepository
{
  initializeModel(): typeof Product {
    return Product;
  }
  transacting(trx: BaseTransaction): IProductRepository {
    const repositoryTransaction = new ProductRepository(trx.transaction);
    return repositoryTransaction;
  }
}
