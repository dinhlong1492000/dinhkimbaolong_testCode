import Repository, { BaseTransaction } from "@n-repositories/Repository";
import Warehouse from "@n-models/Warehouse";
import { IWarehouseRepository } from "@n-repositories/interfaces/v1";
import { AnyQueryBuilder } from "objection";

export class WarehouseRepository
  extends Repository<typeof Warehouse>
  implements IWarehouseRepository
{
  initializeModel(): typeof Warehouse {
    return Warehouse;
  }
  transacting(trx: BaseTransaction): IWarehouseRepository {
    const repositoryTransaction = new WarehouseRepository(trx.transaction);
    return repositoryTransaction;
  }
}
