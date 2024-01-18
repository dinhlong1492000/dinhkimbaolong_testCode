import Repository, { BaseTransaction } from "@n-repositories/Repository";
import Company from "@n-models/Company";
import { ICompanyRepository } from "@n-repositories/interfaces/v1";
import { AnyQueryBuilder } from "objection";

export class CompanyRepository
  extends Repository<typeof Company>
  implements ICompanyRepository
{
  initializeModel(): typeof Company {
    return Company;
  }
  transacting(trx: BaseTransaction): ICompanyRepository {
    const repositoryTransaction = new CompanyRepository(trx.transaction);
    return repositoryTransaction;
  }

  async getCompany(id: number): Promise<(typeof Company)["prototype"]> {
    const query = this.model.query().first();
    const result: any = await query;
    return result;
  }
}
