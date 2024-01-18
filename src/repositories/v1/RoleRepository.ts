import Repository, { BaseTransaction } from "@n-repositories/Repository";
import Role from "@n-models/Role";
import { IRoleRepository } from "@n-repositories/interfaces/v1";
import { AnyQueryBuilder } from "objection";

export class RoleRepository
  extends Repository<typeof Role>
  implements IRoleRepository
{
  initializeModel(): typeof Role {
    return Role;
  }
  transacting(trx: BaseTransaction): IRoleRepository {
    const repositoryTransaction = new RoleRepository(trx.transaction);
    return repositoryTransaction;
  }
}
