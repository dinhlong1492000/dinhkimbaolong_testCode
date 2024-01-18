import Repository, { BaseTransaction } from "@n-repositories/Repository";
import UserModel from "@n-models/User";
import { IUserRepository } from "@n-repositories/interfaces/v1";
import { AnyQueryBuilder } from "objection";
// import { SUser } from "@n-services/types";

export class UserRepository
  extends Repository<typeof UserModel>
  implements IUserRepository
{
  initializeModel(): typeof UserModel {
    return UserModel;
  }
  transacting(trx: BaseTransaction): IUserRepository {
    const repositoryTransaction = new UserRepository(trx.transaction);
    return repositoryTransaction;
  }
}
